const cron = require("node-cron");
const Task = require("../models/Task");
const User = require("../models/User");
const Notification = require("../models/Notification");
const sendEmail = require("./emailService");

const scheduleDeadlinesCheck = () => {
    // Run every minute for checking deadlines
    console.log("Cron service initialized. Starting timer...");
    setInterval(async () => {
        try {
            const now = new Date();
            const twentyFourHoursFromNow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            const fortyEightHoursFromNow = new Date(now.getTime() + 48 * 60 * 60 * 1000);

            // 1. Check for tasks due within 48 hours for the FIRST reminder
            const tasks48h = await Task.find({
                deadline: { $gt: now, $lte: fortyEightHoursFromNow },
                completed: false,
                reminder48hSent: { $ne: true }
            });

            // 2. Check for tasks due within 24 hours for the FINAL reminder
            const tasks24h = await Task.find({
                deadline: { $gt: now, $lte: twentyFourHoursFromNow },
                completed: false,
                reminder24hSent: { $ne: true }
            });

            const allUpcomingTasks = [...new Map([...tasks48h, ...tasks24h].map(item => [item["_id"].toString(), item])).values()];

            for (const task of allUpcomingTasks) {
                const user = await User.findById(task.userId);
                if (!user) continue;

                const timeUntilMs = task.deadline - now;
                const hoursUntil = timeUntilMs / (1000 * 60 * 60);

                let reminderType = '';
                if (hoursUntil <= 24 && !task.reminder24hSent) {
                    reminderType = '24h (Final)';
                } else if (hoursUntil <= 48 && !task.reminder48hSent) {
                    reminderType = '48h';
                }

                if (!reminderType) {
                    console.log(`Skipping task ${task.title}: hoursUntil=${hoursUntil.toFixed(2)}, h48Sent=${task.reminder48hSent}, h24Sent=${task.reminder24hSent}`);
                    continue;
                }

                console.log(`Processing ${reminderType} reminder for: ${task.title} (due in ${hoursUntil.toFixed(2)}h)`);

                // Create In-App Notification
                await Notification.create({
                    userId: task.userId,
                    taskId: task._id,
                    title: `${reminderType} Deadline Warning!`,
                    message: `The task "${task.title}" is due in ${hoursUntil} hours (Deadline: ${new Date(task.deadline).toLocaleString()}).`,
                    type: 'deadline'
                });

                // Send Email
                if (user.email) {
                    const subject = `${reminderType} Deadline Reminder: ${task.title}`;
                    const text = `Hi ${user.name},\n\nThis is your ${reminderType} reminder for "${task.title}". It's due in ${hoursUntil} hours (Deadline: ${task.deadline.toLocaleString()}).\n\nPlease complete it soon!`;
                    const html = `
                        <h3>Hi ${user.name},</h3>
                        <p>This is your <strong>${reminderType}</strong> reminder for the task "<strong>${task.title}</strong>".</p>
                        <p><strong>Deadline:</strong> ${task.deadline.toLocaleString()} (In ${hoursUntil} hours)</p>
                        <p>Don't forget to complete it!</p>
                        <br/>
                        <p>Best regards,<br/>Academic Planner AI</p>
                    `;

                    try {
                        await sendEmail(user.email, subject, text, html);
                        console.log(`Email sent for ${task.title} (${reminderType})`);
                    } catch (emailError) {
                        console.error(`Failed to send email to ${user.email}:`, emailError);
                    }
                }

                // Update flags
                if (reminderType === '24h (Final)') {
                    task.reminder24hSent = true;
                    task.reminder48hSent = true; // Also mark 48h as sent/skipped
                    task.reminderSent = true; // Sync for safety
                } else if (reminderType === '48h') {
                    task.reminder48hSent = true;
                }

                await task.save();
            }
        } catch (error) {
            console.error("Error in deadline check job:", error);
        }
    }, 60000); // Check every minute
};

module.exports = scheduleDeadlinesCheck;

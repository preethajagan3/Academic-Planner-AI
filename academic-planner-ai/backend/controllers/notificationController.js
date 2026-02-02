const Notification = require("../models/Notification");
const Task = require("../models/Task");

exports.getNotifications = async (req, res) => {
    try {
        const notifications = await Notification.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(notifications);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.checkDeadlines = async (req, res) => {
    try {
        const now = new Date();
        const fortyEightHoursFromNow = new Date(now.getTime() + 48 * 60 * 60 * 1000);

        // Find incomplete tasks due within 48 hours
        const upcomingTasks = await Task.find({
            userId: req.user.id,
            completed: false,
            deadline: { $gte: now, $lte: fortyEightHoursFromNow }
        });

        const newNotifications = [];

        for (const task of upcomingTasks) {
            // Check if notification already exists for this task and user
            const exists = await Notification.findOne({
                userId: req.user.id,
                taskId: task._id,
                type: 'deadline'
            });

            if (!exists) {
                const notification = await Notification.create({
                    userId: req.user.id,
                    taskId: task._id,
                    title: 'Upcoming Deadline!',
                    message: `The task "${task.title}" is due within 24 hours (${new Date(task.deadline).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}).`,
                    type: 'deadline'
                });
                newNotifications.push(notification);
            }
        }

        res.json({ message: "Deadline check complete", newCount: newNotifications.length });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.markAsRead = async (req, res) => {
    try {
        const notification = await Notification.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { read: true },
            { new: true }
        );
        res.json(notification);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.clearAll = async (req, res) => {
    try {
        await Notification.deleteMany({ userId: req.user.id });
        res.json({ message: "All notifications cleared" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

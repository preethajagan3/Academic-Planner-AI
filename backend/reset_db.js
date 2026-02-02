const mongoose = require("mongoose");
require("dotenv").config();
const Task = require("./models/Task");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const resetReminders = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
        const result = await Task.updateMany({}, { $set: { reminderSent: false } });
        console.log(`Reset ${result.modifiedCount} reminders.`);
        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

resetReminders();

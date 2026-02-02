const mongoose = require("mongoose");
require("dotenv").config();
const Task = require("./models/Task");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const checkTasks = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
        const tasks = await Task.find({ completed: false });
        console.log("Current Time:", new Date().toLocaleString());
        tasks.forEach(t => {
            console.log(`Task: ${t.title}, Deadline: ${t.deadline ? t.deadline.toLocaleString() : 'N/A'}, 48h: ${t.reminder48hSent}, 24h: ${t.reminder24hSent}`);
        });
        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

checkTasks();

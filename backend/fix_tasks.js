const mongoose = require('mongoose');
const dns = require('dns');
const Task = require('./models/Task');
const User = require('./models/User');
require('dotenv').config();

dns.setServers(['8.8.8.8', '8.8.4.4']);

const fixTasks = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        const user = await User.findOne({ email: '717823i140@kce.ac.in' });
        if (!user) {
            console.log("User not found");
            process.exit(1);
        }

        const result = await Task.updateMany(
            { userId: { $exists: false } },
            { $set: { userId: user._id } }
        );
        console.log(`Updated ${result.modifiedCount} tasks to user: ${user.email}`);
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
};

fixTasks();

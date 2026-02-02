const mongoose = require("mongoose");
require("dotenv").config();
const Timetable = require("./models/Timetable");
const dns = require("dns");
dns.setServers(["8.8.8.8", "8.8.4.4"]);

const checkTimetable = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to DB");
        const entries = await Timetable.find({});
        console.log(`Found ${entries.length} entries:`);
        entries.forEach(e => {
            console.log(JSON.stringify(e));
        });
        await mongoose.connection.close();
    } catch (err) {
        console.error(err);
    }
};

checkTimetable();

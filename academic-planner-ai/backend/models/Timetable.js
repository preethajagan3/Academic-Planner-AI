const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  day: String,
  subject: String,
  startTime: String,
  endTime: String
});

module.exports = mongoose.model("Timetable", timetableSchema);

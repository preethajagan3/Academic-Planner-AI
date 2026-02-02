const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  type: String,           // class / assignment / exam
  deadline: Date,
  completed: { type: Boolean, default: false },
  studyHours: Number,
  reminderSent: { type: Boolean, default: false }, // Legacy general flag
  reminder48hSent: { type: Boolean, default: false },
  reminder24hSent: { type: Boolean, default: false },
  category: String,
  importance: { type: Number, default: 1 }
});

module.exports = mongoose.model("Task", taskSchema);

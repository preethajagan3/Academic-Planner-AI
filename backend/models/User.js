const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  courses: [String],
  theme: { type: String, default: 'light' },
  profileImage: String,

  // AI preference modelling
  preferredStudyTime: String,
  avgStudyDuration: Number,
  productivityLogs: { type: Map, of: Number, default: {} } // Map of "HH" -> count/score
}, {
  timestamps: true
});

module.exports = mongoose.model("User", userSchema);

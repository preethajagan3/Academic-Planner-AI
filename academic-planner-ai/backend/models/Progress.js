const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  subject: { type: String, required: true },
  hours: { type: Number, required: true },
  date: { type: Date, required: true },
  notes: { type: String },
}, {
  timestamps: true
});

module.exports = mongoose.model("Progress", progressSchema);

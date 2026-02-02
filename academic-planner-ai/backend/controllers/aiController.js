const Task = require("../models/Task");
const User = require("../models/User");
const Progress = require("../models/Progress");
const Timetable = require("../models/Timetable");
const { calculatePreferences } = require("../ai/preferenceModel");
const { generateRecommendations } = require("../ai/recommendationEngine");
const { findSmartSlots } = require("../ai/scheduler");

exports.getAITips = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    const progressLogs = await Progress.find({ userId: req.user.id });
    const timetable = await Timetable.find({ userId: req.user.id });
    const user = await User.findById(req.user.id);

    // 1. Update Preference Model
    const prefs = calculatePreferences(tasks, progressLogs);
    Object.assign(user, prefs);
    await user.save();

    // 2. Generate Multi-category Recommendations
    const recommendations = generateRecommendations(user, tasks, progressLogs);

    // 3. Find Smart Scheduling Slots
    const smartSlots = findSmartSlots(timetable, tasks.filter(t => !t.completed));

    res.json({
      tips: recommendations,
      preferences: prefs,
      smartSlots: smartSlots
    });
  } catch (error) {
    console.error('AI Controller Error:', error);
    res.status(500).json({
      message: "Failed to generate AI insights. Using default tips.",
      tips: [{
        title: "Productivity Tip",
        content: "Stay consistent with your study schedule and take regular breaks!",
        category: "motivation"
      }],
      preferences: {},
      smartSlots: []
    });
  }
};

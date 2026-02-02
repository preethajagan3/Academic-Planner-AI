const Progress = require("../models/Progress");

exports.addProgress = async (req, res) => {
  const progress = await Progress.create({ ...req.body, userId: req.user.id });
  res.json(progress);
};

exports.getProgress = async (req, res) => {
  const progress = await Progress.find({ userId: req.user.id });
  res.json(progress);
};

exports.updateProgress = async (req, res) => {
  try {
    const progress = await Progress.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!progress) {
      return res.status(404).json({ message: "Progress entry not found" });
    }

    res.json(progress);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteProgress = async (req, res) => {
  try {
    const progress = await Progress.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!progress) {
      return res.status(404).json({ message: "Progress entry not found" });
    }

    res.json({ message: "Progress entry deleted successfully", progress });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

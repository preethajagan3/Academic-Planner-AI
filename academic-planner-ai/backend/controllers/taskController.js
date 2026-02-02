const Task = require("../models/Task");
const { analyzeTask } = require("../ai/nlpProcessor");

exports.addTask = async (req, res) => {
  const { category, importance, type } = analyzeTask(req.body.title, req.body.description, req.body.priority);
  const task = await Task.create({
    ...req.body,
    type: req.body.type || type,
    category,
    importance,
    userId: req.user.id
  });
  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find({ userId: req.user.id });
  res.json(tasks);
};

exports.updateTask = async (req, res) => {
  try {
    const analysis = analyzeTask(req.body.title, req.body.description, req.body.priority);
    const updateData = { ...req.body, ...analysis };

    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      updateData,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully", task });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
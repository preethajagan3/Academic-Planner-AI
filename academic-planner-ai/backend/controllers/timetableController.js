const Timetable = require("../models/Timetable");

exports.addSlot = async (req, res) => {
  const slot = await Timetable.create({ ...req.body, userId: req.user.id });
  res.json(slot);
};

exports.getTimetable = async (req, res) => {
  res.json(await Timetable.find({ userId: req.user.id }));
};

exports.updateSlot = async (req, res) => {
  try {
    const slot = await Timetable.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!slot) {
      return res.status(404).json({ message: "Timetable entry not found" });
    }

    res.json(slot);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteSlot = async (req, res) => {
  try {
    const slot = await Timetable.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!slot) {
      return res.status(404).json({ message: "Timetable entry not found" });
    }

    res.json({ message: "Timetable entry deleted successfully", id: req.params.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

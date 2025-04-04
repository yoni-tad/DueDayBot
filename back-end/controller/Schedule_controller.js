const Schedule = require("../model/Schedule");
const User = require("../model/User");

exports.createSchedule = async (req, res) => {
  const { telegramId, title, description, forDate, reminder } = req.body;

  try {
    if (!telegramId || !title || !forDate || !reminder) {
      return res.status(404).json({ message: "Please fill all fields!" });
    }

    const user = await User.findOne({ telegramId });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const schedule = await Schedule.create({
      userId: user._id,
      title,
      description,
      forDate: new Date(forDate),
      reminder,
    });
    res.status(201).json({ message: "Schedule successfully created" });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.Schedule = async (req, res) => {
  const id = req.params.id;

  try {
    if (!id) {
      return res.status(404).json({ message: "Please fill id!" });
    }
    const checkSchedule = await Schedule.findOne({ _id: id });
    if (!checkSchedule) {
      return res.status(404).json({ message: "Schedule not found!" });
    }

    const schedule = await Schedule.findOne({ _id: id });

    res.status(200).json(schedule);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.Schedules = async (req, res) => {
  const { telegramId } = req.body;

  try {
    if (!telegramId) {
      return res.status(404).json({ message: "Please fill telegram id!" });
    }
    const user = await User.findOne({ telegramId });
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    const schedule = await Schedule.find({ userId: user._id });

    res.status(200).json(schedule);
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deleteSchedule = async (req, res) => {
  const id = req.params.id;

  try {
    if (!id) {
      return res.status(404).json({ message: "Please fill id!" });
    }
    const checkSchedule = await Schedule.findOne({ _id: id });
    if (!checkSchedule) {
      return res.status(404).json({ message: "Schedule not found!" });
    }

    const schedule = await Schedule.deleteOne({ _id: id });

    res.status(200).json({message: "Schedule successfully deleted"});
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ message: "Server error" });
  }
}


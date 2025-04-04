const mongoose = require("mongoose");

const ScheduleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    forDate: {
      type: Date,
      required: true,
    },
    reminder: {
      type: String,
      enum: ["15 minutes", "30 minutes", "1 hour", "2 hours", "1 day", "3 days", "1 week"],
      default: "30 minutes",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Schedule", ScheduleSchema);

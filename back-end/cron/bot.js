const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const cron = require("node-cron");
const userSchema = require("../model/User");
const Schedule = require("../model/Schedule");
const User = require("../model/User");
dotenv.config();
const token = process.env.BOT_TOKEN;

const sendTelegramMessage = async (chatId, message) => {
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  const params = { chat_id: chatId, text: message };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    if (!data.ok) throw new Error(data.description);

    console.log(`Message sent to ${chatId}`);
  } catch (e) {
    console.error("Failed to send message:", error);
  }
};

// change reminder
const getReminderTime = (reminder) => {
  const reminderTimes = {
    "15 minutes": 15,
    "30 minutes": 30,
    "1 hour": 60,
    "2 hours": 120,
    "1 day": 1440,
    "3 days": 2880,
    "1 week": 10080,
  };
  return reminderTimes[reminder] || 30;
};

// schedule cron
cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    const tasks = await Schedule.find();

    for (const task of tasks) {
      const reminderMin = getReminderTime(task.reminder);
      const reminderTime = new Date(
        task.forDate.getTime() - reminderMin * 60000
      );

      if (now >= reminderTime && now < task.forDate) {
        const user = await User.findOne({ _id: task.userId });
        if (!user) {
          console.log("Usr not found!");
          await Schedule.deleteOne({ _id: task._id });
        }

        const message = `🚀 Reminder for: ${task.title}\n\n—————————————\n ${
          task.description || ""
        }`;
        await sendTelegramMessage(user.telegramId, message);
        console.log(`📢 Reminder sent: ${task.title}`);
      }

      if (now >= task.forDate) {
        await Schedule.deleteOne({ _id: task._id });
        console.log(`✅ Task deleted (event passed): ${task.title}`);
      }
    }
  } catch (error) {
    console.error("Error checking reminders:", error);
  }
});

console.log("⏳ Reminder service running...");

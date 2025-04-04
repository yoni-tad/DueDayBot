const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const cron = require("node-cron");
const userSchema = require("../model/User");
const Schedule = require("../model/Schedule");
const User = require("../model/User");
dotenv.config();
const token = process.env.BOT_TOKEN;

const bot = new TelegramBot(token, { polling: true });

const welcomeMessage = `📅 Welcome to DueDayBot! 🎯
Never forget an assignment, deadline, or important date again. I'm here to keep you on track with smart reminders, so you can focus on what really matters.

💡 What I Can Do:
✅ Add Assignments & Tasks
✅ Send You Smart Reminders
✅ Can see Schedules

🔗 Ready to Get Started? Click the button below to open the web app and set up your first reminder! 🚀

👇 [Open Due Day Web App]

👨‍💻 Developed with @yonitad0💡 a dev who also forgets deadlines sometimes! 🤣`;

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  const username = msg.chat.username;

  const user = await User.findOne({ telegramId: chatId });
  if (!user) {
    const registerUser = await User.create({
      telegramId: chatId,
      username,
    });
  }

  bot.sendMessage(chatId, welcomeMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🚀 Open Mini App",
            web_app: { url: "https://your-mini-app-url.com" },
          },
        ],
      ],
    },
  });
});

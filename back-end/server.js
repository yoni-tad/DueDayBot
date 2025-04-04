const cron = require('./cron/cron')
const bot = require('./cron/bot')
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const Router = require("./router/Schedule_route");
dotenv.config();
const app = express()
app.use(cors());
app.use(express.json());
app.use("/api", Router);

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB);
    console.log("Mongo db connected");

    app.listen(3000, () => console.log("Start listening at 3000"));
  } catch (e) {
    console.log("Server error:", e.message);
  }
})();

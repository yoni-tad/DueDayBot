const express = require('express');
const { createSchedule, Schedules, Schedule, deleteSchedule } = require('../controller/Schedule_controller');
const Router = express.Router();

Router.get("/schedule/:id", Schedule)
Router.post("/schedules", Schedules)
Router.post("/create-schedule", createSchedule)
Router.delete("/schedule/:id", deleteSchedule)

module.exports = Router;
const express = require("express");
const route = express.Router();
const telegram_controller = require("../controllers/telegram.controller");


route.post("/telegram", telegram_controller.telegramMessage);
route.post("/email", telegram_controller.emailMessage);

module.exports = route;

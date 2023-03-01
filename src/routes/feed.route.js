const express = require("express");
const route = express.Router();
const feedbackController = require("../controllers/feedback.controller");



route.get("/sendfeedback",feedbackController.sendFeedback);
route.post("/newfeedback",feedbackController.newFeedback)

module.exports = route;

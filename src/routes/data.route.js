const express = require("express");
const route = express.Router();
const data_controller = require("../controllers/data.controller");

route.get("/getalldata", data_controller.getAllData);
route.get("/datadetail/:email", data_controller.data_details);
module.exports = route;

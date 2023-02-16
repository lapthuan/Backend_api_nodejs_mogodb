const express = require("express");
const route = express.Router();
const data_controller = require("../controllers/data.controller");

route.get("/getalldata", data_controller.getAllData);
route.get("/datadetail/:email", data_controller.data_details);
route.post("/updatedht", data_controller.update_dht);
route.post("/createdata", data_controller.create_data);
route.post("/updatesensor", data_controller.update_sensor);
module.exports = route;

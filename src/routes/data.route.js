const express = require("express");
const route = express.Router();
const data_controller = require("../controllers/data.controller");

route.get("/getalldata", data_controller.getAllData);
route.get("/datadetail/:email", data_controller.data_details);
route.post("/updatedht", data_controller.update_dht);
route.post("/createdata", data_controller.create_data);
route.post("/updatesensor", data_controller.update_sensor);
route.post("/updatecontrol", data_controller.update_controls);
route.post("/updatecontrolnewdata", data_controller.update_controlsNewData);
route.post("/updatedhtlog", data_controller.update_dhtlog);
route.post("/updatemhlog", data_controller.update_mhlog);
route.post("/updateultralog", data_controller.update_ultralog);
route.post("/reset", data_controller.reset_esp);
module.exports = route;

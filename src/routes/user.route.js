const express = require("express");
const route = express.Router();
const user_controller = require("../controllers/user.controller");

route.get("/getalluser", user_controller.getAllUser);
route.post("/register", user_controller.registers);
route.post("/login-user", user_controller.loginUser);
route.post("/user-data", user_controller.userData);
route.post("/deleteuser", user_controller.deleteUser);
route.post("/changepassword", user_controller.changePassword);
route.post("/edituser", user_controller.editUser);
route.post("/edituseradmin", user_controller.editUserAdmin);
route.post("/resetpassword", user_controller.resetPassword);
module.exports = route;

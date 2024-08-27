const route = require("express").Router();
const user_controller = require("../controllers/user.controller");

route.get("/getUsers", user_controller.GetUserList);

module.exports = route;

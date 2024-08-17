const route = require("express").Router();
const auth_controller = require("../controllers/auth.controller");

route.post("/register", auth_controller.Register);
route.post("/login", auth_controller.Login);

module.exports = route;

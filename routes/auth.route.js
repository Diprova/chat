const route = require("express").Router();
const auth_controller = require("../controllers/auth.controller");
const auth_middleware = require("../middleware/auth.middleware");

route.post("/register", auth_controller.Register);
route.post("/login", auth_controller.Login);
route.use("/console/chat", auth_middleware.verifyToken);
route.get("/getUsers",)

module.exports = route;

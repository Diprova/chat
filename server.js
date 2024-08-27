require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const http = require("http");
const { Server } = require("socket.io");
const connectDB = require("./config/database");
const redis_client = require("./config/redis");
const cookieParser = require("cookie-parser");
const auth_route = require("./routes/auth.route");
const user_route = require("./routes/user.route");
const middle = require("./middleware/auth.middleware");

app.use(cookieParser());
connectDB();
redis_client.connect();
// middle.verifyToken();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/v1", auth_route);
app.use("/v1", user_route);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  // console.log(socket.handshake, "--------------check socket---------------");
  console.log(`Connection with Socket IO is established at id:${socket.id}`);
  socket.on("joinChat", (data) => {
    socket.join(data);
    console.log(`Users joined chat room: ${data}`);
  });
});
server.listen(process.env.PORT, () => {
  console.log(`Server is listening to port ${process.env.PORT}`);
});

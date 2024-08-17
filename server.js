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
const middle = require("./middleware/auth.middleware");

app.use(cookieParser());
connectDB();
redis_client.connect();
middle.verifyToken();
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use("/v1", auth_route);

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`Connection with Socket IO is established at id:${socket.id}`),
  console.log(socket.data,'----socket---')
    socket.on("joinChat", (data) => {
      console.log(data, "-----this is socket data---");
      socket.join(data);
    });
});
server.listen(process.env.PORT, () => {
  console.log(`Server is listening to port ${process.env.PORT}`);
});

var socketio = require("socket.io");
const express = require("express");
const http = require("http");
const path = require("path");
const port = process.env.PORT || 8080;


const app = express();

var server = http.createServer(app);
var io = socketio(server);

const publicDirectoryPath = path.join(__dirname, "./public");

app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log("User connected");

  socket.on("keyDownEvent", (key) => {
    console.log(`Key ${key} was pressed`);
  });

  socket.on("keyUpEvent", (key) => {
    console.log(`Key ${key} was released`);
  })

});

server.listen(port, "0.0.0.0");


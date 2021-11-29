const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const knex = require("./db");
const products = require("./products");
const Mensajes = require("./sms");

const sms = new Mensajes();
const prod = new products();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// server
const http = require("http");
const server = http.createServer(app);

// Socket
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

// Ruta bienvenida

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", async (socket) => {
  socket.on("dataObj", async (data) => {
    await prod.save(data);
    io.sockets.emit("back", await prod.getAll());
  });

  socket.on("dataMensaje", async (data) => {
    await sms.save(data);
    io.sockets.emit("backMensaje", await sms.getAll());
  });
});

server.listen(port, () => {
  console.log("Server running on port: " + port);
});

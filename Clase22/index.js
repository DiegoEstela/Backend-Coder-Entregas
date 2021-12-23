const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const knex = require("./dbknex");

const products = require("./products");
const Mensajes = require("./sms");
const sms = new Mensajes("sms.txt");

const faker = require("faker");
const { normalize, schema } = require("normalizr");
const util = require("util");

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

// Data mock con Faker

let productosFaker = [];

for (let i = 0; i < 5; i++) {
  productosFaker.push({
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(),
    descripcion: faker.commerce.productAdjective(),
    foto: faker.image.imageUrl(),
  });
}

// schema de sms

function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}

const authorSchema = new schema.Entity("author");
const mensajeSchema = new schema.Entity("mensaje");

const smsSchema = new schema.Entity("mensajes", {
  author: authorSchema,
  mensaje: mensajeSchema,
});

// Ruta bienvenida

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/productos-test", (req, res) => {
  res.sendFile(__dirname + "/public/prod.html");
});

// Ruta

io.on("connection", async (socket) => {
  socket.on("dataObj", async (data) => {
    await prod.save(data);
    io.sockets.emit("back", productosFaker);
  });

  socket.on("dataMensaje", async (data) => {
    await sms.save(data);
    let dataSms = await sms.getAll();
    let dataNormalizada = normalize(dataSms, smsSchema);
    print(dataNormalizada);
  });
});

server.listen(port, () => {
  console.log("Server running on port: " + port);
});

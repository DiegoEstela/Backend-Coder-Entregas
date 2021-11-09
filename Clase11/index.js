const express = require("express");
const app = express();
const hanblebars = require("express-handlebars");
const fs = require("fs");
const port = 3030;

app.set("view engine", "hbs");
app.set("views", "./views");

app.engine(
  "hbs",
  hanblebars({
    extname: "hbs",
    layoutsDir: "views/layouts",
    defaultLayout: "index",
  })
);

// archivos estaticos
app.use(express.static(__dirname + "/public"));

// server
const http = require("http");
const server = http.createServer(app);

// Socket
const io = require("socket.io")(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Contenedor = require("../Clase4/Clase4");
const nexCont = new Contenedor("../Clase4/producto.txt");

app.get("/", (req, res) => {
  res.render("main");
});

app.get("/form", (req, res) => {
  res.render("form");
});

io.on("connection", (socket) => {
  socket.on("dataObj", (data) => {
    io.sockets.emit("back", data);
    nexCont.save(data);
  });
});

server.listen(port, () => {
  console.log("Server running on port: " + port);
});

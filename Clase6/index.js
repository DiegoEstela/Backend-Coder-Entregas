const express = require("express");
const app = express();

const fs = require("fs");

const port = 8000;
const Contenedor = require("../Clase4/Clase4");
const nexCont = new Contenedor("../Clase4/producto.txt");

// Ruta bienvenida

app.post("/", (req, res) => {
  res.send("Bienvenido a mi API");
});

//Ruta /productos

app.get("/productos", async (req, res) => {
  let data = await nexCont.getAll();

  console.log(data);

  res.send(data);
});

// Ruta / productoRandom;
app.get("/productoRandom", async (req, res) => {
  let data = await nexCont.getAll();
  let index = Math.floor(Math.random() * data.length);
  res.send(data[index]);
});

//PUERTO

app.listen(port, () => {
  console.log("server run on port " + port);
});

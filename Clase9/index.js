const express = require("express");
const app = express();
const fs = require("fs");
const port = 4040;

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const Contenedor = require("../Clase4/Clase4");
const nexCont = new Contenedor("../Clase4/producto.txt");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.post("/form", async (req, res) => {
  await nexCont.save(req.body);
  res.redirect("/productos");
});

app.get("/productos", async (req, res) => {
  let data = await nexCont.getAll();
  if (data.length > 0) {
    res.render("productos", { data });
  } else {
    res.send("No hay productos");
  }
});

app.listen(port, () => {
  console.log("Server running on port: " + port);
});

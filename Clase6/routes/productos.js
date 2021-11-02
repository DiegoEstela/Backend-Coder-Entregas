const express = require("express");
const fs = require("fs");
const app = express();
const { Router } = express;
const router = new Router();

const Contenedor = require("../../Clase4/Clase4");
const nexCont = new Contenedor("../Clase4/producto.txt");

router.get("/productos", async (req, res) => {
  let data = await nexCont.getAll();
  res.send(data);
});

router.get("/productos/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let data = await nexCont.getById(id);

  res.send(data);
});

router.post("/save", async (req, res) => {
  await nexCont.save(req.body);
  let nombreProduct = req.body.title;
  res.send(`Se guardo el producto ${nombreProduct}`);
});

router.put("/productos/:id", async (req, res) => {
  let id = parseInt(req.params.id);
  let data = await nexCont.getAll();
  let index = data.findIndex((x) => {
    return x.id == id;
  });
  data[index].title = req.body.title;
  data[index].price = req.body.price;
  res.send(data);
});

router.delete("/productos/:id", async (req, res) => {
  let data = await nexCont.getAll();
  let newData = data.filter((x) => {
    return x.id != req.params.id;
  });
  res.send(newData);
});
module.exports = router;

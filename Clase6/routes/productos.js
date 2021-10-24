const express = require("express");

const { Router } = express;

const router = new Router();

let arr = [];

router.get("/", (req, res) => {
  res.send({ data: arr });
});

router.post("/", (req, res) => {
  console.log(req.body);
  arr.push(req.body);
  res.send("ok");
});

module.exports = router;

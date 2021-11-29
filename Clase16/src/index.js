const express = require("express");
const knex = require("./db");

const app = express();
app.use(express.json());

app.get("/all", (req, res) => {
  knex.from("users").then((json) => {
    console.log(res);
    res.send({ data: json });
  });
});

app.post("/", (req, res) => {
  let data = {
    name: "Ezequiel",
    email: "Ezequiel@gmail.com",
    password: "123456",
  };
  knex("users")
    .insert(data)
    .then(() => {
      res.send("insertado");
    })
    .catch((err) => {
      res.send("error al guardar");
    });
});

app.listen(3030, () => {
  console.log("Server running on port 8080 ");
});

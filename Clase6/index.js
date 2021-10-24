const express = require("express");
const app = express();
const port = 8080;
const productRoutes = require("./routes/productos");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Routes
app.use("/api", productRoutes);
// Estatico
app.use(express.static(__dirname + "/public"));

// Ruta bienvenida

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/form", async (req, res) => {
  res.sendFile(__dirname + "/public/form.html");
});
//PUERTO

app.listen(port, () => {
  console.log("server run on port " + port);
});

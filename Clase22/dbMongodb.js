const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/mensajes");

mongoose.connection.on("open", () => {
  console.log("Conexión establecida con MongoDB");
});

mongoose.connection.on("error", (err) => {
  console.log("error al conectar", err);
});

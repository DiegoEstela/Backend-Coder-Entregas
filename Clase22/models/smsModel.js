const { Schema, model } = require("mongoose");

const mensajesSchema = new Schema({
  author: Object,
  mensaje: String,
});

module.exports = model("mensajes", mensajesSchema);

const dotenv = require("dotenv");

dotenv.config();

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    database: "ecommerce",
  },
  pool: { min: 2, max: 8 },
});

knex.schema
  .createTableIfNotExists("products", (table) => {
    table.increments("id").primary(),
      table.string("nombre"),
      table.string("descripcion"),
      table.string("precio"),
      table.string("foto");
  })
  .then(() => {
    console.log("tabla creada");
  })
  .catch((err) => {
    console.log(err);
  });

const mongoose = require("mongoose");
const { Schema, model } = require("mongoose");

mongoose.connect(process.env.MONGO_DB);

mongoose.connection.on("open", () => {
  console.log("Base de datos conectada con exito");
});

mongoose.connection.on("error", () => {
  console.log("Error al conectarse a la base de datos");
});

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const userModel = model("user", userSchema);

module.exports = { knex, userModel };

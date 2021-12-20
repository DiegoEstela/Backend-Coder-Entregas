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

knex.schema
  .createTableIfNotExists("messages", (table) => {
    table.increments("id").primary(),
      table.timestamp("fecha").defaultTo(knex.fn.now()),
      table.string("nombre"),
      table.string("mensaje");
  })
  .then(() => {
    console.log("Tabla creada");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = knex;

const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "localhost",
    post: 3306,
    user: "root",
    password: "",
    database: "ecommerce",
  },
  pool: { min: 2, max: 8 },
});
knex.schema
  .createTableIfNotExists("users", (table) => {
    table.increments("id").primary();
    table.string("name");
    table.string("email", 128);
    table.string("role").defaultTo("admin");
    table.string("password");
  })
  .then((res) => {
    console.log("tabla Creada");
  })
  .catch((err) => {
    console.log("error", err);
  });

module.exports = knex;

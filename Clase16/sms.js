const knex = require("./db");

class Mensajes {
  constructor() {
    this.message = [];
  }

  async save(message) {
    await knex("messages").insert(message);
  }

  async getAll() {
    let data = [];
    await knex
      .select("nombre", "fecha", "mensaje")
      .from("messages")
      .then((res) => {
        data = res;
      });
    //console.log(data);
    return data;
  }
}

module.exports = Mensajes;

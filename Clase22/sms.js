require("./dbknex");

const smsModel = require("./models/smsModel");
class sms {
  constructor(mensaje) {
    this.mensaje = mensaje;
  }

  async save(mensaje) {
    try {
      let sms = new smsModel(mensaje);
      const smsSave = await sms.save();
      return smsSave;
    } catch (error) {
      throw new Error(`Error al guardar: ${error}`);
    }
  }
  async getAll() {
    try {
      const sms = await smsModel.find();
      return sms;
    } catch (error) {
      throw new Error(`Error al obtener: ${error}`);
    }
  }
}

module.exports = sms;

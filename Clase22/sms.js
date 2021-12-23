const fs = require("fs");

// obtener datos
const obtData = async (file) => {
  try {
    const readFile = await fs.promises.readFile(file, "utf-8");
    if (readFile.length) return await JSON.parse(readFile);
    else return readFile;
  } catch (err) {
    console.log("no se pueden obtener datos", err);
  }
};

//setear datos
const setData = async (file, prod) => {
  try {
    await fs.promises.writeFile(file, JSON.stringify(prod, null, "\t"));
  } catch (err) {
    console.log(err);
  }
};

class Mensajes {
  constructor(file) {
    this.file = file;
  }
  save = async (objeto) => {
    let data = await obtData(this.file);
    console.log("El archivos es", this.file);

    await setData(this.file, [...data, { ...objeto }]);
  };

  getAll = async () => {
    return await obtData(this.file);
  };
}

module.exports = Mensajes;

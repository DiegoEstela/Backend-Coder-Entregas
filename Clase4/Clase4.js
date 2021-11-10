const fs = require("fs");
producto = [];

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

//borrar datos con id

const borrarId = (data, id) => {
  return data.find((item) => item.id === id);
};
class Contenedor {
  constructor(file) {
    this.file = file;
  }
  save = async (objeto) => {
    let data = await obtData(this.file);
    console.log("El archivos es", this.file);
    const id = data.length + 1;
    await setData(this.file, [...data, { ...objeto, id: id }]);
  };
  getById = async (id) => {
    let data = await obtData(this.file);
    if (data) {
      return await data.find((item) => item.id === id);
    } else {
      throw new Error(`no existe el id ${id}`);
    }
  };
  deleteById = async (id) => {
    let data = await obtData(this.file);
    if (borrarId(data, id)) {
      const newData = data.filter((item) => item.id !== id);
      await setData(this.file, newData);
      console.log("se elimino correctamente");
    } else {
      throw new Error(`no existe el id ${id}`);
    }
  };

  getAll = async () => {
    return await obtData(this.file);
  };
  deleteAll = async () => {
    await setData(this.file, []);
  };
}

module.exports = Contenedor;
const contenedor = new Contenedor("./producto.txt");

// "save" recibe un obejto, lo guarda y devuelve con un console el id
// contenedor.save({
//   title: "Durazno",
//   price: 200,
//   thumbnail: "https://unsplash.com/photos/5GK0KjhBLs4",
// });

// // "getById" recibe un id y devuelve el objeto al que le pertence
// contenedor.getById(2);

// // "getAll" devuelve toda la lista
// contenedor.getAll();

// //"deleteAll" elimina toda la lista

// // contenedor.deleteAll()

// // "deleteById" recibe un id y elimina dicho objeto

// // contenedor.deleteById()

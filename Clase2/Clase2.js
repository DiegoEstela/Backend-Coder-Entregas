class User {
  constructor(name, surName, pet, bookName, bookAutor) {
    this.name = name;
    this.Surname = surName;
    this.pets = [pet];
    this.books = [{ bookName, bookAutor }];
  }

  getFullName() {
    return `User: ${this.name}, ${this.Surname}`;
  }

  addPet(pet) {
    this.pets.push(pet);
  }
  countPets() {
    return this.pets.length;
  }
  Addbook(bookName, bookAutor) {
    this.books.push({ bookName, bookAutor });
  }
  getBookNames() {
    const getBook = this.books.map(function (get) {
      return get.bookName;
    });
    return getBook;
  }
}

// se crea un usuario llamado Carlos
const Carlos = new User("Carlos", "Lopez", "gato", "rayuela", "Julio Cortazar");

console.log(Carlos);
// se agrega una nueva mascota
Carlos.addPet("perro");

console.log(Carlos);
// se utiliza el metodo count Pets para verificar que cuente la nueva mascota
console.log(Carlos.countPets());

// se agrega un nuevo libro
Carlos.Addbook("Romeo y Julieta", "William Shakespeare");

// se utiliza el metodo getBookName para traer un array con los titulos de cada libro
console.log(Carlos.getBookNames());

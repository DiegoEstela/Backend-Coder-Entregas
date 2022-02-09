const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
const knex = require("./dbknex");
const dotenv = require("dotenv");
const parseArg = require("minimist");
dotenv.config();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const random = require("./routes/randoms");
const session = require("express-session");
const bcrypt = require("bcrypt");
const products = require("./products");
const Mensajes = require("./sms");
const sms = new Mensajes("sms.txt");
const mongoStore = require("connect-mongo");
const { userModel } = require("./dbknex");

const faker = require("faker");
const { normalize, schema } = require("normalizr");
const util = require("util");

const prod = new products();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// process

dotenv.config();

const options = {
  default: { port: 8081 },
  alias: { p: "port" },
};

let arguments = parseArg(process.argv.slice(2), options);

// server
const http = require("http");
const server = http.createServer(app);

// Socket
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname + "/public"));

app.use("/api/randoms", random);

// Data mock con Faker

let productosFaker = [];

for (let i = 0; i < 5; i++) {
  productosFaker.push({
    nombre: faker.commerce.productName(),
    precio: faker.commerce.price(),
    descripcion: faker.commerce.productAdjective(),
    foto: faker.image.imageUrl(),
  });
}

const authorize = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
    return;
  }
  res.redirect("/login");
};

// passport

app.use(
  session({
    store: mongoStore.create({
      mongoUrl: process.env.MONGO_DB,
    }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: true,
    resave: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "local-login",
  new LocalStrategy((username, password, done) => {
    userModel.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        console.log(`User not found`);
        return done(null, false);
      }
      if (!isValidPassword(user, password)) {
        console.log(`Invalid password`);
        return done(null, false);
      }
      return done(null, user);
    });
  })
);

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      passReqToCallback: true,
    },
    (req, username, password, done) => {
      userModel.findOne({ username: username }, (err, user) => {
        if (err) {
          console.log(`Error in signup ${err}`);
        }
        if (user) {
          console.log(`User already exists`);
          return done(null, false);
        }
        const newUser = {
          username: username,
          password: bcrypt.hashSync(password, 10),
        };

        userModel.create(newUser, (err, user) => {
          if (err) {
            console.log(`Error in saving user: ${err}`);
            return done(err);
          }
          return done(null, user);
        });
      });
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  userModel.findById(id, done);
});

function isValidPassword(user, password) {
  return bcrypt.compareSync(password, user.password);
}

// schema de sms

function print(obj) {
  console.log(util.inspect(obj, false, 12, true));
}

const authorSchema = new schema.Entity("author");
const mensajeSchema = new schema.Entity("mensaje");

const smsSchema = new schema.Entity("mensajes", {
  author: authorSchema,
  mensaje: mensajeSchema,
});

// Ruta bienvenida

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/productos-test", (req, res) => {
  res.sendFile(__dirname + "/public/prod.html");
});

// Ruta login

app.get("/login", (req, res) => {
  res.sendFile(`${__dirname}/public/login.html`);
});

app.get("/signup", (req, res) => {
  res.sendFile(`${__dirname}/public/signup.html`);
});

app.get("/getUsers", (req, res) => {
  res.send(user);
});

app.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/login",
    failureRedirect: "/signup",
  })
);

app.post(
  "/login",
  passport.authenticate("local-login", {
    successRedirect: "/",
    failureRedirect: "/login",
  })
);

app.get("/logout", (req, res) => {
  req.logOut();
  res.redirect("/login");
});
io.on("connection", async (socket) => {
  socket.on("dataObj", async (data) => {
    await prod.save(data);
    io.sockets.emit("back", productosFaker);
  });

  socket.on("dataMensaje", async (data) => {
    await sms.save(data);
    let dataSms = await sms.getAll();
    let dataNormalizada = normalize(dataSms, smsSchema);
    print(dataNormalizada);
  });
});

app.get("/info", (req, res) => {
  let data = {
    "argumentos de entrada": process.argv.slice(2),
    "sistema opertativo": process.platform,
    "version de node": process.version,
    rss: process.memoryUsage().rss,
    path: process.execPath,
    processId: process.pid,
    "carpeta proyecto": process.cwd(),
  };
  res.json({ data });
});

server.listen(port, () => {
  console.log(`Server ${process.pid} run on port ${port}`);
});

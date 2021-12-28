const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");

const app = express();

app.use(
  session({
    secret: "misecreto",
    resave: true,
    saveUninitialized: true,
  })
);

app.get("/", (req, res) => {
  console.log(req.session);
  (req.session.usuario = "Diego"),
    (req.session.password = "123456"),
    res.send("session ok");
});

app.listen(3000, () => {
  console.log("Server on port 3000");
});

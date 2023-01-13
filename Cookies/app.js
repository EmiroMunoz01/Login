const express = require("express");
const session = require("express-session");
const app = express();

const MySQLStore = require("express-mysql-session");

const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "ejemplo",
};

const sessionStorage = new MySQLStore(options);
app.use(
  session({
    key: "cookie_usuario",
    secret: "123123",
    resave: false,
    saveUninitialized: false,
  })
);

//12:48

app.get("/", (req, res) => {
  req.session.usuario = "Emiro Muñoz";
  req.session.rol = "Admin";

  req.session.visitas = req.session.visitas ? ++req.session.visitas : 1;

  res.send(
    `El usuario <strong>${req.session.usuario}</strong> con rol <strong>${req.session.rol}</strong> ha visitado esta pagina <strong>${req.session.visitas}</strong> veces`
  );
});

app.listen(3000, (req, res) => {
  console.log("listening on port 3000");
});

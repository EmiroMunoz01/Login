//1 invocamos express
const express = require("express");
const app = express();

//Necesitamos dos campos, el de usuario y contraseña, para evitar el error de variable no definida y para trabajar con un formato JSON debemos usar express url encoder

//2 seteamos urlencoded para capturar datos del formulario y no tener errores de campos vacios
app.use(express.urlencoded({ extended: false }));

//especificaremos que trabajaremos con JSON
app.use(express.json());

//3 invocaremos a dotenv
const dotenv = require("dotenv");
//le diremos que vaya a la raiz de nuestro proyecto y busque la carpeta env, y que todas las variables de entorno estaran en el archivo .env
dotenv.config({ path: "./env/.env" });

//4 setearemos el directorio public

app.use("/resource", express.static("public"));
app.use("/resource", express.static(__dirname + "/public"));

//5 Establecer el motor de plantilla ejs
app.set("view engine", "ejs");

//6 Invocar al modulo para hacer el hashing de password
const bcryptjs = require("bcryptjs");

//7 configuraremos las variables de inicio de sesion
const session = require("express-session");
//(el app lo usarmos de express, que es el framework principal)

app.use(
  session({
    //secret, es la clave
    secret: "secret",
    //resave es la forma en como se guardaran las sesiones, lo dejaremos en true
    resave: true,
    saveUninitialized: true,
  })
);

//8 - Invocamos al modulo de conexión de la bd
const connection = require("./database/db");

//9 estableciendo las rutas
app.get("/", (req, res) => {
  res.render("index", { msg: "ESTO ES UN MENSAJE DESDE NODE" });
});

app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});

//10 registracion

app.post("/register", async (req, res) => {
  const user = req.body.user;
  const name = req.body.name;
  const rol = req.body.rol;
  const pass = req.body.pass;
  let passwordHash = await bcryptjs.hash(pass, 8);

  connection.query(
    'INSERT INTO users SET mycolumn = ?',
    { user: user, name: name, rol: rol, pass: passwordHash },
    async (error, results) => {
      if (error) {
        console.log(error);
      } else {
        res.render("EXITOOOOO!!!!!!!");
      }
    }
  );
});

app.listen(3000, (req, res) => {
  console.log("Servidor ejecutandose");
});

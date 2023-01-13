const express = require("express");
const app = express();

const bcriptjs = require("bcryptjs");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.post("/login", async (req, res) => {
  const user = req.body.user;
  const password = req.body.password;

  //comprobaremos que los datos sean correctos

  if (user == "admin" && password == "12345") {
    let passowrdHash = await bcriptjs.hash(password, 8);
    res.json({
      message: "¡AUTENTICACIÓN EXITOSA!",
      passowrdHash: passowrdHash,
    });
  } else {
    res.json({
      message: "¡ERROR EN CREDENCIALES!",
    });
  }
});

app.get("/compare", (req, res) => {
  let hashSaved =
    "$2a$08$TzTz6Lk7t./wP1VLfM1pRO54S7ZxOryesguaVx3.f.MHlDxjS.Ao2";
  let compare = bcriptjs.compareSync("12345", hashSaved);

  if (compare) {
    res.json("OK");
  } else {
    res.json("No son iguales");
  }
});

app.listen(3000, () => {
  console.log("Usando el puerto 3000");
});

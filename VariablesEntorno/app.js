const express = require("express");
const app = express();

require("dotenv").config({ path: "./.env" });

const puerto = process.env.PORT || 3000;

app.listen(puerto, () => {
  console.log("Server listening on port: " + puerto);
});

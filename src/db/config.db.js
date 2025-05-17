const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_ACCESS) // Recibe una URL y usamos THEN y CATCH porque retorna una promesa.
  .then(() => console.log("Base de datos conectada"))
  .catch((error) => console.log("error"));

// Usamos la herramienta de node "process" que nos permite ingresar al archivo .env

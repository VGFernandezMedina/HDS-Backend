const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

require("../db/config.db"); // Lo ejecutamos inmediatamente.

class Server {
  constructor(port) {
    this.port = process.env.PORT || port; // Toma el puerto del sistema o del index.
    this.app = express(); // Se ejecuta express y se crea automaticamente el servidor.
    this.middlewares(); // Los middlewares al ser funciones deben ser ejecutadas.
    this.routes();
  }

  middlewares() {
    //middlewares de config.
    this.app.use(express.json()); // Analiza el JSON que ingresa al server y lo convierte en un objeto.
    this.app.use(cors()); // Pasa una cabecera con toda la configuracion necesario que habilita la información cruzada con otros puertos.
    this.app.use(morgan("dev")); // Registra las peticiones HTTP en la consola.
  }

  routes() {
    this.app.use("/api", require("../routes/index.routes")); // El api es el identificador de rutas backend.
  }

  listen() {
    this.app.listen(process.env.PORT, () => {
      //Usamos el metodo listen() de express.
      console.log("Servidor funcionando en el puerto", process.env.PORT);
    });
  }
}

module.exports = Server;

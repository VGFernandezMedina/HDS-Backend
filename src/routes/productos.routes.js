const express = require("express");
const {
  /*   borrarProducto, */
  actualizarProducto,
  crearProducto,
  obtenerUnProducto,
  obtenerTodosLosProductos,
} = require("../controllers/productos.controllers");
const router = express.Router(); // Llamamos y ejecutamos el método "Router()" de express y lo guardamos en "router".

router.get("/", obtenerTodosLosProductos);
router.get("/:id", obtenerUnProducto);
router.post("/", crearProducto);
router.put("/:id", actualizarProducto);
/* router.delete("/:id", borrarProducto); */

module.exports = router;

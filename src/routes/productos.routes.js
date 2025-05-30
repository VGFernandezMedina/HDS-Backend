const express = require("express");
const {
  borrarProducto,
  actualizarProducto,
  crearProducto,
  obtenerUnProducto,
  obtenerTodosLosProductos,
} = require("../controllers/productos.controllers");
const auth = require("../middlewares/auth");
const router = express.Router(); // Llamamos y ejecutamos el método "Router()" de express y lo guardamos en "router".

/* Roles: admin, usuario y todos */

router.get("/", obtenerTodosLosProductos);
router.get("/:id", obtenerUnProducto);
router.post("/", auth("admin"), crearProducto);
router.put("/:id", auth("admin"), actualizarProducto);
router.delete("/:id", auth("admin"), borrarProducto);

module.exports = router;

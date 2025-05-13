const express = require("express");
const router = express.Router(); // Llamamos y ejecutamos el método "Router()" de express y lo guardamos en "router".

router.get("/", ObtenerTodosLosProductos); //
router.get("/:id", ObtenerUnProducto);
router.post("/", CrearProducto);
router.put("/:id", ActualizarProducto);
router.delete("/:id", BorrarProducto);

module.exports = router;

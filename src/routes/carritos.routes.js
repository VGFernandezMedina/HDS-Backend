const { Router } = require("express");
const router = Router();
const {
  agregarProductoCarrito,
  eliminarProductoCarrito,
  obtenerProductosDelCarrito,
} = require("../controllers/carritos.controllers");
const auth = require("../middlewares/auth");

router.get("/obtenerProductos", auth("usuario"), obtenerProductosDelCarrito);

router.put(
  "/agregarProducto/:idProducto",
  auth("usuario"),
  agregarProductoCarrito
);
router.put(
  "/eliminarProducto/:idProducto",
  auth("usuario"),
  eliminarProductoCarrito
);

module.exports = router;

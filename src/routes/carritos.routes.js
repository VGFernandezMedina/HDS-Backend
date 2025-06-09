const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const {
  agregarProductoCarrito,
  eliminarProductoCarrito,
  obtenerProductosDelCarrito,
} = require("../controllers/carritos.controllers");

router.get("/obtenerProductos", auth("usuario"), obtenerProductosDelCarrito);

// AGREGAR PRODUCTO
router.put(
  "/agregarProducto/:idProducto",
  [
    check(
      "id",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  auth("usuario"),
  validateFields,
  agregarProductoCarrito
);
// ELIMINAR PRODUCTO
router.put(
  "/eliminarProducto/:idProducto",
  [
    check(
      "id",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  auth("usuario"),
  validateFields,
  eliminarProductoCarrito
);

module.exports = router;

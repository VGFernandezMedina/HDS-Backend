const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const {
  obtenerProductosDeFavoritos,
  agregarProductoFavoritos,
  eliminarProductoFavoritos,
} = require("../controllers/favoritos.controllers");

router.get("/obtenerProductos", auth("usuario"), obtenerProductosDeFavoritos);

// AGREGAR PRODUCTO
router.put(
  "/agregarProducto/:idProducto",
  [
    check(
      "idProducto",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose",
    ).isMongoId(),
  ],
  auth("usuario"),
  validateFields,
  agregarProductoFavoritos,
);
// ELIMINAR PRODUCTO
router.put(
  "/eliminarProducto/:idProducto",
  [
    check(
      "idProducto",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose",
    ).isMongoId(),
  ],
  auth("usuario"),
  validateFields,
  eliminarProductoFavoritos,
);

module.exports = router;

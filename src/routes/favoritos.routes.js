const { Router } = require("express");
const router = Router();
const {
  obtenerProductosDeFavoritos,
  agregarProductoFavoritos,
  eliminarProductoFavoritos,
} = require("../controllers/favoritos.controllers");
const auth = require("../middlewares/auth");

router.get("/obtenerProductos", auth("usuario"), obtenerProductosDeFavoritos);

router.put(
  "/agregarProducto/:idProducto",
  auth("usuario"),
  agregarProductoFavoritos
);
router.put(
  "/eliminarProducto/:idProducto",
  auth("usuario"),
  eliminarProductoFavoritos
);

module.exports = router;

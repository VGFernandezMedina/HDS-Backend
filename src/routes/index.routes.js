const { Router } = require("express");
const router = Router();

const productosRoutes = require("./productos.routes");
const usuariosRoutes = require("./usuarios.routes");
const carritosRoutes = require("./carritos.routes");
const favoritosRoutes = require("./favoritos.routes");

router.use("/productos", productosRoutes);
router.use("/usuarios", usuariosRoutes);
router.use("/carritos", carritosRoutes);
router.use("/favoritos", favoritosRoutes);
// router.use("/servicios", asd);

module.exports = router;

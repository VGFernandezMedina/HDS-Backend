const { Router } = require("express");
const router = Router();

const productosRoutes = require("./productos.routes");
const usuariosRoutes = require("./usuarios.routes");

router.use("/productos", productosRoutes);
router.use("/usuarios", usuariosRoutes);
/* router.use("/");
router.use("/"); */

module.exports = router;

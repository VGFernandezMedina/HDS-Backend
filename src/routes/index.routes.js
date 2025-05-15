const { Router } = require("express");
const router = Router();

const productosRoutes = require("./productos.routes");

router.use("/productos", productosRoutes);
/* router.use("/");
router.use("/");
router.use("/"); */

module.exports = router;

const { Router } = require("express");
const router = Router(); // Llamamos y ejecutamos el método "Router()" de express y lo guardamos en "router".
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const {
  borrarProducto,
  actualizarProducto,
  crearProducto,
  obtenerUnProducto,
  obtenerTodosLosProductos,
} = require("../controllers/productos.controllers");

/* Roles: admin, usuario y todos */

router.get("/", obtenerTodosLosProductos);
// OBTENER UN PRODUCTO
router.get(
  "/:id",
  [
    check(
      "id",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  validateFields,
  obtenerUnProducto
);
// CREAR UN PRODUCTO
router.post(
  "/",
  [
    check("nombre", "ERROR. El campo NOMBRE está vacío").notEmpty(),
    check("precio", "ERROR. El campo PRECIO está vacío").notEmpty(),
    check("imagen", "ERROR. El campo IMAGEN está vacío").notEmpty(),
    check("descripcion", "ERROR. El campo DESCRIPCION está vacío").notEmpty(),
  ],
  auth("admin"),
  validateFields,
  crearProducto
);
// ACTUALIZAR PRODUCTO
router.put(
  "/:id",
  [
    check(
      "id",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  auth("admin"),
  validateFields,
  actualizarProducto
);
//BORRAR PRODUCTO
router.delete(
  "/:id",
  [
    check(
      "id",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  auth("admin"),
  validateFields,
  borrarProducto
);

module.exports = router;

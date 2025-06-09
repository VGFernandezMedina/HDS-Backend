const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/auth");
const { check } = require("express-validator");
const validateFields = require("../middlewares/validateFields");
const {
  iniciarSesionUsuario,
  registrarUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  actualizarUnUsuario,
  altaLogicaDelUsuario,
  bajaLogicaDelUsuario,
  bajaFisicaDelUsuario,
} = require("../controllers/usuarios.controllers");

/* Roles: admin, usuario y publico */

// LOGIN
router.post(
  "/login",
  [
    check("nombreUsuario", "ERROR. El campo USUARIO está vacío").notEmpty(), // Si el campo está completo no retorna el mensaje de error.
    check("contrasenia", "ERROR. El campo CONTRASENIA está vacío").notEmpty(),
    check(
      "contrasenia",
      "ERROR. El número de carácteres permitidos en la CONTRASEÑA debe ser mayor a 5"
    ).isLength({ min: 5 }),
  ],
  validateFields,
  iniciarSesionUsuario
);
// REGISTER
router.post(
  "/register",
  [
    check("nombreUsuario", "ERROR. El campo USUARIO está vacío").notEmpty(), // Si el campo está completo no retorna el mensaje de error.
    check(
      "nombreUsuario",
      "ERROR. El número de carácteres permitidos en el NOMBRE es entre 3 y 30"
    ).isLength({ min: 3 }, { max: 30 }),
    check("emailUsuario", "ERROR. El campo EMAIL está vacío").notEmpty(),
    check(
      "emailUsuario",
      "ERROR. El formato de EMAIL ingresado es incorrecto"
    ).isEmail(),
    check("contrasenia", "ERROR. El campo CONTRASEÑA está vacío").notEmpty(),
    check(
      "contrasenia",
      "ERROR. El número de carácteres permitidos en la CONTRASEÑA debe ser mayor a 5"
    ).isLength({ min: 5 }),
  ],
  validateFields,
  registrarUsuario
);

router.get("/", auth("admin"), obtenerTodosLosUsuarios);
// OBTENER UN USUARIO
router.get(
  "/:id",
  [
    check(
      "id",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  auth("admin"),
  validateFields,
  obtenerUnUsuario
);

// ACTUALIZAR UN USUARIO
router.put(
  "/:id",
  [
    check(
      "id",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  auth(["admin", "usuario"]),
  validateFields,
  actualizarUnUsuario
);

// ALTA LOGICA.
router.put(
  "/enabled/:id",
  [
    check(
      "id",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  auth("admin"),
  validateFields,
  altaLogicaDelUsuario
);
// BAJA LOGICA
router.put(
  "/disabled/:id",
  [
    check(
      "id",
      "ERROR. ID incorrecto. El formato no corresponde a mongoose"
    ).isMongoId(),
  ],
  auth("admin"),
  validateFields,
  bajaLogicaDelUsuario
);

// BAJA FISICA
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
  bajaFisicaDelUsuario
);

module.exports = router;

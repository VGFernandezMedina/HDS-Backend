const { Router } = require("express");
const router = Router();
const auth = require("../middlewares/auth");
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

/* Roles: admin, usuario y todos */

router.post("/login", iniciarSesionUsuario);
router.post("/register", registrarUsuario);

router.get("/", auth("admin"), obtenerTodosLosUsuarios);
router.get("/:id", auth("admin"), obtenerUnUsuario);

router.put("/:id", auth(["admin", "usuario"]), actualizarUnUsuario);

router.put("/enabled/:id", auth("admin"), altaLogicaDelUsuario);
router.put("/disabled/:id", auth("admin"), bajaLogicaDelUsuario);

router.delete("/:id", auth("admin"), bajaFisicaDelUsuario);

module.exports = router;

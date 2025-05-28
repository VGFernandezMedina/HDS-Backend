const express = require("express");
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

const router = express.Router();

router.post("/login", iniciarSesionUsuario);
router.post("/register", registrarUsuario);

router.get("/", obtenerTodosLosUsuarios);
router.get("/:id", obtenerUnUsuario);

router.put("/:id", actualizarUnUsuario);

router.put("/enabled/:id", altaLogicaDelUsuario);
router.put("/disabled/:id", bajaLogicaDelUsuario);

router.delete("/:id", bajaFisicaDelUsuario);

module.exports = router;

const express = require("express");
const {
  iniciarSesionUsuario,
  registrarUsuario,
} = require("../controllers/usuarios.controllers");

const router = express.Router();

router.post("/login", iniciarSesionUsuario);
router.post("/register", registrarUsuario);

module.exports = router;

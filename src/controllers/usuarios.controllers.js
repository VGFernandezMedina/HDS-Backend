const {
  registrarUsuarioBD,
  iniciarSesionUsuarioBD,
} = require("../services/usuarios.services");

const registrarUsuario = async (req, res) => {
  const { statusCode, msg, error } = await registrarUsuarioBD(req.body);
  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const iniciarSesionUsuario = async (req, res) => {
  const { statusCode, msg, error } = await iniciarSesionUsuarioBD(req.body);
  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  iniciarSesionUsuario,
  registrarUsuario,
};

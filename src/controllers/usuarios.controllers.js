const {
  registrarUsuarioBD,
  iniciarSesionUsuarioBD,
  obtenerTodosLosUsuariosBD,
  obtenerUnUsuarioBD,
  actualizarUnUsuarioBD,
  altaLogicaDelUsuarioBD,
  bajaLogicaDelUsuarioBD,
  bajaFisicaDelUsuarioBD,
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
  const { statusCode, msg, token, error } = await iniciarSesionUsuarioBD(
    req.body
  );
  try {
    res.status(statusCode).json({ msg, token });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const obtenerTodosLosUsuarios = async (req, res) => {
  const { statusCode, usuarios, error } = await obtenerTodosLosUsuariosBD();
  try {
    res.status(statusCode).json({ usuarios });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const obtenerUnUsuario = async (req, res) => {
  const { statusCode, usuario, msg, error } = await obtenerUnUsuarioBD(
    req.params.id
  );
  try {
    res.status(statusCode).json(usuario ? { usuario } : { msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const actualizarUnUsuario = async (req, res) => {
  const { statusCode, msg, error } = await actualizarUnUsuarioBD(
    req.params.id,
    req.body
  );
  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const altaLogicaDelUsuario = async (req, res) => {
  const { statusCode, msg, error } = await altaLogicaDelUsuarioBD(
    req.params.id
  );
  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const bajaLogicaDelUsuario = async (req, res) => {
  const { statusCode, msg, error } = await bajaLogicaDelUsuarioBD(
    req.params.id
  );
  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const bajaFisicaDelUsuario = async (req, res) => {
  const { statusCode, msg, error } = await bajaFisicaDelUsuarioBD(
    req.params.id
  );
  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  iniciarSesionUsuario,
  registrarUsuario,
  obtenerTodosLosUsuarios,
  obtenerUnUsuario,
  actualizarUnUsuario,
  altaLogicaDelUsuario,
  bajaLogicaDelUsuario,
  bajaFisicaDelUsuario,
};

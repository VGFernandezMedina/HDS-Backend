const UsuariosModel = require("../models/usuarios.model");

const registrarUsuarioBD = async (body) => {
  try {
    const nuevoUsuario = new UsuariosModel(body);
    await nuevoUsuario.save();
    return {
      msg: "Usuario creado con éxito",
      statusCode: 201,
    };
  } catch (error) {
    console.log(error);
    return {
      error,
      statusCode: 500,
    };
  }
};

const iniciarSesionUsuarioBD = async (body) => {
  try {
    const usuarioExiste = await UsuariosModel.findOne({
      nombreUsuario: body.nombreUsuario,
    }); // Comparamos el nombreUsuario del modelo con el del body que viene del front.

    if (!usuarioExiste) {
      return {
        msg: "Usuario y/o contraseña incorrecto. USUARIO",
        statusCode: 409, // Indica cuando no puede procesar la solicitud porque hay un conflicto lógico.
      };
    }
    if (usuarioExiste.contrasenia === body.contrasenia) {
      return {
        msg: "Usuario logeado",
        statusCode: 200,
      };
    } else {
      return {
        msg: "Usuario y/o contraseña incorrecto. CONTRASEÑA",
        statusCode: 404,
      };
    }
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

module.exports = {
  iniciarSesionUsuarioBD,
  registrarUsuarioBD,
};

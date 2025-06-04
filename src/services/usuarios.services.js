const UsuariosModel = require("../models/usuarios.model");
const argon = require("argon2");
const jwt = require("jsonwebtoken");
const CarritosModel = require("../models/carritos.model");
const FavoritosModel = require("../models/favoritos.model");

const registrarUsuarioBD = async (body) => {
  try {
    const nuevoUsuario = new UsuariosModel(body);
    const nuevoCarrito = new CarritosModel({ idUsuario: nuevoUsuario._id });
    const nuevoFavoritos = new FavoritosModel({ idUsuario: nuevoUsuario._id });

    nuevoUsuario.contrasenia = await argon.hash(body.contrasenia); // Hasheamos la contraseña que viene de req.body.
    nuevoUsuario.idCarrito = nuevoCarrito._id; // Vinculamos el Carrito con el usuario
    nuevoUsuario.idFavoritos = nuevoFavoritos._id; // Vinculamos los Favoritos con el usuario

    await nuevoCarrito.save(); // Guardamos el carrito creado.
    await nuevoFavoritos.save(); // Guardamos los favoritos creados.
    await nuevoUsuario.save(); // Guardamos el usuario creado.
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

    if (usuarioExiste.estado === "deshabilitado") {
      return {
        msg: "Tu usuario está bloqueado. Por favor comunicate con un administrador",
        statusCode: 400, // Indica que el servidor no puede procesar la solicitud del cliente porque está mal formada o tiene errores de sintaxis.
      };
    }

    const verificarContrasenia = await argon.verify(
      usuarioExiste.contrasenia,
      body.contrasenia
    ); //con verify verificamos si la contrasenia guardada en BD es igual a la que viene del Front.
    if (verificarContrasenia) {
      const payload = {
        // El payload es la información util del usuario
        // Con el ID del usuario ya puedo sacar el ID de carrito y favorito, pero pasandolo por el PAYLOAD me ahorro el trabajo de hacer otra consulta por esos mismos datos.
        idUsuario: usuarioExiste._id,
        idCarrito: usuarioExiste.idCarrito,
        idFavoritos: usuarioExiste.idFavoritos,
        rolUsuario: usuarioExiste.rol,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET); // Si queremos que expire, dentro del signo separamos con una coma "," y usamos el objeto {expiresIn: "1h/m/s"}

      return {
        msg: "Usuario logeado",
        statusCode: 200,
        token,
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

const obtenerTodosLosUsuariosBD = async () => {
  try {
    const usuarios =
      await UsuariosModel.find(); /* .select("-contrasenia -__v") */ // Sacamos estas propiedades del usuario de la respuesta que va al front.
    return {
      usuarios,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const obtenerUnUsuarioBD = async (idUsuario) => {
  try {
    const usuario = await UsuariosModel.findOne({ _id: idUsuario }); /* .select(
      "-contrasenia -__v"
    ) */ // Sacamos estas propiedades del usuario de la respuesta que va al front.
    if (!usuario) {
      return {
        msg: "El Usuario que busca no existe",
        statusCode: 404,
      };
    }
    return {
      usuario,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const actualizarUnUsuarioBD = async (idUsuario, body) => {
  try {
    await UsuariosModel.findOneAndUpdate({ _id: idUsuario }, body);
    return {
      msg: "El usuario se actualizó correctamente",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const altaLogicaDelUsuarioBD = async (idUsuario) => {
  try {
    const usuario = await UsuariosModel.findOne({ _id: idUsuario });
    usuario.estado = "habilitado";
    await usuario.save();
    return {
      msg: "Usuario habilitado correctamente",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const bajaLogicaDelUsuarioBD = async (idUsuario) => {
  try {
    const usuario = await UsuariosModel.findOne({ _id: idUsuario });
    usuario.estado = "deshabilitado";
    await usuario.save();
    return {
      msg: "Usuario deshabilitado correctamente",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const bajaFisicaDelUsuarioBD = async (idProducto) => {
  try {
    const usuario = await UsuariosModel.findOne({ _id: idProducto });

    if (!usuario) {
      return {
        msg: "Error, el usuario que está buscando no existe.",
        statusCode: 404,
      };
    }
    await UsuariosModel.findByIdAndDelete({ _id: idProducto });
    return {
      msg: "Usuario eliminado correctamente",
      statusCode: 200,
    };
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
  obtenerTodosLosUsuariosBD,
  obtenerUnUsuarioBD,
  actualizarUnUsuarioBD,
  altaLogicaDelUsuarioBD,
  bajaLogicaDelUsuarioBD,
  bajaFisicaDelUsuarioBD,
};

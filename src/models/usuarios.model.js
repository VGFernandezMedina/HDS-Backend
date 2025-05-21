const { Schema, model } = require("mongoose");

const UsuariosSchema = new Schema({
  nombreUsuario: {
    type: String,
    trim: true, // Saca los espacios en blanco de adelante y atras.
    required: true,
    unique: true, // El valor no se puede repetir en los documentos de esa colección.
    lowerCase: true, // Convierta automáticamente el valor de ese campo a minúsculas antes de guardarlo en la base de datos.
    maxLength: [30, "Límite máximo de 30 caracteres."],
    minLength: [3, "Límite mínimo de 3 caracteres."],
  },
  emailUsuario: {
    type: String,
    required: true,
    match: [
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/,
      "Formato de email incorrecto",
    ], //  Sirve para validar un campo usando una expresión regular (RegExp)
  },
  contrasenia: {
    type: String,
    required: true,
    minLength: [5, "Límite mínimo de 5 caracteres."],
  },
  estado: {
    type: String,
    trim: true,
    enum: ["habilitado", "deshabilitado"], // Solo se aceptan ciertos valores y si el valor no está en esa lista, se lanza un error.
    default: "deshabilitado",
  },
  rol: {
    type: String,
    enum: ["usuario", "admin"],
    default: "usuario",
  },
  fechaReg: {
    type: Date,
    default: Date.now(),
  },
  idCarrito: {
    type: String,
    trim: true,
  },
  idFavoritos: {
    type: String,
    trim: true,
  },
});

const UsuariosModel = model("usuarios", UsuariosSchema);
module.exports = UsuariosModel;

const mongoose = require("mongoose"); // ODM que funciona como middleware entre el Servidor y la BD que permite conectar y trabajar con MongoDB usando modelos.

const ProductosSchema = new mongoose.Schema({
  // El schema compara los valores que mandan del frontend
  nombre: {
    type: String, // Tipo de dato
    lowerCase: true, // Convierta automáticamente el valor de ese campo a minúsculas antes de guardarlo en la base de datos.
    trim: true, // Saca los espacios en blanco de adelante y atras.
    unique: true, // El valor no se puede repetir en los documentos de esa colección.
    maxLength: 50,
    minLength: 5,
    required: true, // Campo es obligatorio.
  },
  precio: {
    type: Number,
    required: true, // Campo es obligatorio.
  },
  imagen: {
    type: String,
    trim: true,
    required: true, // Campo es obligatorio.
  },
  descripcion: {
    type: String,
    trim: true,
    required: true, // Campo es obligatorio.
  },
  estado: {
    type: String,
    enum: ["habilitado", "deshabilitado"], // Este campo solo puede tener uno de estos valores específicos.
    trim: true,
    default: "deshabilitado",
  },
}); // Llamamos al metodo Schema que retorna una Clase, por eso la primera letra de la variable va en mayuscula, y el "Schema" debe ir como buena practica.
const ProductosModel = mongoose.model("productos", ProductosSchema); // El modelo guarda la carpeta donde almacena los objetos, y el esquema que debe respetar.
module.exports = ProductosModel;

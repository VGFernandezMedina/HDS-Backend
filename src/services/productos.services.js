const ProductosModel = require("../models/productos.model");

const obtenerTodosLosProductosBD = async () => {
  try {
    const productos = await ProductosModel.find();
    return {
      productos,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const obtenerUnProductoBD = async (idProducto) => {
  try {
    const producto = await ProductosModel.findOne({ _id: idProducto }); // El findOne recibe un objeto, y la base de datos debemos pasarle su "_id" porque asi lo guarda
    if (!producto) {
      return {
        msg: "ERROR. El producto no existe",
        statusCode: 404,
      };
    }

    return {
      producto,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const crearProductoBD = async (body) => {
  try {
    const nuevoProducto = new ProductosModel(body); // Se compara el modelo con el body, si son iguales lo crea, sino, sale el error
    await nuevoProducto.save(); // Con el metodo de moongose "save()" lo guardamos en la BD

    return {
      msg: "El producto fue creado con exito", // Este mensaje saldrá en la BD.
      statusCode: 201, // Se creó un nuevo recurso en el servidor.
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const actualizarProductoBD = async (idProducto, body) => {
  try {
    await ProductosModel.findByIdAndUpdate({ _id: idProducto }, body); // El método recibe primero el ID y el campo a actualizar.
    return {
      msg: "El producto se actualizó correctamente.",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const borrarProductoBD = async (idProducto) => {
  try {
    const producto = await ProductosModel.findOne({ _id: idProducto });

    if (!producto) {
      return {
        msg: "ERROR. El producto no existe",
        statusCode: 404, // El servidor no puede encontrar el recurso solicitado.
      };
    }
    // Primero obtenemos el producto para poder retornar el mensaje de error si es que el producto existe o no.

    await ProductosModel.findByIdAndDelete({ _id: idProducto }); // Buscamos y borramos el producto.
    return {
      msg: "El producto se borró correctamente",
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
  obtenerTodosLosProductosBD,
  obtenerUnProductoBD,
  crearProductoBD,
  actualizarProductoBD,
  borrarProductoBD,
};

const CarritosModel = require("../models/carritos.model");
const ProductosModel = require("../models/productos.model");

const obtenerProductosDelCarritoBD = async (idCarrito) => {
  try {
    const carrito = await CarritosModel.findById(idCarrito);
    return {
      productos: carrito.productos,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const agregarProductoCarritoBD = async (idCarrito, idProducto) => {
  try {
    const carrito = await CarritosModel.findOne({ _id: idCarrito });
    const producto = await ProductosModel.findOne({ _id: idProducto });
    console.log(producto);

    const productoExisteCarrito = carrito.productos.find(
      (prod) => prod._id.toString() === idProducto.toString(),
    ); // "Busca en el array de productos un  _id convertido a string sea igual al idProducto recibido (también convertido a string). Ya que el prod._id probablemente sea un ObjectId de Mongoose, no una cadena.
    if (productoExisteCarrito) {
      // Evite que se repita el mismo producto en el carrito.
      return {
        msg: "Error. El producto ya existe en el carrito",
        statusCode: 400,
      };
    }

    carrito.productos.push(producto);
    await carrito.save();

    return {
      msg: "El producto fue agregado correctamente",
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const eliminarProductoCarritoBD = async (idCarrito, idProducto) => {
  try {
    const carrito = await CarritosModel.findOne({ _id: idCarrito });
    const productoIndex = carrito.productos.findIndex(
      (prod) => prod._id.toString() === idProducto.toString(),
    );

    if (productoIndex < 0) {
      return {
        msg: "Error. El producto que intenta eliminar no existe",
        statusCode: 404,
      };
    }
    carrito.productos.splice(productoIndex, 1); // El splice(metodo de arrays) recibe el index y la cantidad de elementos a borrar.
    await carrito.save();

    return {
      msg: "Producto eliminado del carrito correctamente",
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
  agregarProductoCarritoBD,
  eliminarProductoCarritoBD,
  obtenerProductosDelCarritoBD,
};

/* const productos = [
  {
    id: 1,
    nombre: "Coca-Cola",
    precio: 4000,
    descripcion: "La mejor gaseosa del mundo",
  },
]; */

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

/* const obtenerUnProductoArray = (idProducto) => {
  const producto = productos.find((prod) => prod.id === Number(idProducto));
  return {
    producto,
    statusCode: 200,
  };
}; */

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

module.exports = {
  obtenerTodosLosProductosBD,
  /* obtenerUnProductoArray, */
  crearProductoBD,
};

const {
  obtenerTodosLosProductosArray,
  obtenerUnProductoArray,
} = require("../services/productos.services");

const obtenerTodosLosProductos = async (req, res) => {
  const { statusCode, productos } = await obtenerTodosLosProductosArray();

  try {
    res.status(statusCode).json({ productos });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const obtenerUnProducto = async (req, res) => {
  const { statusCode, producto } = await obtenerUnProductoArray(req.params.id);

  try {
    res.status(statusCode).json({ producto });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

/* const crearProducto = async (req, res) => {
  const { statusCode, msg, error } = await

  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const actualizarProducto = async (req, res) => {;
  const { statusCode, msg, error } = await

  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }  
}

const borrarProducto = async (req, res) => {;
  const { statusCode, msg, error} = await

  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
} */

module.exports = {
  obtenerTodosLosProductos,
  obtenerUnProducto,
  /*   crearProducto,
  actualizarProducto,
  borrarProducto, */
};

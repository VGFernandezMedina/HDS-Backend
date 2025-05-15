const productos = [
  {
    id: 1,
    nombre: "Coca-Cola",
    precio: 4000,
    descripcion: "La mejor gaseosa del mundo",
  },
];

const obtenerTodosLosProductosArray = () => {
  return {
    productos,
    statusCode: 200,
  };
};

const obtenerUnProductoArray = (idProducto) => {
  const producto = productos.find((prod) => prod.id === Number(idProducto));
  return {
    producto,
    statusCode: 200,
  };
};

const crearProductoArray = (body) => {
  const { nombre, precio, descripcion } = body;

  return {};
};

module.exports = {
  obtenerTodosLosProductosArray,
  obtenerUnProductoArray,
};

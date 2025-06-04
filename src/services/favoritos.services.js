const FavoritosModel = require("../models/favoritos.model");
const ProductosModel = require("../models/productos.model");

const obtenerProductosDeFavoritosBD = async (idFavoritos) => {
  try {
    const favoritos = await FavoritosModel.findById({ _id: idFavoritos });
    return {
      productos: favoritos.productos,
      statusCode: 200,
    };
  } catch (error) {
    return {
      error,
      statusCode: 500,
    };
  }
};

const agregarProductoFavoritosBD = async (idFavoritos, idProducto) => {
  try {
    const favoritos = await FavoritosModel.findById({ _id: idFavoritos });
    const producto = await ProductosModel.findById({ _id: idProducto });

    const productoExisteFavoritos = favoritos.productos.find(
      (prod) => prod._id.toString() === idProducto.toString()
    );

    if (productoExisteFavoritos) {
      return {
        msg: "Error. El producto ya existe en Favoritos",
        statusCode: 500,
      };
    }

    favoritos.productos.push(producto);
    await favoritos.save();
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

const eliminarProductoFavoritosBD = async (idFavoritos, idProducto) => {
  try {
    const favoritos = await FavoritosModel.findById({ _id: idFavoritos });
    const productoIndex = favoritos.productos.findIndex(
      (prod) => prod._id.toString() === idProducto.toString()
    );

    if (productoIndex < 0) {
      return {
        msg: "Error. El producto que intenta eliminar no existe",
        statusCode: 404,
      };
    }
    favoritos.productos.splice(productoIndex, 1); // El splice(metodo de arrays) recibe el index y la cantidad de elementos a borrar.
    await favoritos.save();

    return {
      msg: "Producto eliminado de Favoritos correctamente",
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
  obtenerProductosDeFavoritosBD,
  agregarProductoFavoritosBD,
  eliminarProductoFavoritosBD,
};

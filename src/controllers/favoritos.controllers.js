const {
  obtenerProductosDeFavoritosBD,
  agregarProductoFavoritosBD,
  eliminarProductoFavoritosBD,
} = require("../services/favoritos.services");

const obtenerProductosDeFavoritos = async (req, res) => {
  const { statusCode, productos, error } = await obtenerProductosDeFavoritosBD(
    req.idFavoritos
  );
  try {
    res.status(statusCode).json({ productos });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const agregarProductoFavoritos = async (req, res) => {
  const { statusCode, msg, error } = await agregarProductoFavoritosBD(
    req.idFavoritos,
    req.params.idProducto
  );
  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

const eliminarProductoFavoritos = async (req, res) => {
  const { statusCode, msg, error } = await eliminarProductoFavoritosBD(
    req.idFavoritos,
    req.params.idProducto
  );
  try {
    res.status(statusCode).json({ msg });
  } catch (error) {
    res.status(statusCode).json({ error });
  }
};

module.exports = {
  obtenerProductosDeFavoritos,
  agregarProductoFavoritos,
  eliminarProductoFavoritos,
};

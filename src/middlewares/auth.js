const jwt = require("jsonwebtoken");

// al ser una funcion anónima, en "index.routes.js" esta funcion toma el nombre del archivo, en este caso "auth.js"

module.exports = (rolRuta) => (req, res, next) => {
  // los middlewares traen un 3° parametro que es un callback, en nuestro caso lo llamamos next. Quiere decir que ejecutará el controlador(los que estan en index.routes.js) cuando el token sea válido.
  const token = req.header("auth"); // busca en la cabecera del req la propiedad llamada auth.
  const verificarToken = jwt.verify(token, process.env.JWT_SECRET);
  if (
    verificarToken.rolUsuario === rolRuta ||
    rolRuta.includes(verificarToken.rolUsuario)
  ) {
    // Pasamos por el token estos 3 datos para que esten vinculados uno con el otro.
    req.idUsuario = verificarToken.idUsuario;
    req.idCarrito = verificarToken.idCarrito;
    req.idFavoritos = verificarToken.idFavoritos;

    next(); // Ejecuta el controlador.
  } else {
    res.status(401).json("No estás autorizado para recibir esta información");
  }
};

const jwt = require('jsonwebtoken');

function verificarToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ mensaje: 'Token no proporcionado' });
  jwt.verify(token, process.env.JWT_SECRET || 'secreto', (err, decoded) => {
    if (err) return res.status(401).json({ mensaje: 'Token inválido' });
    req.usuario = decoded;
    next();
  });
}

function permitirRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.usuario.rol)) {
      return res.status(403).json({ mensaje: 'No tienes permisos para esta acción' });
    }
    next();
  };
}

module.exports = { verificarToken, permitirRoles };

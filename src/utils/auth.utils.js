//auth.utils.js
const jwt = require('jsonwebtoken');

function gerarTokens(usuario) {
  const payload = { id: usuario.id, email: usuario.email, perfil: usuario.perfil };
  const token = jwt.sign(payload, process.env.JWT_SECRET || 'SENHA', { expiresIn: '1h' });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '7d' });
  return { token, refreshToken };
}

function verificarRefreshToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.REFRESH_SECRET, (err, payload) => {
      if (err) reject(err);
      else resolve(payload);
    });
  });
}

module.exports = { gerarTokens, verificarRefreshToken };

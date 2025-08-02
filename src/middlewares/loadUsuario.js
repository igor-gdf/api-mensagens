//loadUsuario
const { Usuario } = require('../models');

async function loadUsuario(req, res, next) {
  try {
    const usuario = await Usuario.findByPk(req.params.id);
    if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
    req.usuario = usuario;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = loadUsuario;

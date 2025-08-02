//checkEmailUnique
const { Usuario } = require('../models');

async function checkEmailUnique(req, res, next) {
  try {
    const { email } = req.body;
    if (!email) return next(); // sem email, não precisa checar

    const usuarioExistente = await Usuario.findOne({ where: { email } });

    // Se encontrou usuário e não é o mesmo que estamos atualizando (se houver req.usuario)
    if (usuarioExistente && (!req.usuario || usuarioExistente.id !== req.usuario.id)) {
      return res.status(400).json({ erro: 'E-mail já cadastrado.' });
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = checkEmailUnique;

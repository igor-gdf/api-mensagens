//authorizeUserOrAdmin
function authorizeUserOrAdmin(req, res, next) {
  const { usuario, user } = req;
  if (user.perfil !== 'ADMIN' && user.id !== usuario.id) {
    return res.status(403).json({ erro: 'Acesso negado.' });
  }
  next();
}

module.exports = authorizeUserOrAdmin;

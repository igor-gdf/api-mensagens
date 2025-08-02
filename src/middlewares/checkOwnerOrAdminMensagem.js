//checkOwnerOrAdminMensagem
function checkOwnerOrAdminMensagem(req, res, next) {
  if (req.user.perfil !== 'ADMIN' && req.mensagem.usuario_id !== req.user.id) {
    return res.status(403).json({ error: 'Acesso negado.' });
  }
  next();
}

module.exports = checkOwnerOrAdminMensagem;

//checkOwnerOrAdminComentario
const { Comentario } = require('../models');

async function checkOwnerOrAdminComentario(req, res, next) {
  try {
    const comentario = await Comentario.findOne({ where: { id: req.params.id_comentario, mensagem_id: req.params.id } });
    if (!comentario) return res.status(404).json({ erro: 'Comentário não encontrado.' });

    if (req.user.perfil !== 'ADMIN' && comentario.usuario_id !== req.user.id) {
      return res.status(403).json({ erro: 'Acesso negado.' });
    }
    req.comentario = comentario; // opcional, pode usar depois no controller
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = checkOwnerOrAdminComentario;

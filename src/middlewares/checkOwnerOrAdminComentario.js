//checkOwnerOrAdminComentario
const createError = require('http-errors');

async function checkOwnerOrAdminComentario(req, res, next) {
  try {
    const comentario = req.comentario; // comentário já carregado pelo middleware loadComentario
    if (!comentario) {
      return next(createError(404, 'Comentário não encontrado.'));
    }

    if (req.user.perfil !== 'ADMIN' && comentario.usuario_id !== req.user.id) {
      return next(createError(403, 'Acesso negado. Apenas o criador do comentário pode atualizá-lo.'));
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = checkOwnerOrAdminComentario;
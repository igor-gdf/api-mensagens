//checkOwnerOrAdminMensagem
const createError = require('http-errors');

async function checkOwnerOrAdminMensagem(req, res, next) {
  try {
    const mensagem = req.mensagem; // mensagem já carregada pelo middleware loadMensagem
    if (!mensagem) {
      return next(createError(404, 'Mensagem não encontrada.'));
    }

    if (req.user.perfil !== 'ADMIN' && mensagem.usuario_id !== req.user.id) {
      return next(createError(403, 'Acesso negado. Apenas o criador da mensagem pode atualizá-la.'));
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = checkOwnerOrAdminMensagem;
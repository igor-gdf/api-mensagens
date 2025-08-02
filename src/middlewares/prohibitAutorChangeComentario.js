//prohibitAutorChangeComentario.js
const createError = require('http-errors');

function prohibitAutorChangeComentario(req, res, next) {
  if ('usuario_id' in req.body || 'mensagem_id' in req.body) {
    return next(createError(400, 'Não é permitido alterar o autor ou a mensagem do comentário.'));
  }
  next();
}

module.exports = prohibitAutorChangeComentario;

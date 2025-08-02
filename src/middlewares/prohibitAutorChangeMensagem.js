//prohibitAutorChangeMensagem.js
const createError = require('http-errors');

function prohibitAutorChangeMensagem(req, res, next) {
  if ('usuario_id' in req.body) {
    return next(createError(400, 'Não é permitido alterar o autor da mensagem.'));
  }
  next();
}

module.exports = prohibitAutorChangeMensagem;

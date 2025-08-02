//loadMensagem
const { Mensagem, Usuario, Comentario } = require('../models');

async function loadMensagem(req, res, next) {
  try {
    const mensagem = await Mensagem.findByPk(req.params.id, {
      include: [
        { model: Usuario, as: 'autor', attributes: ['id', 'nome', 'email'] },
        { model: Comentario, as: 'comentarios' }
      ]
    });
    if (!mensagem) return res.status(404).json({ erro: 'Mensagem não encontrada.' });
    req.mensagem = mensagem;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = loadMensagem;

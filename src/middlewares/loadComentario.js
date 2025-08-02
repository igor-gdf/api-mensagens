//loadComentario
const { Comentario } = require('../models');

async function loadComentario(req, res, next) {
  try {
    const comentario = await Comentario.findOne({ where: { id: req.params.id_comentario, mensagem_id: req.params.id } });
    if (!comentario) return res.status(404).json({ erro: 'Comentário não encontrado.' });
    req.comentario = comentario;
    next();
  } catch (err) {
    next(err);
  }
}

module.exports = loadComentario;

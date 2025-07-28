// controllers/ComentarioController.js
const Comentario = require('../models/Comentario');
const Usuario = require('../models/Usuario');

module.exports = {
  async create(req, res, next) {
    try {
      const autorId = req.user.id;
      const { conteudo, mensagemId } = req.body;
      const comentario = await Comentario.create({ conteudo, autorId, mensagemId });
      const comentarioComAutor = await Comentario.findByPk(comentario.id, {
        include: [{ model: Usuario, as: 'autor', attributes: ['id', 'nome', 'email'] }]
      });

      res.status(201).json(comentarioComAutor);
    } catch (err) {
      next(err);
    }
  },

  async listByMensagem(req, res, next) {
    try {
      const { mensagemId } = req.params;
      const comentarios = await Comentario.findAll({
        where: { mensagemId },
        include: [{ model: Usuario, as: 'autor', attributes: ['id', 'nome', 'email'] }]
      });
      res.json(comentarios);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const comentario = await Comentario.findByPk(req.params.id);
      if (!comentario) {
        return res.status(404).json({ erro: 'Comentário não encontrado.' });
      }
      if (req.user.role !== 'ADMIN' && comentario.autorId !== req.user.id) {
        return res.status(403).json({ error: 'Você só pode deletar seus próprios comentários.' });
      }
      await comentario.destroy();
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};

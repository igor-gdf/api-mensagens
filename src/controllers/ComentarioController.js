// controllers/ComentarioController.js
const createError = require('http-errors');
const Comentario = require('../models/Comentario');
const Usuario = require('../models/Usuario');

module.exports = {
  async create(req, res, next) {
    try {
      const { conteudo, mensagemId } = req.body;
      if (!conteudo || conteudo.trim() === '') {
        throw createError(400, 'Conteúdo não pode estar vazio.');
      }

      const autorId = req.user.id;
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
        throw createError(404, 'Comentário não encontrado.');
      }
      await comentario.destroy();
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};

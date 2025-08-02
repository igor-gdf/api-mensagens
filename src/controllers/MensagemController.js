//MensagemController.js
const { Mensagem } = require('../models');

module.exports = {
  async create(req, res, next) {
    try {
      const autorId = req.user.id;
      const { titulo, conteudo } = req.body;
      const novaMensagem = await Mensagem.create({ titulo, conteudo, usuario_id: autorId });

      // Trazer mensagem com dados do autor e comentários (se quiser, pode usar middleware)
      const mensagemComAutor = await Mensagem.findByPk(novaMensagem.id, {
        include: ['autor', 'comentarios']
      });

      res.status(201).json(mensagemComAutor);
    } catch (error) {
      next(error);
    }
  },

  async list(req, res, next) {
    try {
      const mensagens = await Mensagem.findAll({
        include: ['autor', 'comentarios']
      });
      res.json(mensagens);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      // mensagem já está em req.mensagem carregada pelo middleware
      res.json(req.mensagem);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      // mensagem já está em req.mensagem carregada pelo middleware
      const { titulo, conteudo } = req.body;

      if (titulo) req.mensagem.titulo = titulo;
      if (conteudo) req.mensagem.conteudo = conteudo;

      await req.mensagem.save();

      res.json(req.mensagem);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      await req.mensagem.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

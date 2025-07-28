//MensagemController.js
const createError = require('http-errors');
const Mensagem = require('../models/Mensagem');
const Usuario = require('../models/Usuario');

module.exports = {
  async create(req, res, next) {
    try {
      const autorId = req.user.id;
      const { conteudo } = req.body;
      const novaMensagem = await Mensagem.create({ conteudo, autorId });
      const mensagemComAutor = await Mensagem.findByPk(novaMensagem.id, {
        include: [{ model: Usuario, as: 'autor', attributes: ['id', 'nome', 'email'] }]
      });

      res.status(201).json(mensagemComAutor);
    } catch (error) {
      next(error);
    }
  },

  async list(req, res, next) {
    try {
      const mensagens = await Mensagem.findAll({
        include: [{ model: Usuario, as: 'autor', attributes: ['id', 'nome', 'email'] }]
      });
      res.json(mensagens);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const mensagem = await Mensagem.findByPk(req.params.id, {
        include: [{ model: Usuario, as: 'autor', attributes: ['id', 'nome', 'email'] }]
      });

      if (!mensagem) {
        return res.status(404).json({ erro: 'Mensagem não encontrada.' });
      }

      res.json(mensagem);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { conteudo } = req.body;

      if ('autorId' in req.body) {
        throw createError(400, 'Não é permitido alterar o autor da mensagem.');
      }

      const mensagem = await Mensagem.findByPk(req.params.id);
      if (!mensagem) {
        return res.status(404).json({ erro: 'Mensagem não encontrada.' });
      }

      mensagem.conteudo = conteudo;
      await mensagem.save();

      res.json(mensagem);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const mensagem = await Mensagem.findByPk(req.params.id);

      if (!mensagem) {
        return res.status(404).json({ erro: 'Mensagem não encontrada.' });
      }

      await mensagem.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

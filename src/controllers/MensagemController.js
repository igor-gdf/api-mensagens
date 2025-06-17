//MensagemController
const Mensagem = require('../models/Mensagem');
const ERROR = require('../utils/errorcodes');

module.exports = {
  async create(req, res, next) {
    try {
      const { conteudo } = req.body;

      if (!conteudo || conteudo.trim() === '') {
        const err = new Error(ERROR.EMPTY_CONTENT.message);
        Object.assign(err, ERROR.EMPTY_CONTENT);
        throw err;
      }

      const novaMensagem = await Mensagem.create({ conteudo });
      res.status(201).json(novaMensagem);
    } catch (error) {
      next(error);
    }
  },

  async list(req, res, next) {
    try {
      const mensagens = await Mensagem.findAll();
      res.json(mensagens);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const mensagem = await Mensagem.findByPk(req.params.id);

      if (!mensagem) {
        const err = new Error(ERROR.NOT_FOUND.message);
        Object.assign(err, ERROR.NOT_FOUND);
        throw err;
      }

      res.json(mensagem);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { conteudo } = req.body;

      if (!conteudo || conteudo.trim() === '') {
        const err = new Error(ERROR.EMPTY_CONTENT.message);
        Object.assign(err, ERROR.EMPTY_CONTENT);
        throw err;
      }

      const mensagem = await Mensagem.findByPk(req.params.id);

      if (!mensagem) {
        const err = new Error(ERROR.NOT_FOUND.message);
        Object.assign(err, ERROR.NOT_FOUND);
        throw err;
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
        const err = new Error(ERROR.NOT_FOUND.message);
        Object.assign(err, ERROR.NOT_FOUND);
        throw err;
      }

      await mensagem.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

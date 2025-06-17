//MensagemController
const Mensagem = require('../models/Mensagem');
const Usuario = require('../models/Usuario');
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

    const autorId = req.user.id;

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

      // Impede alteração do autor
      if ('autorId' in req.body) {
        return res.status(400).json({ error: 'Não é permitido alterar o autor da mensagem.' });
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

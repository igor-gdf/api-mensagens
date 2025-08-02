//MensagemController.js
const createError = require('http-errors');
const { Usuario } = require('../models/index');

module.exports = {
  async create(req, res, next) {
    try {
      const autorId = req.user.id;
      const { titulo, conteudo } = req.body;
      const novaMensagem = await Mensagem.create({ titulo, conteudo, usuario_id: autorId });
      const mensagemComAutor = await Mensagem.findByPk(novaMensagem.id, {
        include: [
          { model: Usuario, as: 'autor', attributes: ['id', 'nome', 'email'] },
          { model: Comentario, as: 'comentarios' } // opcional, se quiser já trazer comentários junto
        ]
      });

      res.status(201).json(mensagemComAutor);
    } catch (error) {
      next(error);
    }
  },

  async list(req, res, next) {
    try {
      const mensagens = await Mensagem.findAll({
        include: [
          { model: Usuario, as: 'autor', attributes: ['id', 'nome', 'email'] },
          { model: Comentario, as: 'comentarios' }
        ]
      });
      res.json(mensagens);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const mensagem = await Mensagem.findByPk(req.params.id, {
        include: [
          { model: Usuario, as: 'autor', attributes: ['id', 'nome', 'email'] },
          { model: Comentario, as: 'comentarios' }
        ]
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
      const { titulo, conteudo } = req.body;

      if ('usuario_id' in req.body) {
        throw createError(400, 'Não é permitido alterar o autor da mensagem.');
      }

      const mensagem = await Mensagem.findByPk(req.params.id);
      if (!mensagem) {
        return res.status(404).json({ erro: 'Mensagem não encontrada.' });
      }

      if (titulo) mensagem.titulo = titulo;
      if (conteudo) mensagem.conteudo = conteudo;

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

      if (req.user.role !== 'ADMIN' && mensagem.usuario_id !== req.user.id) {
        return res.status(403).json({ error: 'Você só pode deletar suas próprias mensagens.' });
      }

      await mensagem.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

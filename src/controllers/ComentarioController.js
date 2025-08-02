//ComentarioController.js
const { Comentario, Usuario } = require('../models');

module.exports = {
  async create({ user, params, body }, res, next) {
    try {
      const comentario = await Comentario.create({
        conteudo: body.conteudo,
        usuario_id: user.id,
        mensagem_id: params.id,
      });

      const comentarioComAutor = await Comentario.findByPk(comentario.id, {
        include: { model: Usuario, as: 'autor', attributes: ['id', 'nome', 'email'] }
      });

      res.status(201).json(comentarioComAutor);
    } catch (err) {
      next(err);
    }
  },

  async listByMensagem({ params }, res, next) {
    try {
      const comentarios = await Comentario.findAll({
        where: { mensagem_id: params.id },
        include: { model: Usuario, as: 'autor', attributes: ['id', 'nome', 'email'] }
      });
      res.json(comentarios);
    } catch (err) {
      next(err);
    }
  },

  async update({ params, body }, res, next) {
    try {
      const comentario = await Comentario.findOne({
        where: { id: params.id_comentario, mensagem_id: params.id }
      });

      if (!comentario) {
        return res.status(404).json({ erro: 'Comentário não encontrado' });
      }

      comentario.conteudo = body.conteudo || comentario.conteudo;
      await comentario.save();

      res.json(comentario);
    } catch (err) {
      next(err);
    }
  },

  async delete({ params }, res, next) {
    try {
      const comentario = await Comentario.findOne({
        where: { id: params.id_comentario, mensagem_id: params.id }
      });

      if (!comentario) {
        return res.status(404).json({ erro: 'Comentário não encontrado' });
      }

      await comentario.destroy();
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};

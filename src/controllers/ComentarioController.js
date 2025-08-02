const { Comentario, Usuario } = require('../models');

module.exports = {
  async create(req, res, next) {
    try {
      const usuario_id = req.user.id;
      const mensagem_id = req.params.id;
      const { conteudo } = req.body;

      const comentario = await Comentario.create({ conteudo, usuario_id, mensagem_id });

      const comentarioComAutor = await Comentario.findByPk(comentario.id, {
        include: { model: Usuario, as: 'autor', attributes: ['id', 'nome', 'email'] }
      });

      res.status(201).json(comentarioComAutor);
    } catch (err) {
      next(err);
    }
  },

  async listByMensagem(req, res, next) {
    try {
      const mensagem_id = req.params.id;
      const comentarios = await Comentario.findAll({
        where: { mensagem_id },
        include: { model: Usuario, as: 'autor', attributes: ['id', 'nome', 'email'] }
      });
      res.json(comentarios);
    } catch (err) {
      next(err);
    }
  },

  async update(req, res, next) {
    try {
      const { id_comentario, id } = req.params; // id = mensagem
      const comentario = await Comentario.findOne({ where: { id: id_comentario, mensagem_id: id } });

      if (!comentario) return res.status(404).json({ erro: 'Comentário não encontrado' });

      if (req.user.role !== 'ADMIN' && comentario.usuario_id !== req.user.id) {
        return res.status(403).json({ erro: 'Apenas o autor ou admin pode editar.' });
      }

      comentario.conteudo = req.body.conteudo || comentario.conteudo;
      await comentario.save();

      res.json(comentario);
    } catch (err) {
      next(err);
    }
  },

  async delete(req, res, next) {
    try {
      const { id_comentario, id } = req.params;
      const comentario = await Comentario.findOne({ where: { id: id_comentario, mensagem_id: id } });

      if (!comentario) return res.status(404).json({ erro: 'Comentário não encontrado' });

      if (req.user.role !== 'ADMIN' && comentario.usuario_id !== req.user.id) {
        return res.status(403).json({ erro: 'Você só pode deletar seus próprios comentários.' });
      }

      await comentario.destroy();
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};

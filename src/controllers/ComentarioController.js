// controllers/ComentarioController.js
const { Usuario } = require('../models/index');

module.exports = {
  async create(req, res, next) {
    try {
      const autorId = req.user.id;
      const { texto, mensagem_id } = req.body;

      // Você pode querer validar se a mensagem existe antes de criar comentário

      const comentario = await Comentario.create({
        texto,
        usuario_id: autorId,
        mensagem_id
      });

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
        where: { mensagem_id: mensagemId },
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
      if (req.user.role !== 'ADMIN' && comentario.usuario_id !== req.user.id) {
        return res.status(403).json({ error: 'Você só pode deletar seus próprios comentários.' });
      }
      await comentario.destroy();
      res.status(204).send();
    } catch (err) {
      next(err);
    }
  }
};

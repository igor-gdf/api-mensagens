//UsuarioController.js
const { Usuario } = require('../models/index');

module.exports = {
  async create(req, res, next) {
    try {
      const novoUsuario = await Usuario.create(req.body);
      const { senha, ...usuarioSemSenha } = novoUsuario.toJSON();
      res.status(201).json(usuarioSemSenha);
    } catch (error) {
      next(error);
    }
  },

  async list(req, res, next) {
    try {
      const usuarios = await Usuario.findAll({ attributes: { exclude: ['senha'] } });
      res.json(usuarios);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const usuario = await Usuario.findByPk(req.params.id, { attributes: { exclude: ['senha'] } });
      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });
      res.json(usuario);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });

      await usuario.update(req.body);

      const { senha, ...dados } = usuario.toJSON();
      res.json(dados);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) return res.status(404).json({ erro: 'Usuário não encontrado.' });

      await usuario.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

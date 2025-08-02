//UsuarioController.js
const createError = require('http-errors');
const { Usuario } = require('../models/index');

module.exports = {
  async create(req, res, next) {
    try {
      const { nome, email, senha, } = req.body;
      const jaExiste = await Usuario.findOne({ where: { email } });
      if (jaExiste) {
        throw createError(400, 'E-mail já cadastrado.');
      }

      const novoUsuario = await Usuario.create({ nome, email, senha, perfil: 'USER' });
      const { senha: _, ...usuarioSemSenha } = novoUsuario.toJSON();

      res.status(201).json(usuarioSemSenha);
    } catch (error) {
      next(error);
    }
  },

  async list(req, res, next) {
    try {
      const usuarios = await Usuario.findAll({
        attributes: { exclude: ['senha'] }
      });
      res.json(usuarios);
    } catch (error) {
      next(error);
    }
  },

  async getById(req, res, next) {
    try {
      const usuario = await Usuario.findByPk(req.params.id, {
        attributes: { exclude: ['senha'] }
      });

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      // Restrição: somente o próprio usuário ou ADMIN
      if (req.user.role !== 'ADMIN' && req.user.id != req.params.id) {
        return res.status(403).json({ erro: 'Acesso negado.' });
      }

      res.json(usuario);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);

      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      // Restrição: somente o próprio usuário ou ADMIN
      if (req.user.role !== 'ADMIN' && req.user.id != req.params.id) {
        return res.status(403).json({ erro: 'Acesso negado.' });
      }

      const { nome, email } = req.body;
      if (nome) usuario.nome = nome;
      if (email) usuario.email = email;

      await usuario.save();

      const { senha, ...dados } = usuario.toJSON();
      res.json(dados);
    } catch (error) {
      next(error);
    }
  },

  async delete(req, res, next) {
    try {
      const usuario = await Usuario.findByPk(req.params.id);
      if (!usuario) {
        return res.status(404).json({ erro: 'Usuário não encontrado.' });
      }

      await usuario.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

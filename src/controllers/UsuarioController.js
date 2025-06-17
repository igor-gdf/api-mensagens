//UsuarioController.js
const Usuario = require('../models/Usuario');
const ERROR = require('../utils/errorcodes');

module.exports = {
  async create(req, res, next) {
    try {
      const { nome, email, senha } = req.body;

      // Validações básicas
      if (!nome || nome.trim() === '') {
        return res.status(400).json({ error: 'Nome é obrigatório.' });
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email inválido.' });
      }

      const senhaRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@!%*?&]).{8,}$/;
      if (!senhaRegex.test(senha)) {
        return res.status(400).json({
          error: 'A senha deve ter no mínimo 8 caracteres, incluindo 1 número, 1 letra maiúscula, 1 letra minúscula e 1 caractere especial (@!%*?&).'
        });
      }

      // Verifica se o e-mail já está em uso
      const jaExiste = await Usuario.findOne({ where: { email } });
      if (jaExiste) {
        return res.status(400).json({ error: 'E-mail já cadastrado.' });
      }

      const novoUsuario = await Usuario.create({ nome, email, senha });

      // Oculta a senha no retorno
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
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      res.json(usuario);
    } catch (error) {
      next(error);
    }
  },

  async update(req, res, next) {
    try {
      const { nome, email } = req.body;
      const usuario = await Usuario.findByPk(req.params.id);

      if (!usuario) {
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

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
        return res.status(404).json({ error: 'Usuário não encontrado.' });
      }

      await usuario.destroy();
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
};

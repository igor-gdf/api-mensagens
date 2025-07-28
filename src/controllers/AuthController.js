//AuthController.js
const createError = require('http-errors');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        throw createError(401, 'Credenciais inválidas.');
      }

      const payload = { id: usuario.id, email: usuario.email, perfil: usuario.perfil, };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'SENHA', {
        expiresIn: '1h',
      });
      const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, {
        expiresIn: '7d',
      });

      res.json({ token, refreshToken });
    } catch (err) {
      next(err);
    }
  },

  async refreshToken(req, res, next) {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken) {
        return res.status(401).json({ message: 'Refresh token necessário' });
      }

      jwt.verify(refreshToken, process.env.REFRESH_SECRET, (err, payload) => {
        if (err) return res.status(403).json({ message: 'Refresh token inválido' });

        const newToken = jwt.sign({ id: payload.id, email: payload.email }, process.env.JWT_SECRET || 'SENHA', { expiresIn: '1h' });

        res.json({ token: newToken });
      });
    } catch (err) {
      next(err);
    }
  }
};

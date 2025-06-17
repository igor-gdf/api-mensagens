//AuthController.js
const Usuario = require('../models/Usuario');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async login(req, res, next) {
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({ where: { email } });

      if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
        return res.status(401).json({ error: 'Credenciais inválidas.' });
      }

      const payload = { id: usuario.id, email: usuario.email };
      const token = jwt.sign(payload, process.env.JWT_SECRET || 'segredo_super_secreto', {
        expiresIn: '1h',
      });

      res.json({ token });
    } catch (err) {
      next(err);
    }
  }
};

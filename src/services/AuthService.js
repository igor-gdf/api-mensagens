const createError = require('http-errors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { gerarTokens, verificarRefreshToken } = require('../utils/auth.utils');
const { Usuario } = require('../models'); // Ajuste o caminho conforme seu projeto

async function login(email, senha) {
  if (!email || !senha) throw createError(400, 'Email e senha são obrigatórios.');

  const usuario = await Usuario.findOne({ where: { email } }); // Exemplo com Sequelize
  if (!usuario) throw createError(401, 'Usuário não encontrado.');

  const senhaValida = await bcrypt.compare(senha, usuario.senhaHash); // ajuste campo senha conforme seu modelo
  if (!senhaValida) throw createError(401, 'Senha incorreta.');

  return gerarTokens(usuario);
}

async function refresh(refreshToken) {
  if (!refreshToken) throw createError(401, 'Refresh token necessário');

  const payload = await verificarRefreshToken(refreshToken);

  const token = jwt.sign(
    { id: payload.id, email: payload.email, perfil: payload.perfil },
    process.env.JWT_SECRET || 'SENHA',
    { expiresIn: '1h' }
  );

  return { token };
}

module.exports = {
  login,
  refresh,
};

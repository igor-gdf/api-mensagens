// models/index.js
const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const Usuario = require('./Usuario')(sequelize, Sequelize.DataTypes);
const Mensagem = require('./Mensagem')(sequelize, Sequelize.DataTypes);
const Comentario = require('./Comentario')(sequelize, Sequelize.DataTypes);

// Associações
Mensagem.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'autor' });
Mensagem.hasMany(Comentario, { foreignKey: 'mensagem_id', as: 'comentarios' });

Comentario.belongsTo(Usuario, { foreignKey: 'usuario_id', as: 'autor' });
Comentario.belongsTo(Mensagem, { foreignKey: 'mensagem_id', as: 'mensagem' });

module.exports = {
  sequelize,
  Usuario,
  Mensagem,
  Comentario
};

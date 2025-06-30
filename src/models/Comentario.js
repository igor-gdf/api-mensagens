// models/Comentario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Mensagem = require('./Mensagem');

const Comentario = sequelize.define('Comentario', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  conteudo: { type: DataTypes.STRING, allowNull: false },
  autorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Usuarios', key: 'id' }
  },
  mensagemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'Mensagens', key: 'id' }
  }
}, {
  tableName: 'comentarios',
  timestamps: false
});

Comentario.belongsTo(Usuario, { foreignKey: 'autorId', as: 'autor' });
Comentario.belongsTo(Mensagem, { foreignKey: 'mensagemId', as: 'mensagem' });

module.exports = Comentario;
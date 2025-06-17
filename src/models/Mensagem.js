//mensagem.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Mensagem = sequelize.define('Mensagem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  conteudo: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'mensagens',
  timestamps: false
});

module.exports = Mensagem;


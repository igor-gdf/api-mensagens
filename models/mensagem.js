// models/mensagem.js
const Sequelize = require('sequelize');
const sequelize = require('../db');

const Mensagem = sequelize.define('mensagem', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  conteudo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Mensagem;

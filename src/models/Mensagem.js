const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Usuario = require('./Usuario');

const Mensagem = sequelize.define('Mensagem', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  conteudo: {
    type: DataTypes.STRING,
    allowNull: false
  },
  autorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'usuarios',
      key: 'id'
    }
  }
}, {
  tableName: 'mensagens',
  timestamps: false
});

Mensagem.belongsTo(Usuario, { foreignKey: 'autorId', as: 'autor' });

module.exports = Mensagem;

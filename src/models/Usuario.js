const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  perfil: {
    type: DataTypes.ENUM('USER', 'ADMIN'),
    allowNull: false,
    defaultValue: 'USER',
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'usuarios'
});

Usuario.beforeCreate(async (user) => {
  user.senha = await bcrypt.hash(user.senha, 10);
});

module.exports = Usuario;

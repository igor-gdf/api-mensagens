//Usuario.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      is: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@!%*?&]).{8,}$/i
    }
  }
});

Usuario.beforeCreate(async (user) => {
  user.senha = await bcrypt.hash(user.senha, 10);
});

module.exports = Usuario;

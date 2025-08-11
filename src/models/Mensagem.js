// models/Mensagem.js
module.exports = (sequelize, DataTypes) => {
  const Mensagem = sequelize.define('Mensagem', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    titulo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },

    conteudo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // define automaticamente a data/hora no momento da criação
    }
  }, {
    tableName: 'mensagens',
    timestamps: false
  });

  return Mensagem;
};


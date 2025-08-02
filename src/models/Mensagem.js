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
      allowNull: false
    },
    conteudo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'mensagens',
    timestamps: false
  });

  return Mensagem;
};

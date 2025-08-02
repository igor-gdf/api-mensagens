// models/Comentario.js
module.exports = (sequelize, DataTypes) => {
  const Comentario = sequelize.define('Comentario', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    conteudo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    mensagem_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'comentarios',
    timestamps: false
  });

  return Comentario;
};

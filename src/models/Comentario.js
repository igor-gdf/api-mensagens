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
    },
    data_criacao: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    editado: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  }, {
    tableName: 'comentarios',
    timestamps: false,
    hooks: {
      beforeUpdate: (comentario, options) => {
        if (comentario.changed('editado') && comentario.editado === false) {
          comentario.editado = true;
        } else {
          comentario.editado = true;
        }
      }
    }
  });

  return Comentario;
};


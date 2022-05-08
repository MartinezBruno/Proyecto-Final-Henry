const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Usuario', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    NOMBRE_APELLIDO_USUARIO: {
      type: DataTypes.STRING,
    },

    PASSWORD: {
      type: DataTypes.STRING,
    },

    EMAIL: {
      type: DataTypes.STRING,
    },

    IMAGEN: {
      type: DataTypes.STRING,
      defaultValue: 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20',
    },

    FECHA_NACIMIENTO: {
      type: DataTypes.STRING,
    },

    CALIFICACION: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: false,
      defaultValue: [],
    },

    CELULAR: {
      type: DataTypes.BIGINT,
    },

    FAVORITOS: {
      type: DataTypes.ARRAY(DataTypes.UUID),
      allowNull: false,
      defaultValue: [],
    },
  })
}

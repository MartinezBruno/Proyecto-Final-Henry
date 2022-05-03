const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Usuario', {
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
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 123456789
    }
  })
}

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
      defaultValue: 123456789,
    },
    COMPRAS: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      defaultValue: [],
    },
  })
}

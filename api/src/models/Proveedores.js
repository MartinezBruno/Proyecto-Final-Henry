const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Proveedor', {
    NOMBRE_APELLIDO_PROVEEDOR: {
      type: DataTypes.STRING,
    },

    PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    EMAIL: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    IMAGEN: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    FECHA_NACIMIENTO: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    CALIFICACION: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: false,
      defaultValue: [],
    },  
  })
}

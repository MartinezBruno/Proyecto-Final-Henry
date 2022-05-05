const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Pregunta', {
    PREGUNTA: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
    RESPUESTA: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
  })
}

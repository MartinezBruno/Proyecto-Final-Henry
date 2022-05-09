const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Pregunta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement : true
    },
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

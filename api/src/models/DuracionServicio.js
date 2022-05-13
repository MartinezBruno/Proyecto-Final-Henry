const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('DuracionServicio', {
    DURACION: {
      type: DataTypes.STRING,
      defaultValue: 'Sin definir',
    },
  })
}

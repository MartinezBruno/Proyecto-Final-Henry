const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Provincia', {
    NOMBRE_PROVINCIA: {
      type: DataTypes.STRING,
      defaultValue: 'Sin definir',
    },
  })
}

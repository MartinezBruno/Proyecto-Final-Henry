const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Precio', {
    PRECIO: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
  })
}

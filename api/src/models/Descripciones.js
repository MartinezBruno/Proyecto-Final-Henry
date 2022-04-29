const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Descripcion', {
    DESCRIPCION: {
      type: DataTypes.TEXT,
    },
  })
}

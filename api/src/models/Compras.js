const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Compra', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  })
}

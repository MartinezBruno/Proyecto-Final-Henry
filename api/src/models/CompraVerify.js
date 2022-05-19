const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('CompraVerify', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  })
}

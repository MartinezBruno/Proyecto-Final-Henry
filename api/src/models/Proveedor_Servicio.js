const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Proveedor_Servicio', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
  })
}

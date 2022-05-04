const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'Pais',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      NOMBRE_PAIS: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  )
}

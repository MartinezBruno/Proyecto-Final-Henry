const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'Ciudad',
    {
      NOMBRE_CIUDAD: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  )
}

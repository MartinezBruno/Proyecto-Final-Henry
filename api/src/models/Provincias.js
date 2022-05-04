const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define(
    'Provincia',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
      },
      NOMBRE_PROVINCIA: {
        type: DataTypes.STRING,
        defaultValue: 'Sin definir',
      },
    },
    { timestamps: false }
  )
}

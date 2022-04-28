const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Servicio', {
    NOMBRE_SERVICIO: {
      type: DataTypes.STRING,
    },
    REMOTE: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  })
}

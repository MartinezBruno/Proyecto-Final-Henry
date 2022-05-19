const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Evento', {
    START: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    END: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    TITLE: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DURATION: {
      type: DataTypes.STRING,
    },
    AGREGADO: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  })
}

const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Evento', {
    START: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    END: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    TITLE: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    DURATION: {
      type: DataTypes.STRING,
    },
  })
}

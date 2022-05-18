const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Ayuda', {
    ASUNTO: {
        type: DataTypes.TEXT,
        allowNull: false
    }
  })
}
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Comentario', {
    COMENTARIO: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
  })
}

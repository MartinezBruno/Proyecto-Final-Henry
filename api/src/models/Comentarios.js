const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Comentario', {
    CALIFICACION: {
      type: DataTypes.INTEGER,
    },
    COMENTARIO: {
      type: DataTypes.TEXT,
      defaultValue: '',
    },
  })
}

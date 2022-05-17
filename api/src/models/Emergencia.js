const { DataTypes } = require('sequelize')


module.exports = (sequelize) => {
    sequelize.define('Emergencia', {
     ESPERA_MAXIMA: {
        type: DataTypes.TEXT,
      },
      PRECIO_MAXIMO: {
        type: DataTypes.INTEGER
      },
      COMPRA_SUCCES: {
        type: DataTypes.TEXT,
        defaultValue: 'No'
      }
    })

}
  
const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Favorito', {
    NOMBRE_APELLIDO_PROVEEDOR: {
      type: DataTypes.STRING,
    },
    PROVEEDOR_ID: {
      type: DataTypes.UUID,
    },
    CELULAR: {
      type: DataTypes.BIGINT,
    },
    EMAIL: {
      type: DataTypes.STRING,
    },
    IMAGEN: {
      type: DataTypes.STRING,

      defaultValue: 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20',
    },
    EMAIL: {
      type: DataTypes.STRING,
    },
    IMAGEN: {
      type: DataTypes.STRING,

      defaultValue: 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20',
    },
    PAIS: {
      type: DataTypes.STRING,
    },
    CIUDAD: {
      type: DataTypes.STRING,
    },
    PROVINCIA: {
      type: DataTypes.STRING,
    },
  })
}

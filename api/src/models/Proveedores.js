const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Proveedor', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    NOMBRE_APELLIDO_PROVEEDOR: {
      type: DataTypes.STRING,
    },
    CELULAR: {
      type: DataTypes.INTEGER,
    },
    PASSWORD: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    EMAIL: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    IMAGEN: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20',
    },
    FECHA_NACIMIENTO: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CALIFICACION: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: false,
      defaultValue: [],
    },
  })
}

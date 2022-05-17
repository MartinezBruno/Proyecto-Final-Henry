const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Usuario', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    NOMBRE_APELLIDO_USUARIO: {
      type: DataTypes.STRING,
    },

    PASSWORD: {
      type: DataTypes.STRING,
    },

    EMAIL: {
      type: DataTypes.STRING,
    },

    IMAGEN: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20',
    },

    FECHA_NACIMIENTO: {
      type: DataTypes.STRING,
    },

    CALIFICACION: {
      type: DataTypes.ARRAY(DataTypes.FLOAT),
      allowNull: false,
      defaultValue: [],
    },

    CELULAR: {
      type: DataTypes.BIGINT,
    },

    CODE: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    STATUSCODE: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'SIN VERIFICAR',
    },
  
    BANNED: {
       type: DataTypes.STRING,
       defaultValue: 'No'
    }
  
  })
}

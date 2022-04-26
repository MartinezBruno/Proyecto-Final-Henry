const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define("Proveedor", {
    NOMBRE_PROVEDOOR: {
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
    },

    NOMBRE_APELLIDO: {
      type: DataTypes.STRING,
    },

    FECHA_NACIMIENTO: {
      type: DataTypes.DATE,
    },

    CALIFICACION: {
      type: DataTypes.FLOAT,
    },

    STATUS: {
      type: DataTypes.STRING,
    },
  });
};

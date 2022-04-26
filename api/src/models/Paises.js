const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Pais", {
    NOMBRE_PAIS: {
      type: DataTypes.STRING,
    },
  });
};

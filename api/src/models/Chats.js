const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  sequelize.define('Chat', {
    CHAT: {
      type: DataTypes.ARRAY(DataTypes.TEXT),
      defaultValue: [],
    },
  })
}
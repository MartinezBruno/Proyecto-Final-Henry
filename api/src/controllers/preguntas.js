const { Proveedor, Servicio, Ciudad, Provincia, Pais, Precio, Proveedor_Servicio, Descripcion, Role, Pregunta } = require('../db')
const Sequelize = require('sequelize')

const addPregunta = async (req, res) => {
  res.status(200).send('ruta creada')
}

module.exports = {
  addPregunta,
}

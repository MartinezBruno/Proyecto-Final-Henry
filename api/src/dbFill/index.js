const { Pais, Servicio } = require('../db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const paises = ['Argentina', 'Uruguay', 'Mexico']
const servicios = [
  { NOMBRE_SERVICIO: 'Profe de Guitarra', REMOTE: true },
  { NOMBRE_SERVICIO: 'Profe de Guitarra', REMOTE: false },
  { NOMBRE_SERVICIO: 'Jardinero', REMOTE: false },
  { NOMBRE_SERVICIO: 'Profe de Quimica', REMOTE: true },
  { NOMBRE_SERVICIO: 'TaxiBoy', REMOTE: false },
]

function paisesDb() {
  paises.forEach((pais) => {
    Pais.findOrCreate({
      where: {
        NOMBRE_PAIS: pais,
      },
    })
  })
}

function serviciosDb() {
  servicios.forEach((servicio) => {
    console.log(servicio)
    Servicio.findOrCreate({
      where: {
        NOMBRE_SERVICIO: servicio.NOMBRE_SERVICIO,
        REMOTE: servicio.REMOTE,
      },
    })
  })
}

module.exports = {
  paisesDb,
  serviciosDb,
}

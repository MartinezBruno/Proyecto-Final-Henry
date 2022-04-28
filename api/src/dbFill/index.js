const { Pais, Servicio } = require('../db')

const paises = ['Argentina', 'Uruguay', 'Mexico']
// const servicios = [
//   { NOMBRE_SERVICIO: 'Profe de Guitarra', REMOTE: true, PRICE: 0 },
//   { NOMBRE_SERVICIO: 'Profe de Guitarra', REMOTE: false, PRICE: 0 },
//   { NOMBRE_SERVICIO: 'Jardinero', REMOTE: false, PRICE: 0 },
//   { NOMBRE_SERVICIO: 'Profe de Quimica', REMOTE: true, PRICE: 0 },
//   { NOMBRE_SERVICIO: 'TaxiBoy', REMOTE: false, PRICE: 0 },
// ]

function paisesDb() {
  paises.forEach((pais) => {
    Pais.findOrCreate({
      where: {
        NOMBRE_PAIS: pais,
      },
    })
  })
}

// function serviciosDb() {
//   servicios.forEach((servicio) => {
//     Servicio.findOrCreate({
//       where: {
//         NOMBRE_SERVICIO: servicio.NOMBRE_SERVICIO,
//         REMOTE: servicio.REMOTE,
//         PRICE: servicio.PRICE,
//       },
//     })
//   })
// }

module.exports = {
  paisesDb,
}

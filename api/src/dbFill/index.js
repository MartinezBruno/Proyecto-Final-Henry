const { Pais, Servicio, Role } = require('../db')

const paises = ['Argentina', 'Uruguay', 'Mexico']
const servicios = [
  { NOMBRE_SERVICIO: 'Sin servicios disponibles', REMOTE: true },
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
    Servicio.findOrCreate({
      where: {
        NOMBRE_SERVICIO: servicio.NOMBRE_SERVICIO,
        REMOTE: servicio.REMOTE,
      },
    })
  })
}


function initialRoles() {
  Role.create({
    id: 1,
    name: "user"
  });

  Role.create({
    id: 2,
    name: "moderator"
  });

  Role.create({
    id: 3,
    name: "admin"
  });
}

module.exports = {
  paisesDb,
  serviciosDb,
  initialRoles
}

const { Pais, Servicio } = require('../db')

const paises = ['Argentina', 'Uruguay', 'Mexico']
const servicios = [
  { NOMBRE_SERVICIO: 'Sin servicios disponibles', REMOTE: true },
  { NOMBRE_SERVICIO: 'Profesor de Fisica', REMOTE: true },
  { NOMBRE_SERVICIO: 'Profesor de Fisica', REMOTE: false },
  { NOMBRE_SERVICIO: 'Profesor de Ingles', REMOTE: true },
  { NOMBRE_SERVICIO: 'Profesor de Ingles', REMOTE: false },
  { NOMBRE_SERVICIO: 'Profesor de Matematicas', REMOTE: true },
  { NOMBRE_SERVICIO: 'Profesor de Matematicas', REMOTE: false },
  { NOMBRE_SERVICIO: 'Profesor de Quimica', REMOTE: true },
  { NOMBRE_SERVICIO: 'Profesor de Quimica', REMOTE: false },
  { NOMBRE_SERVICIO: 'Jardineria', REMOTE: false },
  { NOMBRE_SERVICIO: 'Mantenimiento de piletas', REMOTE: false },
  { NOMBRE_SERVICIO: 'Servicio de mudanza', REMOTE: false },
  { NOMBRE_SERVICIO: 'Limpieza de hogares', REMOTE: false },
  { NOMBRE_SERVICIO: 'Cuidado de niños', REMOTE: false },
  { NOMBRE_SERVICIO: 'Plomeria', REMOTE: false },
  { NOMBRE_SERVICIO: 'Cerrajeria', REMOTE: false },
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

module.exports = {
  paisesDb,
  serviciosDb,
}

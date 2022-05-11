const { Pais, Servicio, Role } = require('../db')

let pais = [
  { id: 1, nombre: 'Argentina' },
  { id: 2, nombre: 'Uruguay' },
  { id: 3, nombre: 'Mexico' },
]
const servicios = [
  { NOMBRE_SERVICIO: 'Sin servicios disponibles', REMOTE: true },
  { NOMBRE_SERVICIO: 'Clase de Fisica', REMOTE: true },
  { NOMBRE_SERVICIO: 'Clase de Fisica', REMOTE: false },
  { NOMBRE_SERVICIO: 'Clase de Ingles', REMOTE: true },
  { NOMBRE_SERVICIO: 'Clase de Ingles', REMOTE: false },
  { NOMBRE_SERVICIO: 'Clase de Matematicas', REMOTE: true },
  { NOMBRE_SERVICIO: 'Clase de Matematicas', REMOTE: false },
  { NOMBRE_SERVICIO: 'Clase de Quimica', REMOTE: true },
  { NOMBRE_SERVICIO: 'Clase de Quimica', REMOTE: false },
  { NOMBRE_SERVICIO: 'Jardineria', REMOTE: false },
  { NOMBRE_SERVICIO: 'Mantenimiento de piletas', REMOTE: false },
  { NOMBRE_SERVICIO: 'Servicio de mudanza', REMOTE: false },
  { NOMBRE_SERVICIO: 'Limpieza de hogares', REMOTE: false },
  { NOMBRE_SERVICIO: 'Cuidado de niños', REMOTE: false },
  { NOMBRE_SERVICIO: 'Plomeria', REMOTE: false },
  { NOMBRE_SERVICIO: 'Cerrajeria', REMOTE: false },
]

function paisesDb() {
  pais.forEach((pais) => {
    Pais.findOrCreate({
      where: {
        NOMBRE_PAIS: pais.nombre,
        id: pais.id,
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
  Role.findOrCreate({
    where: {
      id: 1,
      name: 'usuario',
    },
  })

  Role.findOrCreate({
    where: {
      id: 2,
      name: 'proveedor',
    },
  })

  Role.findOrCreate({
    where: {
      id: 3,
      name: 'moderador',
    },
  })

  Role.findOrCreate({
    where: {
      id: 4,
      name: 'admin',
    },
  })
}

module.exports = {
  paisesDb,
  serviciosDb,
  initialRoles,
}

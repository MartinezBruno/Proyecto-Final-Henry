const { Servicio } = require('../db')

const getServicios = async (req, res) => {
  
  let servicio = await Servicio.findAll()
  console.log(servicio)
  servicio = servicio.map((servicio) => {
    return {
      id: servicio.id,
      nombre: servicio.NOMBRE_SERVICIO,
      remote: servicio.REMOTE,
    }
  })
  return res.status(200).send(servicio)
}

module.exports = {
  getServicios,
}

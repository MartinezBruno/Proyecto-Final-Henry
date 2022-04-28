const { Servicio } = require('../db')

const getServicios = async (req, res) => {
  let servicio = await Servicio.findAll()
  servicio = servicio.map((ser) => ser.NOMBRE_SERVICIO).sort()
  res.status(200).send(servicio)
}

const createServicios = async (req, res) => {
  const { NOMBRE_SERVICIO, REMOTE, PRICE } = req.body
  const servicio = await Servicio.findOrcreate({
    NOMBRE_SERVICIO,
    REMOTE,
    PRICE,
  })
  res.status(201).send(servicio)
}

module.exports = {
  getServicios,
  createServicios
}

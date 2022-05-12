const { Compra, Evento, Proveedor_Servicio } = require('../db')
const { Op } = require('sequelize')

const getEvents = async (req, res) => {
  const { compra_id } = req.params
  try {
    const compra = await Compra.findByPk(compra_id)
    if (!compra) {
      return res.status(404).send({ message: 'Compra no encontrada' })
    }
    const events = await Evento.findOne({
      where: {
        id: compra[0].EventoId,
      },
    })
    if (!events) return res.status(404).send({ message: 'Evento no encontrado' })
    return res.status(200).send(events)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error al obtener los eventos' })
  }
}

const createEvent = async (req, res) => {
  const { compra_id, title, start, end, duration } = req.body
  try {
    const compra = await Compra.findByPk(compra_id)
    if (!compra) {
      return res.status(404).send({ message: 'Compra no encontrada' })
    }
    const event = await Evento.create({
      START: start,
      END: end,
      TITLE: title,
      DURATION: duration,
    })
    await compra.setEvento(event)
    return res.status(201).send(event)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error al crear el evento' })
  }
}

const getProveedorEvents = async (req, res) => {
  const { proveedor_id } = req.params
  try {
    const prov = await Proveedor_Servicio.findAll({
      where: {
        ProveedorId: proveedor_id,
      },
    })

    const compras = []
    for (let i = 0; i < prov.length; i++) {
      const element = prov[i]
      let compra = await Compra.findOne({
        where: {
          ProveedorServicioId: element.id,
        },
      })
      if (compra) compras.push(compra)
    }
    return res.status(200).send(compras)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error al obtener los eventos del proveedor' })
  }
}

module.exports = {
  getEvents,
  createEvent,
  getProveedorEvents,
}

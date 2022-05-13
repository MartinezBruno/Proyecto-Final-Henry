const { CompraVerify, Evento, Proveedor_Servicio } = require('../db')
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

/**
 * It gets all the events of a provider
 * @param proveedor_id - The id of the provider by body.
 * @returns An array of compras
 */
const getProveedorEvents = async (req, res) => {
  const { proveedor_id } = req.params
  try {
    const prov = await Proveedor_Servicio.findAll({
      where: {
        ProveedorId: proveedor_id,
      },
    })

    const eventos = []

    for (let i = 0; i < prov.length; i++) {
      const element = prov[i]
      let evento = await CompraVerify.findAll({
        where: {
          ProveedorServicioId: element.id,
        },
      })
      if (evento.length > 0) eventos.concat(evento)
    }

    if (eventos.length === 0) return res.status(404).send({ message: 'Este proveedor no tiene eventos agendados' })

    return res.status(200).send(eventos)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error al obtener los eventos del proveedor' })
  }
}

module.exports = {
  getEvents,
  getProveedorEvents,
}

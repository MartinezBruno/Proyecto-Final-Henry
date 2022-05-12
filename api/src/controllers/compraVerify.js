const { CompraVerify, Usuario, Proveedor, Evento, Proveedor_Servicio } = require('../db')
var moment = require('moment')

const compraVerify = async (req, res) => {
  const { cart, id, start, end, title, duration } = req.body
  try {
    let idProveedor = cart?.map((compra) => compra.provID)
    let idUsuario = id
    let idServicio = cart?.map((compra) => compra.id)

    let usuario = await Usuario.findOne({ where: { id: idUsuario } })
    
    for (let i = 0; i < idProveedor.length; i++) {
      let provServ = await Proveedor_Servicio.findAll({
        where: { ProveedorId: idProveedor[i] },
      })

      let compras = []
      for (let i = 0; i < provServ.length; i++) {
        let compra = await CompraVerify.findOne({ where: { ProveedorServicioId: provServ[i].id } })
        if (compra) compras.push(compra)
      }
      if (compras) {
        console.log(compras.length)
        for (let i = 0; i < compras.length; i++) {
          let compra = compras[i]

          let evento = await Evento.findByPk(compra.EventoId)
          if (evento) {
            let startEvent = moment(evento.START)
            let endEvent = moment(evento.END)
            let startUser = moment(start)
            let endUser = moment(end)
            console.log(startEvent, startUser)
            console.log(endEvent, endUser)
            // evento.START>start && evento.END>end || evento.START<=start&&evento.END>=end || evento.start<start&&evento.END<end
            if (
              (startEvent.isAfter(startUser) && endEvent.isAfter(endUser)) ||
              (startEvent.isSameOrBefore(startUser) && endEvent.isSameOrAfter(endUser)) ||
              (startEvent.isBefore(startUser) && endEvent.isBefore(endUser))
            ) {
              return res.status(304).send({ message: 'Ya existe un evento en ese horario' })
            }
          }
        }
        let compra = await CompraVerify.create()
        const event = await Evento.create({
          START: start,
          END: end,
          TITLE: title,
          DURATION: duration,
        })
        let proveewjbf = await Proveedor_Servicio.findOne({
          where: {
            ProveedorId: idProveedor[i],
            ServicioId: idServicio[i],
          },
        })
        await compra.setEvento(event)
        await compra.setUsuario(usuario)
        await compra.setProveedor_Servicio(proveewjbf)
      }
    }
    return res.status(200).send({ message: 'Evento creado' })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ message: 'Error al crear el evento' })
  }
}

module.exports = {
  compraVerify,
}

const { CompraVerify, Usuario, Proveedor, Evento, Proveedor_Servicio } = require('../db')
var moment = require('moment')

const compraVerify = async (req, res) => {
  const { cart, id } = req.body
  try {
    let idProveedor = cart?.map((compra) => compra.provID)
    let idUsuario = id
    let idServicio = cart?.map((compra) => compra.id)
    let arrayStart = cart?.map((compra) => compra.start)
    let arrayEnd = cart?.map((compra) => compra.end)
    let arrayTitle = cart?.map((compra) => compra.nombre)
    let arrayDuration = cart?.map((compra) => compra.duration)

    let usuario = await Usuario.findOne({ where: { id: idUsuario } })

    // console.log(moment(start))
    // console.log(moment(start).add(0.5, 'h'))

    for (let i = 0; i < idProveedor.length; i++) {
      let proveedorId = idProveedor[i]
      let start = arrayStart[i]
      let end = arrayEnd[i]

      let provServ = await Proveedor_Servicio.findAll({
        where: { ProveedorId: idProveedor[i] },
      })
      let compras = []
      for (let i = 0; i < provServ.length; i++) {
        let compra = await CompraVerify.findAll({ where: { ProveedorServicioId: provServ[i].id } })
        if (compra) compras.push(compra)
      }
      compras = compras.flat()

      if (compras) {
        for (let i = 0; i < compras.length; i++) {
          // console.log('ID PROVEEDOR SERIVICIO', compras[i].ProveedorServicioId)
          // let proveedorServicio = await Proveedor_Servicio.findOne({where: {id: compras[i].ProveedorServicioId}})
          let proveedor = await Proveedor.findByPk(proveedorId)
          let evento = await Evento.findOne({ where: { id: compras[i].EventoId } })
          if (evento) {
            let startEvent = moment(evento.START)
            let endEvent = moment(evento.END)
            let startUser = moment(start)
            let endUser = moment(end)
            if (!(startEvent.isBefore(startUser) && endEvent.isSameOrBefore(startUser)) || (startEvent.isAfter(startUser) && endEvent.isSameOrAfter(endUser))) {
              return res.status(405).send({
                message:
                  'Ya existe un evento programado para ' +
                  proveedor.NOMBRE_APELLIDO_PROVEEDOR +
                  ' entre los horarios ' +
                  new Date(startUser) +
                  ' y ' +
                  new Date(endUser),
              })
            }
          }
        }
      }
    }

    for (let i = 0; i < idProveedor.length; i++) {
      let title = arrayTitle[i]
      let duration = arrayDuration[i]
      let start = arrayStart[i]
      let end = arrayEnd[i]

      let compra = await CompraVerify.create()
      const event = await Evento.create({
        START: start,
        END: end,
        TITLE: title,
        DURATION: duration,
      })
      let proveedorServicio = await Proveedor_Servicio.findOne({
        where: {
          ProveedorId: idProveedor[i],
          ServicioId: idServicio[i],
        },
      })
      await compra.setEvento(event)
      await compra.setUsuario(usuario)
      await compra.setProveedor_Servicio(proveedorServicio)
    }

    return res.status(200).send({ message: 'Eventos creados' })
  } catch (error) {
    console.error(error)
    return res.status(400).send({ message: 'Error al crear los eventos' })
  }
}

module.exports = {
  compraVerify,
}

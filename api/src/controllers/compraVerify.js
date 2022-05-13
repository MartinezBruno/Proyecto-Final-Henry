const { CompraVerify, Usuario, Proveedor, Evento, Proveedor_Servicio, DuracionServicio } = require('../db')
var moment = require('moment')

const compraVerify = async (req, res) => {
  const { cart, id } = req.body
  try {
    let idProveedor = cart?.map((compra) => compra.provID)
    let idUsuario = id
    let idServicio = cart?.map((compra) => compra.id)
    let arrayStart = cart?.map((compra) => compra.start)
    let arrayTitle = cart?.map((compra) => compra.nombre)

    let arrayDuration = []
    /* Getting the duration of each service in the cart. 
    if the duration is "Sin definir" it will be set 24hrs 
    and the event will take all the day*/
    for (let i = 0; i < cart.length; i++) {
      let provServ = await Proveedor_Servicio.findOne({ where: { ProveedorId: idProveedor[i], ServicioId: idServicio[i] } })
      let duracion = await DuracionServicio.findOne({ where: { id: provServ.DuracionServicioId } })
      if (duracion.DURACION === 'Sin definir') arrayDuration.push(24)
      else arrayDuration.push(Number(duracion.DURACION))
    }
    /* Funciona exactamente igual que el for de arriba
     pero lo hice para sacarme las ganas de entender como funciona .map() con Async/Await */

    // let arrayDuration = await Promise.all(
    //   cart?.map(async (_compra, i) => {
    //     let provServ = await Proveedor_Servicio.findOne({ where: { ProveedorId: idProveedor[i], ServicioId: idServicio[i] } })
    //     let duracion = await DuracionServicio.findOne({ where: { id: provServ.DuracionServicioId } })
    //     if (duracion.DURACION === 'Sin definir') return 24
    //     else return Number(duracion.DURACION)
    //   })
    // )

    let arrayEnd = []
    for (let i = 0; i < arrayDuration.length; i++) {
      if (typeof (arrayDuration[i] === 'number')) {
        let end = moment(arrayStart[i]).add(arrayDuration[i], 'h')
        arrayEnd.push(end.format('YYYY-MM-DD HH:mm:ss'))
      } else {
        arrayEnd.push(arrayDuration[i])
      }
    }

    console.log('soy array start', arrayStart)
    console.log('soy array end', arrayEnd)

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
            let startUser = moment(start).format('YYYY-MM-DD HH:mm:ss')
            let endUser = moment(end).format('YYYY-MM-DD HH:mm:ss')
            if (!(startEvent.isBefore(startUser) && endEvent.isSameOrBefore(startUser)) || (startEvent.isAfter(startUser) && endEvent.isSameOrAfter(endUser))) {
              return res.status(405).send({
                message: 'Ya existe un evento programado para ' + proveedor.NOMBRE_APELLIDO_PROVEEDOR + ' entre el ' + startUser + ' y ' + endUser,
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
      let end = arrayEnd[i].toString()

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

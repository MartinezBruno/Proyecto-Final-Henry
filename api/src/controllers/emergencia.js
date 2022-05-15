const e = require('express')

const {
  Usuario,
  Ciudad,
  Provincia,
  Pais,
  Proveedor,
  Comentario,
  Proveedor_Servicio,
  Compra,
  Servicio,
  Precio,
  Descripcion,
  Favorito,
  Usuario_Favorito,
  Emergencia,
} = require('../db')
const {getTemplate} = require ('./email')
const {sendMail} = require ('../mail/index')
const emergencia = async (req, res) => {
  const { precioMaximo, tiempoMaximo, ServicioId, UsuarioId } = req.body

 let emergenciaVerify = await Emergencia.findAll({
   where: { UsuarioId: UsuarioId },
 })

 if (emergenciaVerify.length > 0) {
   return res.status(400).send('Ya tienes una emergencia en curso')
 } else {
 let emergencia = await Emergencia.create({
   PRECIO_MAXIMO: precioMaximo,
   ESPERA_MAXIMA: tiempoMaximo,
 })
 let usuario = await Usuario.findByPk(UsuarioId)
 let servicio = await Servicio.findByPk(ServicioId)

 emergencia.setUsuario(usuario.id)
 emergencia.setServicio(servicio.id)
  
 // let emails = await Proveedor.findAll()
  // emails = emails.map((prov) => {
  //   return { Email: prov.EMAIL, Nombre: prov.NOMBRE_APELLIDO_PROVEEDOR, id: prov.id }
  // })

  // let provs = []
  // for (let i = 0; i < emails.length; i++) {
  //   let ProvServ = await Proveedor_Servicio.findOne({
  //     where: { ServicioId: ServicioId, ProveedorId: emails[i].id },
  //   })
  //   if (ProvServ !== null) {
  //     provs.push(ProvServ)
  //   }
    
  
  //   }
  //   let ProvDatos = []
  //   for (let i = 0; i < provs.length; i++) {
  //     let datos = await Proveedor.findOne({
  //       where: { id: provs[i].ProveedorId },
  //     })
  //   ProvDatos.push(datos)
  // }


// MAILING //
// for(let i=0; i<ProvDatos.length ;i++) {
//     // Obtener un template
//     const payload = {
//       nombre: ProvDatos[i].NOMBRE_APELLIDO_PROVEEDOR,
//       template: 'emergenciaEmail',
//     }
//     const templateObtained = await getTemplate(payload)

    // Configurar el email
    // const options = {
    //   user: 'no-reply@weattend.online',
    //   mailOptions: {
    //     from: "'Attend Emergencias' <no-reply@weattend.online>",
    //     to: `${ProvDatos[i].EMAIL}`,
    //     subject: `${ProvDatos[i].NOMBRE_APELLIDO_PROVEEDOR}, ¡Hay una emergencia disponible!`,
    //     html: templateObtained,
    //   },
    // }
    // console.log(options)
    //Enviar el mail
  //  sendMail(options)
  }
  return res.status(200).send('Emergencia agregada con exito')
}

const takeEmergencia = async (req, res) => {
  const { UsuarioId, ProveedorId, ServicioId } = req.body

  let emergenciaVerify = await Emergencia.findAll({
    where: { ProveedorId: ProveedorId },
  })

  if (emergenciaVerify.length > 0) {
    return res.status(400).send('Ya tienes una emergencia en curso')
  } else {
    let emergencia = await Emergencia.findOne({
      where: { UsuarioId: UsuarioId },
    })

    let provedorServ = await Proveedor_Servicio.findOne({
      where: { ProveedorId: ProveedorId, ServicioId: ServicioId },
    })

    emergencia.update({ ProveedorId: ProveedorId, ProveedorServicioId: provedorServ.id }, { where: { UsuarioId: UsuarioId } })
    res.status(200).send('Emergencia Aceptada')
  }
}


const getEmergenciasProv = async (req, res) => {
  const { ProveedorId} = req.params

  let proveedorServ = await Proveedor_Servicio.findAll({
    where: { ProveedorId: ProveedorId },
  })
  let emergencias = await Emergencia.findAll()
  
  
  let emergenciasMatch = []
  for (let i = 0; i < proveedorServ.length; i++) {
    for (let j = 0; j < emergencias.length; j++) {
      if (proveedorServ[i].ServicioId === emergencias[j].ServicioId) {
        if(emergencias[j].ProveedorId === ProveedorId || emergencias[j].ProveedorId === null) {
          let emergencias2 = emergencias.filter((emergencia) => emergencia.ServicioId === proveedorServ[i].ServicioId)
          emergenciasMatch.push(emergencias2)
        }
      }
    }
  }
  res.status(200).send(emergenciasMatch)
}

const getEmergenciaUsuario = async (req, res) => {
  const { UsuarioId } = req.params
  let emergencia = await Emergencia.findAll({ where: { UsuarioId: UsuarioId } })

  return res.status(200).send(emergencia)
}

const finalizarEmergencia = async (req, res) => {
  const { UsuarioId, ProveedorId } = req.body

  if (UsuarioId) {
    await Emergencia.destroy({
      where: [{ UsuarioId: UsuarioId }],
    })
    return res.status(200).send('Emergencia Finalizada')
  }

  if (ProveedorId) {
    await Emergencia.destroy({
      where: [{ ProveedorId: ProveedorId }],
    })
    return res.status(200).send('Emergencia Finalizada')
  }
}

module.exports = {
  emergencia,
  takeEmergencia,
  getEmergenciasProv,
  getEmergenciaUsuario,
  finalizarEmergencia,
}

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

    return res.status(200).send('Emergencia agregada con exito')
  }
}

const takeEmergencia = async (req, res) => {
  const { UsuarioId, ProveedorId, ServicioId } = req.body
  
  let emergenciaVerify = await Emergencia.findAll({
    where: { ProveedorId: ProveedorId},
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

const getEmergencias = async (req, res) => {
  const { ProveedorId, ServicioId, UsuarioId } = req.body

  let proveedorServ = await Proveedor_Servicio.findAll({
    where: { ProveedorId: ProveedorId },
  })
  let emergencias = await Emergencia.findAll()

  let emergenciasMatch = []
  for (let i = 0; i < proveedorServ.length; i++) {
    for (let j = 0; j < emergencias.length; j++) {
      if (proveedorServ[i].ServicioId === emergencias[j].ServicioId) {
        let emergencias2 = emergencias.filter((emergencia) => emergencia.ServicioId === proveedorServ[i].ServicioId)
        emergenciasMatch.push(emergencias2)
      }
    }
  }
  res.status(200).send(emergenciasMatch)
}

const getEmergenciaUsuario = async (req,res) =>{
  const {UsuarioId} = req.body
  let emergencia = await Emergencia.findAll({where: {UsuarioId: UsuarioId}})
  
  return res.status(200).send(emergencia)

}

module.exports = {
  emergencia,
  takeEmergencia,
  getEmergencias,
  getEmergenciaUsuario
}

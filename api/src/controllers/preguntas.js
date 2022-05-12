const { Proveedor, Proveedor_Servicio, Pregunta, Usuario } = require('../db')
const Sequelize = require('sequelize')

const addPregunta = async (req, res) => {
  const { idUsuario, idProveedor, idServicio, pregunta } = req.body

  let regex = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/

  try {
    if (!regex.test(idUsuario)) return res.status(404).send({ message: 'No es un id de Usuario válido' })
    if (!regex.test(idProveedor)) return res.status(404).send({ message: 'No es un id de Proveedor válido' })
    let usuario = await Usuario.findOne({ where: { id: idUsuario } })
    if (!usuario) return res.status(404).send({ message: 'No existe id Usuario' })
    let proveedorServicio = await Proveedor_Servicio.findOne({ where: { ProveedorId: idProveedor, ServicioId: idServicio } })
    if (!proveedorServicio) return res.status(404).send({ message: 'No existe id Proveedor_Servicio' })
    let preguntaCreada = await Pregunta.create({ PREGUNTA: pregunta })
    preguntaCreada.setUsuario(usuario)
    preguntaCreada.setProveedor_Servicio(proveedorServicio)
    return res.status(200).send(preguntaCreada)
  } catch (error) {
    // console.log(error)
    return res.status(500).send({ message: 'Error al enviar la pregunta' })
  }
}

const addRespuesta = async (req, res) => {
  const { idPregunta, idProveedor, respuesta } = req.body
  let regex = /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/
  try {
    if (!regex.test(idProveedor)) return res.status(404).send({ message: 'No es un id de Proveedor válido' })
    if (!(typeof idPregunta === 'number')) return res.status(404).send({ message: 'No es un id de pregunta válido' })
    if (!Number.isInteger(idPregunta)) return res.status(404).send({ message: 'No es un id de pregunta válido' })
    let proveedor = await Proveedor.findOne({ where: { id: idProveedor } })
    if (!proveedor) return res.status(404).send({ message: 'No existe id Proveedor' })
    let pregunta = await Pregunta.findOne({ where: { id: idPregunta } })
    if (!pregunta) return res.status(404).send({ message: 'No existe id Pregunta' })
    let proveedorServicio = await Proveedor_Servicio.findOne({ where: { id: pregunta.ProveedorServicioId } })
    if (idProveedor !== proveedorServicio.ProveedorId) return res.status(404).send({ message: 'Proveedor no valido para responder esta pregunta' })

    await Pregunta.update(
      {
        RESPUESTA: respuesta,
      },
      { where: { id: idPregunta } }
    )
    return res.status(200).send('Respuesta enviada')
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error al enviar respuesta' })
  }
}

module.exports = {
  addPregunta,
  addRespuesta,
}

const { Proveedor, Usuario, Chat } = require('../db')

const chat = async (req, res) => {
  const { idUsuario, idProveedor, mensajeProveedor, mensajeUsuario } = req.body
  let usuario = await Usuario.findOne({ where: { id: idUsuario } })
  let proveedor = await Proveedor.findOne({ where: { id: idProveedor } })
  const now = new Date();
const current = now.getHours() + ':' + now.getMinutes();
  try {
    if (mensajeUsuario) {
      let chat = await Chat.findOrCreate({
        where: { UsuarioId: idUsuario, ProveedorId: idProveedor },
      })

      let arrayChat = chat[0].CHAT
      let ultimoMensaje = chat[0].updatedAt

      arrayChat.unshift(usuario.NOMBRE_APELLIDO_USUARIO + ': ' + mensajeUsuario + ' ' + current)
      await Chat.update({ CHAT: arrayChat }, { where: { id: chat[0].id } })
      return res.status(200).send('Mensaje de Usuario enviado correctamente')
    }
    if (mensajeProveedor) {
      let chat = await Chat.findOrCreate({
        where: { UsuarioId: idUsuario, ProveedorId: idProveedor },
      })

      let arrayChat = chat[0].CHAT
      let ultimoMensaje = chat[0].updatedAt
      arrayChat.unshift(proveedor.NOMBRE_APELLIDO_PROVEEDOR + ': ' + mensajeProveedor + current)
      console.log(arrayChat)
      await Chat.update({ CHAT: arrayChat }, { where: { id: chat[0].id } })

      return res.status(200).send('Mensaje de Proveedor enviado correctamente')
    }
  } catch (error) {
    return res.status(404).send({ message: 'Mensaje no enviado' })
  }
}

const getChat = async (req, res) => {
  const { idUsuario, idProveedor } = req.body
  try {
    let chat = await Chat.findOne({
      where: { ProveedorId: idProveedor, UsuarioId: idUsuario },
    })
    res.status(200).send(chat)
  } catch (error) {
    return res.status(404).send({ message: 'Chat no encontrado' })
  }
}

module.exports = {
  chat,
  getChat,
}

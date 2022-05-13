const { Proveedor, Usuario, Chat} = require('../db')
const { Op } = require('sequelize')

const chat = async (req, res) => {
  const { idUsuario, idProveedor, mensajeProveedor, mensajeUsuario } = req.body
  let usuario = await Usuario.findOne({ where: { id: idUsuario } })
  let proveedor = await Proveedor.findOne({ where: { id: idProveedor } })
  const now = new Date()
  const current = now.getHours() + ':' + now.getMinutes()
  try {
    if (mensajeUsuario) {
      let chat = await Chat.findOrCreate({
        where: { UsuarioId: idUsuario, ProveedorId: idProveedor },
      })

      let arrayChat = chat[0].CHAT

      arrayChat.push(usuario.NOMBRE_APELLIDO_USUARIO + ': ' + mensajeUsuario + ' ' + current)
      await Chat.update({ CHAT: arrayChat }, { where: { id: chat[0].id } })
      return res.status(200).send('Mensaje de Usuario enviado correctamente')
    }
    if (mensajeProveedor) {
      let chat = await Chat.findOrCreate({
        where: { UsuarioId: idUsuario, ProveedorId: idProveedor },
      })

      let arrayChat = chat[0].CHAT
      arrayChat.push(proveedor.NOMBRE_APELLIDO_PROVEEDOR + ': ' + mensajeProveedor + ' ' + current)
      // console.log(arrayChat)
      await Chat.update({ CHAT: arrayChat }, { where: { id: chat[0].id } })

      return res.status(200).send('Mensaje de Proveedor enviado correctamente')
    }
  } catch (error) {
    return res.status(404).send({ message: 'Mensaje no enviado' })
  }
}

const getChat = async (req, res) => {
  const { idUsuario, idProveedor } = req.query
  try {
    let chat = await Chat.findOne({
      where: { ProveedorId: idProveedor, UsuarioId: idUsuario },
    })
    res.status(200).send(chat)
  } catch (error) {
    return res.status(404).send({ message: 'Chat no encontrado' })
  }
}

const getHistoryChat = async (req, res) => {
  const { idUsuario, idProveedor } = req.query
  try {
    
    if(idUsuario){

      let userChats = await Chat.findAll({
        where: { UsuarioId: idUsuario },
      })
      // console.log(userChats)
      let filt = []
      for (let i = 0; i < userChats.length; i++) {
        let proveedor = await Proveedor.findOne({ where: { id: userChats[i].ProveedorId } })
        filt.push(proveedor)
        // console.log(filt)
      
      }
     res.status(200).send(filt) 
  }
  
  if(idProveedor){

    let provChats = await Chat.findAll({
      where: { ProveedorId: idProveedor },
    })
    //  console.log(provChats)
    let filt = []
    for (let i = 0; i < provChats.length; i++) {
      let usuario = await Usuario.findOne({ where: { id: provChats[i].UsuarioId } })
      // console.log(usuario)
      filt.push(usuario)
      // console.log(filt)
    
    }
   res.status(200).send(filt) 
}

} catch {
    res.status(402).send({ message: 'Error en codigo chat' })
  }
}
module.exports = {
  chat,
  getChat,
  getHistoryChat,
}

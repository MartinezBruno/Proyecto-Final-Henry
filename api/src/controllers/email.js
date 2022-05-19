const {
  compraSuccess,
  putUser,
  confirmEmail,
  information,
  registroAdmin,
  registroUsuario,
  registroProveedor,
  ventaServicio,
  emergenciaEmail,
} = require('../mail/views')

const getTemplate = ({ precios, servicios, nombre, token, template }) => {
  switch (template) {
    case 'confirmEmail':
      return confirmEmail(nombre, token)

    case 'registroUsuario':
      return registroUsuario

    case 'registroProveedor':
      return registroProveedor

    case 'registroAdmin':
      return registroAdmin

    case 'compraSuccess':
      return compraSuccess(nombre, precios, servicios)

    case 'putUser':
      return putUser(nombre)

    case 'ventaServicio':
      return ventaServicio

    case 'information':
      return information

    case 'emergenciaEmail':
      return emergenciaEmail(nombre)

    default:
      return 'Hola como estas'
  }
}

module.exports = {
  getTemplate,
}

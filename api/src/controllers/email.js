const {
  compraServicio,
  confirmEmail,
  information,
  registroAdmin,
  registroUsuario,
  registroProveedor,
  ventaServicio,
  emergenciaEmail,
} = require('../mail/views')

const getTemplate = ({ nombre, token, template }) => {
  switch (template) {
    case 'confirmEmail':
      return confirmEmail(nombre, token)

    case 'registroUsuario':
      return registroUsuario

    case 'registroProveedor':
      return registroProveedor

    case 'registroAdmin':
      return registroAdmin

    case 'compraServicio':
      return compraServicio

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

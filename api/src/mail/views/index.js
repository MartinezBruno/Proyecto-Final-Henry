const { compraSuccess } = require('./compraSuccess')
const { putUser } = require('./putUser')
const { compraError } = require('./compraError')
const { confirmEmail } = require('./confirmEmail')
const { information } = require('./information')
const { registroAdmin } = require('./registroAdmin')
const { registroUsuario } = require('./registroUsuario')
const { registroProveedor } = require('./registroProveedor')
const { ventaSuccess } = require('./ventaSuccess')
const { ventaError } = require('./ventaError')
const { emergenciaEmail } = require('./Emergencia')

module.exports = {
  compraSuccess,
  compraError,
  putUser,
  confirmEmail,
  information,
  registroAdmin,
  registroUsuario,
  registroProveedor,
  ventaSuccess,
  ventaError,
  emergenciaEmail,
}

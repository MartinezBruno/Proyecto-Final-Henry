const { Router } = require('express')
const express = require('express')
const router = express.Router()

const {emergencia, takeEmergencia, getEmergenciasProv, getEmergenciaUsuario, finalizarEmergencia} = require ('../controllers/emergencia')

router.post('/', emergencia)
router.put('/', takeEmergencia)
router.get('/usuario/:UsuarioId', getEmergenciaUsuario)
router.get('/:ProveedorId', getEmergenciasProv)
router.delete('/', finalizarEmergencia)

module.exports = router 
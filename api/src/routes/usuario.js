const express = require('express')
const router = express.Router()

const { createUsuario, getUserById } = require('../controllers/usuarios')

// router.get('/:id', getProvByID)
router.post('/', createUsuario)
router.get('/:id', getUserById)

module.exports = router

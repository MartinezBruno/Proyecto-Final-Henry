const express = require('express')
const router = express.Router()

const { createProv, getProv } = require('../controllers/proveedores.js')

router.get('/', getProv)
router.post('/', createProv)

module.exports = router

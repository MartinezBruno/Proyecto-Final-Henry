const express = require('express')
const router = express.Router()
const bulkcreate = require('../controllers/bulkCreateProveedores.js')

router.post('/', bulkcreate)

module.exports = router

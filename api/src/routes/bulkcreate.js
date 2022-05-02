const express = require('express')
const router = express.Router()
const { bulkCreate } = require('../controllers/bulkCreateProveedores.js')

router.post('/', bulkCreate)

module.exports = router

const express = require('express')
const router = express.Router()

const { getRegion } = require('../controllers/provincias')

router.get('/:code', getRegion)

module.exports = router

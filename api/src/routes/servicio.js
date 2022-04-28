const express = require('express')
const router = express.Router()

const { getServicios, createServicios } = require('../controllers/servicios')

router.get('/', getServicios)
router.post('/', createServicios)

module.exports = router

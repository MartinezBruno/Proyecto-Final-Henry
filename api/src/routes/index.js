const { Router } = require('express')
const router = Router()

const region = require('./region')
const ciudad = require('./ciudad')
const servicio = require('./servicio')
const proveedor = require('./proveedor')

router.use('/provincias', region)
router.use('/ciudad', ciudad)
router.use('/servicios', servicio)
router.use('/proveedor', proveedor)

module.exports = router

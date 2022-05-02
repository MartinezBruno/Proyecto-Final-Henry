const { Router } = require('express')
const router = Router()

const region = require('./region')
const ciudad = require('./ciudad')
const servicio = require('./servicio')
const proveedor = require('./proveedor')
const bulkcreate = require('./bulkcreate')
const usuario = require('./usuario')

router.get('/', (req, res) => {
  res.send('API Attend Group Company')
})
router.use('/provincias', region)
router.use('/ciudad', ciudad)
router.use('/servicios', servicio)
router.use('/proveedor', proveedor)
router.use('/bulkcreate', bulkcreate)
router.use('/usuario', usuario)


module.exports = router

const { Router } = require('express')
const router = Router()

const region = require('./region')
const ciudad = require('./ciudad')
const servicio = require('./servicio')
const proveedor = require('./proveedor')
const auth = require('./auth')
const usuario = require('./usuario')
const bulkcreate = require('./bulkcreate')
const checkout = require('./checkout')
const pregunta = require('./pregunta')
const chat = require('./chat')
const { confirmEmail } = require('../mail/views')

router.get('/', (req, res) => {
  res.send('API Attend Group Company')
})
router.use('/provincias', region)
router.use('/ciudad', ciudad)
router.use('/servicios', servicio)
router.use('/proveedor', proveedor)
router.use('/auth', auth)
router.use('/test', usuario)
router.use('/bulkcreate', bulkcreate)
router.use('/usuario', usuario)
router.use('/checkout', checkout)
router.use('/pregunta', pregunta)
router.use('/chat', chat)
router.use('/mail', (req, res) => {
  const payload = {
    nombre: 'Maxi',
  }
  console.log(confirmEmail(payload))
  res.sendStatus(200)
})

module.exports = router

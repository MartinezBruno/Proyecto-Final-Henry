const express = require('express')
const router = express.Router()

const PaymentController = require('../controllers/paymentController')
const PaymentService = require('../services/paymentService')

const PaymentInstance = new PaymentController(new PaymentService())

router.get('/', (req, res) => {
  return res.json({
    '/payment': 'generate a payment link',
  })
})

router.post('/payment', (req, res, next) => {
  PaymentInstance.getPaymentLink(req, res, next)
})


module.exports = router

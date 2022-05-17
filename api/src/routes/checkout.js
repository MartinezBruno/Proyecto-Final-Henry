const express = require('express')
const router = express.Router()

const PaymentController = require('../controllers/paymentController')
const { PaymentService, PaymentProvider } = require('../services/paymentService')

const PaymentInstance = new PaymentController(new PaymentService())
const PaymentInstance2 = new PaymentController(new PaymentProvider())

router.get('/', (req, res) => {
  return res.json({
    '/payment': 'generate a payment link',
  })
})

router.post('/payment', (req, res, next) => {
  PaymentInstance.getPaymentLink(req, res, next)
})

router.post('/payment/provider', (req, res, next) => {
  PaymentInstance2.getPaymentLink(req, res, next)
})

module.exports = router

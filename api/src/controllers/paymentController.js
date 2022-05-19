class PaymentController {
  constructor(subscriptionService) {
    this.subscriptionService = subscriptionService
  }
  async getPaymentLink(req, res) {
    // const { services } = req.body
    const services = req.body
    console.log(services)
    try {
      const payment = await this.subscriptionService.createPayment(services)
      return res.json(payment)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: true, message: 'Failed to create payment' })
    }
  }
}

module.exports = PaymentController

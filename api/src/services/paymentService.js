const axios = require('axios')

class PaymentService {
  async createPayment(servicios) {
    const url = 'https://api.mercadopago.com/checkout/preferences'
    const body = {
      items: servicios?.map((servicio) => {
        return {
          title: servicio.nombre,
          description: servicio.descripcion,
          quantity: 1,
          unit_price: servicio.precio,
        }
      }),
      back_urls: {
        failure: '/failure',
        pending: '/pending',
        success: 'http://localhost:3000/home',
      },
    }

    const payment = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
      },
    })

    return payment.data
  }
}

module.exports = PaymentService

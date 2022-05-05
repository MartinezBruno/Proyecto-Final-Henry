const axios = require('axios')

class PaymentService {
  async createPayment(servicios) {
    const url = 'https://api.mercadopago.com/checkout/preferences'
    const body = {
      items: servicios.map((servicio) => {
        return {
          title: servicio.NOMBRE_SERVICIO,
          description: servicio.DESCRIPCION,
          quantity: servicio.CANTIDAD ? servicio.CANTIDAD : 1,
          unit_price: servicio.PRECIO,
        }
      }),
      back_urls: {
        failure: '/failure',
        pending: '/pending',
        success: '/success',
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

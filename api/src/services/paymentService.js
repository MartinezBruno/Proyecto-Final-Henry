const axios = require('axios')

class PaymentService {
  async createPayment(servicios) {
    console.log(servicios)
    const url = 'https://api.mercadopago.com/checkout/preferences'
    const body = {
      items: servicios?.map((servicio) => {
        return {
          id: servicio.id,
          title: servicio.nombre,
          description: servicio.descripcion,
          quantity: 1,
          unit_price: servicio.precio,
        }
      }),
      expires: true,
      expiration_date_from: new Date().toISOString(),
      expiration_date_to: new Date('December 31, 2023').toISOString(),
      back_urls: {
        failure: 'http://weattend.com.ar/home/PaymentFailed',
        pending: '/pending',
        success: 'http://weattend.com.ar/home/PaymentSuccess',
      },
      order: {
        type: 'mercadopago',
      },
      description: 'Pago de servicios, ATTEND',
      payer: {
        entity_type: 'individual',
        type: 'customer',
        identification: {},
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

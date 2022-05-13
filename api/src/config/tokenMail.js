const jwt = require('jsonwebtoken')
const { secret } = require('../config/auth.config')

const getToken = (payload) => {
  return jwt.sign(
    {
      data: payload,
    },
    secret,
    { expiresIn: '1h' }
  )
}

const getTokenData = (token) => {
  let data = null
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      console.log('Error al obtener data del token')
    } else {
      data = decoded
    }
  })

  return data
}

module.exports = {
  getToken,
  getTokenData,
}

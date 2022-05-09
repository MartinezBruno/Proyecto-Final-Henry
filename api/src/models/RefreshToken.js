const config = require('../config/auth.config')
const { v4: uuidv4 } = require('uuid')
const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  const RefreshToken = sequelize.define('refreshToken', {
    token: {
      type: DataTypes.STRING,
    },
    expiryDate: {
      type: DataTypes.DATE,
    },
  })

  RefreshToken.createToken = async function (user) {
    // console.log('Console.log dentro de la funcion', user)
    console.log(user.id)
    let expiredAt = new Date()
    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration)
    let _token = uuidv4()
    let refreshToken = await this.create({
      token: _token,
      userId: user.id,
      expiryDate: expiredAt.getTime(),
    })
    return refreshToken.token
  }

  RefreshToken.createTokenAdmin = async function (user) {
    // console.log('Console.log dentro de la funcion', user)
    console.log(user.id)
    let expiredAt = new Date()
    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration)
    let _token = uuidv4()
    let refreshToken = await this.create({
      token: _token,
      adminId: user.id,
      expiryDate: expiredAt.getTime(),
    })
    return refreshToken.token
  }

  RefreshToken.createTokenProv = async function (user) {
    // console.log('Console.log dentro de la funcion', user)
    console.log(user.id)
    let expiredAt = new Date()
    expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration)
    let _token = uuidv4()
    let refreshToken = await this.create({
      token: _token,
      proveedorId: user.id,
      expiryDate: expiredAt.getTime(),
    })
    return refreshToken.token
  }

  RefreshToken.verifyExpiration = (token) => {
    return token.expiryDate.getTime() < new Date().getTime()
  }

  return RefreshToken
}

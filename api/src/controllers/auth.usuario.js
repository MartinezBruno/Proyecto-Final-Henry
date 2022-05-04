const config = require('../config/auth.config')
const { Usuario, Ciudad, Provincia, Pais, Role, RefreshToken } = require('../db')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {
  const { nombre, apellido, password, email, imagen, fecha_nacimiento, pais, provincia, ciudad, celular, role } = req.body
  try {
    let paisDisp = await Pais.findOne({
      where: { NOMBRE_PAIS: pais },
    })
    let provinciaDisp = await Provincia.findOne({
      where: { NOMBRE_PROVINCIA: provincia },
    })
    let ciudadDisp = await Ciudad.findOne({
      where: { NOMBRE_CIUDAD: ciudad },
    })
    let newUser = await Usuario.create({
      NOMBRE_APELLIDO_USUARIO: `${nombre} ${apellido}`,
      PASSWORD: bcrypt.hashSync(password, 8),
      EMAIL: email,
      IMAGEN: imagen,
      FECHA_NACIMIENTO: fecha_nacimiento,
      CELULAR: celular,
    })
    await newUser.setPai(paisDisp)
    await newUser.setProvincium(provinciaDisp)
    await newUser.setCiudad(ciudadDisp)

    let role = await Role.findOne({
      where: { id: 1 },
    })
    newUser.setRole(role)
    res.send({ message: '¡Usuario registrado exitosamente!' })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

exports.signin = async (req, res) => {
  const { email, password } = req.body
  try {
    let user = await Usuario.findOne({
      where: {
        EMAIL: email,
      },
      include: [
        {
          model: Pais,
          attributes: ['NOMBRE_PAIS'],
        },
        {
          model: Provincia,
          attributes: ['NOMBRE_PROVINCIA'],
        },
        {
          model: Ciudad,
          attributes: ['NOMBRE_CIUDAD'],
        },
      ],
    })
    if (!user) return res.status(404).send({ message: 'Usuario no encontrado.' })
    const passwordIsValid = bcrypt.compareSync(password, user.PASSWORD)
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: '¡Usuario o contraseña incorrecta!',
      })
    }
    const token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    })
    let refreshToken = await RefreshToken.createToken(user)
    let authorities = []
    let roles = await user.getRole()
    authorities.push('STATUS_' + roles.dataValues.name.toUpperCase())
    res.status(200).send({
      id: user.id,
      nombreApellido: user.NOMBRE_APELLIDO_USUARIO,
      email: user.EMAIL,
      celular: user.CELULAR,
      fechaDeNacimiento: user.FECHA_NACIMIENTO,
      pais: user.Pai ? user.Pai.NOMBRE_PAIS : 'Sin definir',
      provincia: user.Provincium ? user.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
      ciudad: user.Ciudad ? user.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
      Role: authorities[0],
      accessToken: token,
      refreshToken: refreshToken,
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

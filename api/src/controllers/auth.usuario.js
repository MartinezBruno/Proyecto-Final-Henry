const config = require('../config/auth.config')
const { Usuario, Ciudad, Provincia, Pais, Role, RefreshToken } = require('../db')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const { sendMail } = require('../mail')
const { v4: uuidv4 } = require('uuid')
const { getToken, getTokenData } = require('../config/tokenMail')
const { getTemplate } = require('./email')

exports.signup = async (req, res) => {
  const { nombre, apellido, password, email, imagen, fecha_nacimiento, pais, provincia, ciudad, celular, role } = req.body
  try {
    let paisDisp = pais
      ? await Pais.findOne({
          where: { NOMBRE_PAIS: pais },
        })
      : null
    let provinciaDisp = provincia
      ? await Provincia.findOne({
          where: { NOMBRE_PROVINCIA: provincia },
        })
      : null
    let ciudadDisp = ciudad
      ? await Ciudad.findOne({
          where: { NOMBRE_CIUDAD: ciudad },
        })
      : null

    // Generar el código
    const code = uuidv4()

    let newUser = await Usuario.create({
      NOMBRE_APELLIDO_USUARIO: `${nombre} ${apellido}`,
      PASSWORD: bcrypt.hashSync(password, 8),
      EMAIL: email,
      IMAGEN: imagen,
      FECHA_NACIMIENTO: fecha_nacimiento,
      CELULAR: celular,
      CODE: code,
    })

    if (paisDisp) await newUser.setPai(paisDisp)
    if (provinciaDisp) await newUser.setProvincium(provinciaDisp)
    if (ciudadDisp) await newUser.setCiudad(ciudadDisp)

    let role = await Role.findOne({
      where: { id: 1 },
    })
    newUser.setRole(role)

    // MAILING //

    // Generar token
    const token = getToken({ email, code })

    // Obtener un template
    const payload = {
      nombre: nombre,
      token: token,
      template: 'confirmEmail',
    }
    const templateObtained = await getTemplate(payload)

    // Configurar el email
    const options = {
      user: 'no-reply@weattend.online',
      mailOptions: {
        from: "'Attend' <no-reply@weattend.online>",
        to: `${email}`,
        subject: '¡Bienvenido a Attend!',
        html: templateObtained,
      },
    }
    console.log(options)
    //Enviar el mail
    // sendMail(options)

    return res.status(201).send({ message: '¡Usuario registrado exitosamente!' })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

exports.confirm = async (req, res) => {
  try {
    // Obtener el token
    const { token } = req.params

    // Verificar la data
    const data = await getTokenData(token)

    if (data === null) {
      return res.json({
        success: false,
        msg: 'Error al obtener data',
      })
    }

    const { email, code } = data.data

    // Verificar existencia del usuario
    const user = await Usuario.findOne({
      where: {
        EMAIL: email,
      },
    })

    if (!user) {
      return res.json({
        success: false,
        msg: 'Usuario no existe',
      })
    }

    // Verificar el código
    if (code !== user.CODE) {
      return res.send('/error.html')
    }

    // Actualizar usuario
    await Usuario.update(
      {
        STATUSCODE: 'VERIFICADO',
      },
      {
        where: {
          EMAIL: email,
        },
      }
    )

    // Obtener un template
    const template = getTemplate(user.NOMBRE, (template = 'registroUsuario'))

    // Configurar el email
    const options = {
      user: 'no-reply@weattend.online',
      mailOptions: {
        from: "'Attend' <no-reply@weattend.online>",
        to: `${email}`,
        subject: '¡Bienvenido a Attend!',
        html: template,
      },
    }

    //Enviar el mail
    sendMail(options)

    // Redireccionar a la confirmación
    return res.send('/confirm.html')
  } catch (error) {
    console.log(error)
    return res.json({
      success: false,
      msg: 'Error al confirmar usuario',
    })
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
    authorities.push(roles.dataValues.name.toUpperCase())
    return res.status(200).send({
      id: user.id,
      nombreApellido: user.NOMBRE_APELLIDO_USUARIO,
      email: user.EMAIL,
      celular: user.CELULAR ? user.CELULAR : 123456789,
      fechaDeNacimiento: user.FECHA_NACIMIENTO ? user.FECHA_NACIMIENTO : 'Sin definir',
      pais: user.Pai ? user.Pai.NOMBRE_PAIS : 'Sin definir',
      provincia: user.Provincium ? user.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
      ciudad: user.Ciudad ? user.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
      favoritos: user.FAVORITOS,
      Role: authorities[0],
      accessToken: token,
      refreshToken: refreshToken,
      message: '¡Bienvenido!',
      banned: user.BANNED
    })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

const config = require('../config/auth.config')
const { Admin, Ciudad, Provincia, Pais, Role, RefreshToken } = require('../db')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const { sendMail } = require('../mail')
const { v4: uuidv4 } = require('uuid')
const { getToken, getTokenData } = require('../config/tokenMail')
const { getTemplate } = require('./email')

exports.signup = async (req, res) => {
  const { nombre, apellido, password, email, imagen, fecha_nacimiento, pais, provincia, ciudad, celular, empresa, puesto } = req.body
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

    // Generar el código
    const code = uuidv4()

    let newUser = await Admin.create({
      NOMBRE_APELLIDO_USUARIO: `${nombre} ${apellido}`,
      PASSWORD: bcrypt.hashSync(password, 8),
      EMAIL: email,
      IMAGEN: imagen,
      FECHA_NACIMIENTO: fecha_nacimiento,
      CELULAR: celular,
      EMPRESA: empresa,
      PUESTO: puesto,
      CODE: code,
    })
    await newUser.setPai(paisDisp)
    await newUser.setProvincium(provinciaDisp)
    await newUser.setCiudad(ciudadDisp)

    let role = await Role.findOne({
      where: { id: 4 },
    })
    newUser.setRole(role)

    // MAILING //

    // Generar token
    const token = getToken({ email, code })

    // Obtener un template
    const template = getTemplate(nombre, token)

    // Configurar el email
    const options = {
      user: 'no-reply@weattend.online',
      mailOptions: {
        from: "'Attend' <no-reply@weattend.online>",
        to: `${email}`,
        subject: '¡Bienvenido a Attend!',
        text: 'Para acceder a todas nuestras funcionalidades por favor verificá tu e-mail.',
        html: template,
      },
    }

    //Enviar el mail
    // sendMail(options)

    return res.status(201).send({ message: 'Administrador creado exitosamente!' })
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
    const user = await Admin.findOne({
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
    await Admin.update(
      {
        STATUSCODE: 'VERIFICADO',
      },
      {
        where: {
          EMAIL: email,
        },
      }
    )

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
    let admin = await Admin.findOne({
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
    console.log(admin)
    if (!admin) return res.status(404).send({ message: 'Admin no encontrado.' })
    const passwordIsValid = bcrypt.compareSync(password, admin.PASSWORD)
    if (!passwordIsValid) {
      return res.status(401).send({
        accessToken: null,
        message: '¡Usuario o contraseña incorrecta!',
      })
    }
    const token = jwt.sign({ id: admin.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    })
    let refreshToken = await RefreshToken.createTokenAdmin(admin)
    let authorities = []
    let roles = await admin.getRole()
    authorities.push(roles.dataValues.name.toUpperCase())
    return res.status(200).send({
      id: admin.id,
      nombreApellido: admin.NOMBRE_APELLIDO_USUARIO,
      email: admin.EMAIL,
      celular: admin.CELULAR,
      fechaDeNacimiento: admin.FECHA_NACIMIENTO,
      pais: admin.Pai ? admin.Pai.NOMBRE_PAIS : 'Sin definir',
      provincia: admin.Provincium ? admin.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
      ciudad: admin.Ciudad ? admin.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
      empresa: admin.EMPRESA,
      puesto: admin.PUESTO,
      favoritos: admin.FAVORITOS,
      Role: authorities[0],
      accessToken: token,
      refreshToken: refreshToken,
      message: '¡Inicio de sesión como administrador!',
    })
  } catch (error) {
    return res.status(500).send({ message: error.message })
  }
}

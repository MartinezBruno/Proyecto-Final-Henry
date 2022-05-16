const Op = require('sequelize').Op
const config = require('../config/auth.config')
const { Proveedor, Proveedor_Servicio, Precio, Descripcion, Servicio, Ciudad, Provincia, Pais, Role, RefreshToken } = require('../db')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')
const { sendMail } = require('../mail')
const { v4: uuidv4 } = require('uuid')
const { getToken, getTokenData } = require('../config/tokenMail')
const { getTemplate } = require('./email')

exports.signup = async (req, res) => {
  // Guardar usuario en la base de datos
  let { nombre, apellido, password, email, imagen, fecha_nacimiento, pais, provincia, servicios, ciudad, celular } = req.body

  try {
    servicios?.length === 0 || servicios == null
      ? (servicios = [
          {
            NOMBRE_SERVICIO: 'Sin servicios disponibles',
            REMOTE: true,
            PRECIO: NaN,
            DESCRIPCION: '',
          },
        ])
      : servicios

    let arrayServicios = servicios.map((servicio) => {
      return {
        NOMBRE_SERVICIO: servicio.NOMBRE_SERVICIO,
        REMOTE: servicio.REMOTE ? servicio.REMOTE : false,
      }
    })

    let arrayPrecios = servicios.map((servicio) => servicio.PRECIO)
    let arrayDescripcion = servicios.map((servicio) => servicio.DESCRIPCION)

    let serviciosDisp = await Servicio.findAll({
      where: {
        [Op.or]: arrayServicios,
      },
    })

    let paisDisp = await Pais.findOne({
      where: { NOMBRE_PAIS: pais },
    })

    let provinciasDisp = await Provincia.findOne({
      where: { NOMBRE_PROVINCIA: provincia },
    })

    let ciudadesDisp = await Ciudad.findOne({
      where: { NOMBRE_CIUDAD: ciudad },
    })

    // Generar el código
    const code = uuidv4()

    let newProveedor = await Proveedor.create({
      NOMBRE_APELLIDO_PROVEEDOR: `${nombre} ${apellido}`,
      PASSWORD: bcrypt.hashSync(password, 8),
      EMAIL: email,
      IMAGEN: imagen,
      FECHA_NACIMIENTO: fecha_nacimiento,
      CALIFICACION: [],
      CELULAR: celular,
      CODE: code,
    })
    let role = await Role.findOne({
      where: { id: 2 },
    })

    await newProveedor.addServicios(serviciosDisp)
    await newProveedor.setPai(paisDisp)
    await newProveedor.setProvincium(provinciasDisp)
    await newProveedor.setCiudad(ciudadesDisp)
    await newProveedor.setRole(role)

    for (let i = 0; i < arrayPrecios.length; i++) {
      let p = await Precio.create({
        PRECIO: arrayPrecios[i],
      })
      let proveedor = await Proveedor.findOne({ where: { EMAIL: email } })
      let servicio = await Servicio.findOne({
        where: {
          NOMBRE_SERVICIO: arrayServicios[i].NOMBRE_SERVICIO,
          REMOTE: arrayServicios[i].REMOTE,
        },
      })
      let proveedor_servicio = await Proveedor_Servicio.findOne({
        where: {
          ProveedorId: proveedor.id,
          ServicioId: servicio.id,
        },
      })
      await proveedor_servicio.setPrecio(p)
    }

    for (let i = 0; i < arrayDescripcion.length; i++) {
      let d = await Descripcion.create({
        DESCRIPCION: arrayDescripcion[i],
      })
      let proovedor = await Proveedor.findOne({ where: { EMAIL: email } })
      let servicio = await Servicio.findOne({
        where: {
          NOMBRE_SERVICIO: arrayServicios[i].NOMBRE_SERVICIO,
          REMOTE: arrayServicios[i].REMOTE,
        },
      })
      let proveedor_servicio = await Proveedor_Servicio.findOne({
        where: {
          ProveedorId: proovedor.id,
          ServicioId: servicio.id,
        },
      })
      await proveedor_servicio.setDescripcion(d)
    }

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
    // sendMail(options) descomentar esto para poder enviar correos

    return res.send({ message: '¡Proveedor registrado exitosamente!' })
  } catch (error) {
    res.status(500).send({ message: error.message })
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
    const user = await Proveedor.findOne({
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
    await Proveedor.update(
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
    let proveedor = await Proveedor.findOne({
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
    if (!proveedor) return res.status(404).send({ message: 'Proveedor no encontrado' })
    const passwordIsValid = bcrypt.compareSync(password, proveedor.PASSWORD)
    if (!passwordIsValid) return res.status(401).send({ accessToken: null, message: 'Usuario o contraseña incorrecta!' })
    const token = jwt.sign({ id: proveedor.id }, config.secret, { expiresIn: config.jwtExpiration })
    let refreshToken = await RefreshToken.createTokenProv(proveedor)
    let authorities = []
    let roles = await proveedor.getRole()
    authorities.push(roles.dataValues.name.toUpperCase())
    res.status(200).send({
      id: proveedor.id,
      nombreApellido: proveedor.NOMBRE_APELLIDO_PROVEEDOR,
      email: proveedor.EMAIL,
      celular: proveedor.CELULAR,
      imagen: proveedor.IMAGEN,
      fechaNacimiento: proveedor.FECHA_NACIMIENTO,
      calificacion: proveedor.CALIFICACION,
      ciudad: proveedor.Ciudad ? proveedor.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
      provincia: proveedor.Provincium ? proveedor.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
      pais: proveedor.Pai.NOMBRE_PAIS,
      Role: authorities[0],
      accessToken: token,
      refreshToken: refreshToken,
      message: '¡Bienvenido!',
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

const Op = require('sequelize').Op
const config = require('../config/auth.config')
const {
  Proveedor,
  Proveedor_Servicio,
  Precio,
  Descripcion,
  Servicio,
  Ciudad,
  Provincia,
  Pais,
  Role,
  RefreshToken,
} = require('../db')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {
  // Guardar usuario en la base de datos
  const {
    nombre,
    apellido,
    password,
    email,
    imagen,
    fecha_nacimiento,
    pais,
    provincia,
    servicios,
    ciudad,
    role,
  } = req.body

  let services = servicios

  services?.length === 0 || services == null
    ? (services = [
        {
          NOMBRE_SERVICIO: 'Sin servicios disponibles',
          REMOTE: true,
          PRECIO: NaN,
          DESCRIPCION: '',
        },
      ])
    : services

  let arrayServicios = services.map((servicio) => {
    return {
      NOMBRE_SERVICIO: servicio.NOMBRE_SERVICIO,
      REMOTE: servicio.REMOTE ? servicio.REMOTE : false,
    }
  })

  let arrayPrecios = services.map((servicio) => servicio.PRECIO)
  let arrayDescripcion = services.map((servicio) => servicio.DESCRIPCION)

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

  let newProveedor = await Proveedor.create({
    NOMBRE_APELLIDO_PROVEEDOR: `${nombre} ${apellido}`,
    PASSWORD: bcrypt.hashSync(password, 8),
    EMAIL: email,
    IMAGEN: imagen,
    FECHA_NACIMIENTO: fecha_nacimiento,
    CALIFICACION: [],
  })

  await newProveedor.addServicios(serviciosDisp)
  await newProveedor.setPai(paisDisp)
  await newProveedor.setProvincium(provinciasDisp)
  await newProveedor.setCiudad(ciudadesDisp)

  for (let i = 0; i < arrayPrecios.length; i++) {
    let [p, _created] = await Precio.findOrCreate({
      where: {
        PRECIO: arrayPrecios[i],
      },
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
  if (role) {
    let role = await Role.findAll({
      where: {
        name: {
          [Op.or]: role,
        },
      },
    })
    await newProveedor.addRole(role)
    res.send({ message: '¡Proveedor registrado exitosamente!' })
  } else {
    // rol de usuario común = 1
    await newProveedor.addRole([2])
    res.send({ message: '¡Proveedor registrado exitosamente!' })
  }
}

exports.signin = (req, res) => {
  Usuario.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: 'Usuario no encontrado.' })
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      )
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
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('STATUS_' + roles[i].name.toUpperCase())
        }
        res.status(200).send({
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          fechaDeNacimiento: user.fechaDeNacimiento,
          servicios: user.servicios,
          pais: user.pais,
          provincia: user.provincia,
          ciudad: user.ciudad,
          Role: authorities,
          accessToken: token,
          refreshToken: refreshToken,
        })
      })
    })
    .catch((err) => {
      res.status(500).send({ message: err.message })
    })
}

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body
  if (requestToken == null) {
    return res.status(403).json({ message: '¡Se requiere Refresh Token!' })
  }
  try {
    let refreshToken = await RefreshToken.findOne({
      where: { token: requestToken },
    })
    console.log(refreshToken)
    if (!refreshToken) {
      res.status(403).json({
        message: '¡El Refresh Token no se encuentra en la base de datos!',
      })
      return
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } })

      res.status(403).json({
        message:
          'El Refresh token expiró. Realice una nueva solicitud de inicio de sesión',
      })
      return
    }
    const user = await refreshToken.getUser()
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    })
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    })
  } catch (err) {
    return res.status(500).send({ message: err })
  }
}

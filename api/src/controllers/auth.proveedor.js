const Op = require('sequelize').Op
const config = require('../config/auth.config')
const { Proveedor, Proveedor_Servicio, Precio, Descripcion, Servicio, Ciudad, Provincia, Pais, Role, RefreshToken } = require('../db')
var jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs')

exports.signup = async (req, res) => {
  // Guardar usuario en la base de datos
  const { nombre, apellido, password, email, imagen, fecha_nacimiento, pais, provincia, servicios, ciudad, role } = req.body

  try {
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
  } catch (error) {
    res.status(500).send({ message: error.message })
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
    let refreshToken = await RefreshToken.createToken(proveedor)
    let authorities = []
    let roles = await proveedor.getRoles()
    for (let i = 0; i < roles.length; i++) {
      authorities.push('STATUS_' + roles[i].name.toUpperCase())
    }
    res.status(200).send({
      id: proveedor.id,
      nombreApellido: proveedor.NOMBRE_APELLIDO_PROVEEDOR,
      email: proveedor.EMAIL,
      imagen: proveedor.IMAGEN,
      fechaNacimiento: proveedor.FECHA_NACIMIENTO,
      calificacion: proveedor.CALIFICACION,
      ciudad: proveedor.Ciudad ? proveedor.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
      provincia: proveedor.Provincium ? proveedor.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
      pais: proveedor.Pai.NOMBRE_PAIS,
      Role: authorities,
      accessToken: token,
      refreshToken: refreshToken,
    })
  } catch (error) {
    res.status(500).send({ message: error.message })
  }
}

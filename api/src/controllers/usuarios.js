const { Usuario, Ciudad, Provincia, Pais } = require('../db')
const Sequelize = require('sequelize')

const createUsuario = async (req, res) => {
  let {
    nombre,
    apellido,
    password,
    email,
    imagen,
    fecha_nacimiento,
    pais,
    provincia,
    ciudad,
  } = req.body

  let newUsuario = await Usuario.create({
    NOMBRE_APELLIDO_USUARIO: `${nombre} ${apellido}`,
    PASSWORD: password,
    EMAIL: email,
    IMAGEN: imagen,
    FECHA_NACIMIENTO: fecha_nacimiento,
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

  newUsuario.setPai(paisDisp)
  newUsuario.setProvincium(provinciasDisp)
  newUsuario.setCiudad(ciudadesDisp)

  res.status(201).send('Usuario creado')
}

const getUserById = async (req, res) => {
  const { id } = req.params

  let user = await Usuario.findOne({
    where: { id: id },
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

  let usuarioAMostrar = {
    id: user.id,
    nombre_apellido_usuario: user.NOMBRE_APELLIDO_USUARIO,
    email: user.EMAIL,
    imagen: user.IMAGEN,
    fecha_nacimiento: user.FECHA_NACIMIENTO,
    calificacion: user.CALIFICACION,
    status: user.status,
    creation_date: user.createdAt,
    pais: user.Pai.NOMBRE_PAIS,
    provincia: user.Provincium.NOMBRE_PROVINCIA,
    ciudad: user.Ciudad.NOMBRE_CIUDAD,
  }

  res.status(200).send(usuarioAMostrar)
}

module.exports = {
  createUsuario,
  getUserById,
}

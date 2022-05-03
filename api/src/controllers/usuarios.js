const { Usuario, Ciudad, Provincia, Pais } = require('../db')

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
     celular,
   } = req.body
   let newUsuario = await Usuario.create({
     NOMBRE_APELLIDO_USUARIO: `${nombre} ${apellido}`,
     PASSWORD: password,
     EMAIL: email,
     IMAGEN: imagen,
     FECHA_NACIMIENTO: fecha_nacimiento,
     CELULAR: celular
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

  //   let usuarioAMostrar = {
  //     id: user.id,
  //     nombre_apellido_usuario: user.NOMBRE_APELLIDO_USUARIO,
  //     email: user.EMAIL,
  //     celular: user.CELULAR,
  //     imagen: user.IMAGEN,
  //     fecha_nacimiento: user.FECHA_NACIMIENTO,
  //     calificacion: user.CALIFICACION,
  //     status: user.status,
  //     creation_date: user.createdAt,
  //     pais: user.Pai.NOMBRE_PAIS,
  //     provincia: user.Provincium.NOMBRE_PROVINCIA,
  //     ciudad: user.Ciudad.NOMBRE_CIUDAD,
  //   }

  //   res.status(200).send(usuarioAMostrar)
}

const allAccess = (req, res) => {
  res.status(200).send('Public Content.')
}

const userBoard = (req, res) => {
  res.status(200).send('User Content.')
}

const putUser = async (req, res, next) => {
  try {
    const { id } = req.params
    const {
      Proveedor,
      Servicio,
      Ciudad,
      Provincia,
      Pais,
      Precio,
      Proveedor_Servicio,
      Descripcion,
    } = req.body

    const usuarioEncontrado = await Usuario.findOne({
      where: { id: id },
    })

    usuarioEncontrado === null
      ? res.status(404).send('No se encontró un usuario con ese id')
      : await User.update(
          {
            Proveedor,
            Servicio,
            Ciudad,
            Provincia,
            Pais,
            Precio,
            Proveedor_Servicio,
            Descripcion,
          },
          { where: { id: id } }
        )
    res.send('Usuario actualizado correctamente')
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const adminBoard = (req, res) => {
  res.status(200).send('Admin Content.')
}

const moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.')
}

module.exports = {
  createUsuario,
  getUserById,
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  putUser,
}

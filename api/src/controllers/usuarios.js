const { Usuario, Ciudad, Provincia, Pais, Proveedor ,Comentario, Proveedor_Servicio} = require('../db')

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
    celular: user.CELULAR,
    imagen: user.IMAGEN,
    fecha_nacimiento: user.FECHA_NACIMIENTO,
    calificacion: user.CALIFICACION,
    creation_date: user.createdAt,
    pais: user.Pai ? user.Pai.NOMBRE_PAIS : 'Sin definir',
    provincia: user.Provincium ? user.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
    ciudad: user.Ciudad ? user.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
  }

  res.status(200).send(usuarioAMostrar)
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
    const { nombre, apellido, email, celular, imagen, fecha_nacimiento, pais, provincia, ciudad } = req.body

    const usuarioEncontrado = await Usuario.findOne({
      where: { id: id },
    })
    const paisUser = await Pais.findOne({
      where: { NOMBRE_PAIS: pais },
    })
    const provinciaUser = await Provincia.findOne({
      where: { NOMBRE_PROVINCIA: provincia, PaiId: paisUser.id },
    })
    const ciudadUser = await Ciudad.findOne({
      where: { NOMBRE_CIUDAD: ciudad, ProvinciumId: provinciaUser.id },
    })

    let parseName = `${nombre} ${apellido}`

    usuarioEncontrado === null
      ? res.status(404).send({ message: 'No se encontró un usuario con ese id' })
      : await Usuario.update(
          {
            NOMBRE_APELLIDO_USUARIO: parseName,
            EMAIL: email,
            CELULAR: celular,
            IMAGEN: imagen,
            FECHA_NACIMIENTO: fecha_nacimiento,
          },
          { where: { id: id } }
        )
    await usuarioEncontrado.setPai(paisUser)
    await usuarioEncontrado.setProvincium(provinciaUser)
    await usuarioEncontrado.setCiudad(ciudadUser)
    res.send({ message: 'Usuario actualizado correctamente' })
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

const buyReview = async (req, res) => {
  let { provId } = req.params
  let { calificacion, comentario,ServicioId,UsuarioId} = req.body

  let proveedor = await Proveedor.findOne({
    where: { id: provId },
  })
  let calificaciones = proveedor.CALIFICACION

  proveedor === null
    ? { message: 'Proveedor no encontrado' }
    : await Proveedor.update(
        {
          CALIFICACION: [calificaciones, calificacion].flat(),
        },
        { where: { id: provId } }
      )

//---------------------------COMENTARIO-------------------------------------- 
  let comentarios = await Comentario.create({
    COMENTARIO: comentario
  })
  
   let provServ = await Proveedor_Servicio.findOne({
     where: {ProveedorId: provId, ServicioId: ServicioId}
   })
  
   let usuario = await Usuario.findOne({
     where: {id: UsuarioId}
   })
   
   comentarios.setProveedor_Servicio(provServ)
   comentarios.setUsuario(usuario)

   return res.status(200).send({message:'Reseña agregada con exito'})
}
 
module.exports = {
  getUserById,
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  putUser,
  buyReview,
}

const { Usuario, Ciudad, Provincia, Pais, Proveedor, Comentario, Proveedor_Servicio, Compra, Servicio, Precio, Descripcion } = require('../db')

const getUsers = async (req, res) => {
  try {
    let users = await Usuario.findAll({
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
    let usersToSend = users.map((user) => {
      return {
        id: user.id,
        nombre_apellido_usuario: user.NOMBRE_APELLIDO_USUARIO,
        email: user.EMAIL,
        celular: user.CELULAR,
        imagen: user.IMAGEN,
        fecha_nacimiento: user.FECHA_NACIMIENTO,
        calificacion: user.CALIFICACION,
        compras: user.COMPRAS,
        favoritos: user.FAVORITOS,
        creation_date: user.createdAt,
        pais: user.Pai ? user.Pai.NOMBRE_PAIS : 'Sin definir',
        provincia: user.Provincium ? user.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
        ciudad: user.Ciudad ? user.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
      }
    })

    return res.status(200).send(usersToSend)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error al obtener los usuarios' })
  }
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
    celular: user.CELULAR,
    imagen: user.IMAGEN,
    fecha_nacimiento: user.FECHA_NACIMIENTO,
    calificacion: user.CALIFICACION,
    compras: user.COMPRAS,
    favoritos: user.FAVORITOS,
    creation_date: user.createdAt,
    pais: user.Pai ? user.Pai.NOMBRE_PAIS : 'Sin definir',
    provincia: user.Provincium ? user.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
    ciudad: user.Ciudad ? user.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
  }

  return res.status(200).send(usuarioAMostrar)
}

const addFavorito = async (req, res, next) => {
  const { userId, provId } = req.params
  try {
    let user = await Usuario.findOne({
      where: { id: userId },
    })
    if (user === null) return res.status(404).send({ message: 'Usuario no encontrado' })

    let favorites = user.FAVORITOS
    if (favorites.includes(provId)) {
      return res.status(200).send({ message: 'El usuario ya tiene a ese proveedor en sus favoritos' })
    }
    favorites.push(provId)
    // console.log(favorites)

    await Usuario.update(
      {
        FAVORITOS: favorites,
      },
      { where: { id: userId } }
    )
    return res.status(204).send({ message: 'Favorito agregado' })
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const deleteFavorito = async (req, res, next) => {
  const { userId, provId } = req.params
  try {
    let user = await Usuario.findOne({
      where: {
        id: userId,
      },
    })
    if (user === null) return res.status(404).send({ message: 'Usuario no encontrado' })
    let favs = user.FAVORITOS.filter((fav) => fav !== provId)
    await Usuario.update(
      {
        FAVORITOS: favs,
      },
      { where: { id: userId } }
    )
    return res.status(204).send({ message: 'Favorito eliminado' })
  } catch (error) {
    console.error(error)
    next(error)
    return res.status(500).send({ message: 'Error al eliminar favorito' })
  }
}

const allAccess = (req, res) => {
  res.status(200).send('Public Content.')
}

const userBoard = (req, res) => {
  res.status(200).send('User Content.')
}

const putUser = async (req, res, next) => {
  const { id } = req.params
  const { nombre_apellido_usuario, email, celular, imagen, fecha_nacimiento } = req.body
  try {
    const usuarioEncontrado = await Usuario.findOne({
      where: { id: id },
    })

    usuarioEncontrado === null
      ? res.status(404).send({ message: 'No se encontró un usuario con ese id' })
      : await Usuario.update(
          {
            NOMBRE_APELLIDO_USUARIO: nombre_apellido_usuario,
            EMAIL: email,
            CELULAR: celular,
            IMAGEN: imagen,
            FECHA_NACIMIENTO: fecha_nacimiento,
          },
          { where: { id: id } }
        )
    return res.send({ message: 'Usuario actualizado correctamente' })
  } catch (error) {
    next(error)
    return res.status(500).send({ message: 'Error al actualizar usuario' })
  }
}

const adminBoard = (req, res) => {
  res.status(200).send('Admin Content.')
}

const moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.')
}

const buyReview = async (req, res) => {
  let { calificacion, comentario, ServicioId, UsuarioId, idProveedor } = req.body

  let provServ = await Proveedor_Servicio.findOne({
    where: { ProveedorId: idProveedor, ServicioId: ServicioId },
  })
  // console.log(provServ.id)

  let proveedor = await Proveedor.findOne({
    where: { id: idProveedor },
  })
  let calificaciones = proveedor.CALIFICACION

  let verificacionCompra = await Compra.findAll({
    where: { UsuarioId: UsuarioId, ProveedorServicioId: provServ.id },
  })

  let verifacionComent = await Comentario.findAll({
    where: { UsuarioId: UsuarioId, ProveedorServicioId: provServ.id },
  })
  // console.log(verifacionComent.length)
  // console.log(verificacionCompra.length)
  if (verificacionCompra.length > 0) {
    if (verifacionComent.length === 0 || verifacionComent.length < verificacionCompra.length) {
      // console.log('hola')
      proveedor === null
        ? { message: 'Proveedor no encontrado' }
        : await Proveedor.update(
            {
              CALIFICACION: [calificaciones, calificacion].flat(),
            },
            { where: { id: idProveedor } }
          )
      //---------------------------COMENTARIO--------------------------------------
      let comentarios = await Comentario.create({
        COMENTARIO: comentario,
      })
      let usuario = await Usuario.findOne({
        where: { id: UsuarioId },
      })

      comentarios.setProveedor_Servicio(provServ)
      comentarios.setUsuario(usuario)
      return res.status(200).send({ message: 'Reseña agregada con exito' })
    } else {
      return res.status(400).send({ message: 'Ya calificaste esta compra' })
    }
  } else {
    return res.status(400).send({ message: 'No puedes calificar este servicio ' })
  }
}

const compraSuccess = async (req, res) => {
  let { cart, id } = req.body
  try {
    let idProveedor = cart?.map((compra) => compra.provID)
    let idUsuario = id
    let idServicio = cart?.map((compra) => compra.id)

    for (let i = 0; i < idProveedor.length; i++) {
      let provServ = await Proveedor_Servicio.findOne({
        where: { ProveedorId: idProveedor[i], ServicioId: idServicio[i] },
      })

      let usuario = await Usuario.findOne({ where: { id: idUsuario } })

      let compra = await Compra.create()

      compra.setUsuario(usuario)
      compra.setProveedor_Servicio(provServ)
    }
    return res.status(200).send({ message: 'Compra guardada en la DB' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error al guardar compra' })
  }
}

const misCompras = async (req, res) => {
  const { idUsuario } = req.query
  try {
    let arrayCompras = []
    let misCompras = await Compra.findAll({
      where: { UsuarioId: idUsuario },
    })
    for (let i = 0; i < misCompras.length; i++) {
      let ProvServ = await Proveedor_Servicio.findOne({ where: { id: misCompras[i].ProveedorServicioId } })
      console.log(ProvServ.ServicioId, ProvServ.PrecioId, ProvServ.ProveedorId)
      let proveedor = await Proveedor.findOne({ where: { id: ProvServ.ProveedorId } })
      let servicio = await Servicio.findOne({ where: { id: ProvServ.ServicioId } })
      let precio = await Precio.findOne({ where: { id: ProvServ.PrecioId } })
      let descripcion = await Descripcion.findOne({ where: { id: ProvServ.DescripcionId } })
      arrayCompras.unshift({
        proveedor: proveedor.NOMBRE_APELLIDO_PROVEEDOR,
        idProveedor: proveedor.id,
        idServicio: servicio.id,
        servicio: servicio.NOMBRE_SERVICIO,
        precio: precio.PRECIO,
        descripcion: descripcion.DESCRIPCION,
        fecha: misCompras[i].createdAt,
      })
    }
    return res.status(200).send(arrayCompras)
  } catch (error) {
    return res.status(404).send({ message: 'Error a mostar en compras' })
  }
}

module.exports = {
  getUsers,
  getUserById,
  addFavorito,
  deleteFavorito,
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  putUser,
  buyReview,
  compraSuccess,
  misCompras,
}

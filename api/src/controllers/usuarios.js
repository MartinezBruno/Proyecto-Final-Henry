const {
  Usuario,
  Ciudad,
  Provincia,
  Pais,
  Proveedor,
  Comentario,
  Proveedor_Servicio,
  Compra,
  Servicio,
  Precio,
  Descripcion,
  Favorito,
  Usuario_Favorito,
  Emergencia,
  Ayuda,
} = require('../db')
var bcrypt = require('bcryptjs')

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
        {
          model: Favorito,
          attributes: ['id', 'NOMBRE_APELLIDO_PROVEEDOR', 'IMAGEN', 'EMAIL', 'CELULAR', 'PAIS', 'PROVINCIA', 'CIUDAD'],
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
        favoritos: user.Favorito,
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
      {
        model: Favorito,
        attributes: ['id', 'NOMBRE_APELLIDO_PROVEEDOR', 'IMAGEN', 'EMAIL', 'CELULAR', 'PAIS', 'PROVINCIA', 'CIUDAD'],
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
    favoritos: user.Favorito,
    creation_date: user.createdAt,
    pais: user.Pai ? user.Pai.NOMBRE_PAIS : 'Sin definir',
    provincia: user.Provincium ? user.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
    ciudad: user.Ciudad ? user.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
  }

  return res.status(200).send(usuarioAMostrar)
}

const getFavorites = async (req, res) => {
  const { userId } = req.params
  try {
    let favoritos = await Usuario_Favorito.findAll({
      where: {
        UsuarioId: userId,
      },
    })
    let favs = []
    for (let fav of favoritos) {
      let favorito = await Favorito.findOne({
        where: {
          id: fav.FavoritoId,
        },
      })
      favs.push({
        id: favorito.id,
        idProveedor: favorito.PROVEEDOR_ID,
        nombre_apellido_proveedor: favorito.NOMBRE_APELLIDO_PROVEEDOR,
        imagen: favorito.IMAGEN,
        email: favorito.EMAIL,
        celular: favorito.CELULAR,
        pais: favorito.PAIS,
        provincia: favorito.PROVINCIA,
        ciudad: favorito.CIUDAD,
      })
    }
    return res.status(200).send(favs)
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error al obtener los favoritos' })
  }
}

const addFavorito = async (req, res) => {
  const { userId, provId } = req.params
  try {
    let favorito = await Favorito.findOne({
      where: {
        PROVEEDOR_ID: provId,
      },
    })
    if (favorito !== null) {
      let favoritoUser = await Usuario_Favorito.findOne({
        where: {
          UsuarioId: userId,
          FavoritoId: favorito.id,
        },
      })
      if (favoritoUser !== null) return res.status(302).send({ message: 'Ya esta en favoritos' })
    }
    let user = await Usuario.findByPk(userId)
    if (user === null) return res.status(404).send({ message: 'Usuario no encontrado' })

    let provider = await Proveedor.findByPk(provId, {
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
    if (provider === null) return res.status(404).send({ message: 'Proveedor no encontrado' })
    provider = {
      id: provider.id,
      nombre_apellido_proveedor: provider.NOMBRE_APELLIDO_PROVEEDOR,
      email: provider.EMAIL,
      celular: provider.CELULAR ? provider.CELULAR : 123456789,
      imagen: provider.IMAGEN,
      pais: provider.Pai ? provider.Pai.NOMBRE_PAIS : 'Sin definir',
      provincia: provider.Provincium ? provider.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
      ciudad: provider.Ciudad ? provider.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
    }
    let [fav, _created] = await Favorito.findOrCreate({
      where: {
        PROVEEDOR_ID: provider.id,
        NOMBRE_APELLIDO_PROVEEDOR: provider.nombre_apellido_proveedor,
        IMAGEN: provider.imagen,
        EMAIL: provider.email,
        CELULAR: provider.celular,
        PAIS: provider.pais,
        CIUDAD: provider.ciudad,
        PROVINCIA: provider.provincia,
      },
    })
    await user.addFavorito(fav)
    return res.status(200).send({ message: 'Favorito agregado' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error al agregar el favorito' })
  }
}

const deleteFavorito = async (req, res) => {
  const { userId, provId } = req.params
  try {
    let favorito = await Favorito.findOne({
      where: {
        PROVEEDOR_ID: provId,
      },
    })
    if (favorito !== null) {
      let favoritoUser = await Usuario_Favorito.findOne({
        where: {
          UsuarioId: userId,
          FavoritoId: favorito.id,
        },
      })
      if (favoritoUser !== null) {
        await favoritoUser.destroy({
          where: {
            UsuarioId: userId,
            FavoritoId: favorito.id,
          },
        })
        return res.status(200).send({ message: 'Favorito eliminado' })
      }
    }
    return res.status(404).send({ message: 'Favorito no encontrado' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error al eliminar el favorito' })
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
    return res.status(204).send({ message: 'Usuario actualizado correctamente' })
  } catch (error) {
    next(error)
    return res.status(500).send({ message: 'Error al actualizar usuario' })
  }
}

const changePassword = async (req, res) => {
  const { id } = req.params
  const { newPassword, oldPassword } = req.body
  try {
    const usuarioEncontrado = await Usuario.findOne({
      where: { id: id },
    })

    if (usuarioEncontrado === null) return res.status(404).send({ message: 'No se encontró un usuario con ese id' })

    const passwordIsValid = bcrypt.compareSync(oldPassword, usuarioEncontrado.PASSWORD)
    if (!passwordIsValid) {
      return res.status(401).send({
        message: '¡Contraseña incorrecta!',
      })
    }

    await Usuario.update(
      {
        PASSWORD: bcrypt.hashSync(newPassword, 8),
      },
      { where: { id: id } }
    )
    return res.status(204).send({ message: 'Contraseña actualizada correctamente' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error al actualizar contraseña' })
  }
}

const adminBoard = (req, res) => {
  res.status(200).send('Admin Content.')
}

const moderatorBoard = (req, res) => {
  res.status(200).send('Moderator Content.')
}

const buyReview = async (req, res) => {
  let { calificacion, comentario, idServicio, idUsuario, idProveedor } = req.body

  let provServ = await Proveedor_Servicio.findOne({
    where: { ProveedorId: idProveedor, ServicioId: idServicio },
  })
  // console.log(provServ.id)

  let proveedor = await Proveedor.findOne({
    where: { id: idProveedor },
  })
  // console.log(proveedor)
  let calificaciones = proveedor.CALIFICACION

  let verificacionCompra = await Compra.findAll({
    where: { UsuarioId: idUsuario, ProveedorServicioId: provServ.id },
  })

  let verifacionComent = await Comentario.findAll({
    where: { UsuarioId: idUsuario, ProveedorServicioId: provServ.id },
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
        where: { id: idUsuario },
      })

      comentarios.setProveedor_Servicio(provServ)
      comentarios.setUsuario(usuario)
      return res.status(200).send({ message: 'Reseña agregada con exito' })
    } else {
      return res.status(402).send({ message: 'Ya calificaste esta compra' })
    }
  } else {
    return res.status(400).send({ message: 'No puedes calificar este servicio ' })
  }
}

const compraSuccess = async (req, res) => {
  let { cart, id } = req.body
  console.log('this is cart', cart)
  try {
    let idProveedor = cart?.map((compra) => compra.provID)
    let idUsuario = id
    let idServicio = cart?.map((compra) => compra.id)

    for (let i = 0; i < idProveedor.length; i++) {
      console.log(idProveedor[i])
      console.log(idServicio[i])
      let provServ = await Proveedor_Servicio.findOne({
        where: { ProveedorId: idProveedor[i], ServicioId: idServicio[i] },
      })
      // console.log(provServ)

      let usuario = await Usuario.findOne({ where: { id: idUsuario } })
      // console.log('this is the user', usuario)

      let compra = await Compra.create()

      compra.setUsuario(usuario)
      compra.setProveedor_Servicio(provServ)
    }

    let emergencia = await Emergencia.findAll({
      where: { UsuarioId: idUsuario },
    })
    if (emergencia.length > 0) {
      await Emergencia.update({ COMPRA_SUCCES: 'Si' }, { where: { UsuarioId: idUsuario } })
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
    console.log('hola')
    let arrayCompras = []
    let misCompras = await Compra.findAll({
      where: { UsuarioId: idUsuario },
    })
    for (let i = 0; i < misCompras.length; i++) {
      let ProvServ = await Proveedor_Servicio.findOne({ where: { id: misCompras[i].ProveedorServicioId } })
      if (ProvServ) {
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
      } else if (ProvServ === null) {
        arrayCompras.unshift({ message: 'El proveedor de esta compra ahora es un admin, comuniquese con el soporte si necesita ayuda' })
      }
    }
    return res.status(200).send(arrayCompras)
  } catch (error) {
    return res.status(404).send({ message: 'Error a mostar en compras' })
  }
}

const createAyuda = async (req, res) => {
  let { usuarioId, asunto } = req.body

  let user = await Usuario.findByPk(usuarioId)
  // console.log(user)

  let ayudaCreate = await Ayuda.create({
    ASUNTO: asunto,
  })

  ayudaCreate.setUsuario(user.id)
}

module.exports = {
  getUsers,
  getUserById,
  addFavorito,
  deleteFavorito,
  getFavorites,
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  putUser,
  changePassword,
  buyReview,
  compraSuccess,
  misCompras,
  createAyuda,
}

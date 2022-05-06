const { Usuario, Ciudad, Provincia, Pais } = require('../db')

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
    console.log(favorites)

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
  const { nombre_apellido_usuario, email, celular, imagen, fecha_nacimiento,} = req.body
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

module.exports = {
  getUserById,
  addFavorito,
  deleteFavorito,
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  putUser,
}

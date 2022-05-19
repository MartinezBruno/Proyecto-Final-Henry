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
  Admin,
  Role,
  Pregunta,
  Ayuda,
} = require('../db')
const { v4: uuidv4 } = require('uuid')

const getUsers = async (req, res) => {
  try {
    let users = await Usuario.findAll()
    return res.status(200).send(users)
  } catch (e) {
    return res.status(400).send({ message: 'Error en get users' })
  }
}

const getProviders = async (req, res) => {
  try {
    let provs = await Proveedor.findAll()
    return res.status(200).send(provs)
  } catch (e) {
    return res.status(400).send({ message: 'Error en getproviders' })
  }
}

const ban = async (req, res) => {
  try {
    let { ProveedorId, UsuarioId } = req.body
    if (UsuarioId) {
      await Usuario.update({ BANNED: 'Si' }, { where: { id: UsuarioId } })
      return res.status(200).send('Usuario banneado')
    }

    if (ProveedorId) {
      await Proveedor.update({ BANNED: 'Si' }, { where: { id: ProveedorId } })
      return res.status(200).send('Proveedor banneado')
    }
  } catch (e) {
    return res.status(400).send({ message: 'Error en Ban' })
  }
}

const unBann = async (req, res) => {
  try {
    let { ProveedorId, UsuarioId } = req.body
    if (UsuarioId) {
      await Usuario.update({ BANNED: 'No' }, { where: { id: UsuarioId } })
      return res.status(200).send('Usuario Desbanneado')
    }

    if (ProveedorId) {
      await Proveedor.update({ BANNED: 'No' }, { where: { id: ProveedorId } })
      return res.status(200).send('Proveedor Desbanneado')
    }
  } catch (e) {
    return res.status(400).send({ message: 'Error en UnBan' })
  }
}

const hacerAdmin = async (req, res) => {
  try {
    let { ProveedorId, UsuarioId } = req.body

    if (ProveedorId) {
      let datosProv = await Proveedor.findOne({ where: { id: ProveedorId } })

      let datosProv2 = {
        id: datosProv.id,
        nombre: datosProv.NOMBRE_APELLIDO_PROVEEDOR,
        password: datosProv.PASSWORD,
        email: datosProv.EMAIL,
        imagen: datosProv.IMAGEN,
        fecha_nacimiento: datosProv.FECHA_NACIMIENTO,
        celular: datosProv.CELULAR,
        empresa: 'ATTEND',
        puesto: 'CEO',
      }
      const code = uuidv4()

      let admin = await Admin.create({
        NOMBRE_APELLIDO_USUARIO: datosProv2.nombre,
        PASSWORD: datosProv2.password,
        EMAIL: datosProv2.email,
        IMAGEN: datosProv2.imagen,
        FECHA_NACIMIENTO: datosProv2.fecha_nacimiento,
        CELULAR: datosProv2.celular,
        EMPRESA: datosProv2.empresa,
        PUESTO: datosProv2.puesto,
        CODE: code,
      })

      await admin.setPai(datosProv.PaiId)
      await admin.setProvincium(datosProv.ProvinciumId)
      await admin.setCiudad(datosProv.CiudadId)

      let role = await Role.findOne({
        where: { id: 4 },
      })
      await admin.setRole(role)

      await Proveedor.destroy({ where: { id: ProveedorId } })

      res.status(200).send('Proveedor Transferido a Admin')
    }

    if (UsuarioId) {
      let datosUser = await Usuario.findOne({ where: { id: UsuarioId } })

      let datosUser2 = {
        id: datosUser.id,
        nombre: datosUser.NOMBRE_APELLIDO_USUARIO,
        password: datosUser.PASSWORD,
        email: datosUser.EMAIL,
        imagen: datosUser.IMAGEN,
        fecha_nacimiento: datosUser.FECHA_NACIMIENTO,
        celular: datosUser.CELULAR,
        empresa: 'ATTEND',
        puesto: 'CEO',
      }
      const code = uuidv4()

      let admin = await Admin.create({
        NOMBRE_APELLIDO_USUARIO: datosUser2.nombre,
        PASSWORD: datosUser2.password,
        EMAIL: datosUser2.email,
        IMAGEN: datosUser2.imagen,
        FECHA_NACIMIENTO: datosUser2.fecha_nacimiento,
        CELULAR: datosUser2.celular,
        EMPRESA: datosUser2.empresa,
        PUESTO: datosUser2.puesto,
        CODE: code,
      })

      await admin.setPai(datosUser.PaiId)
      await admin.setProvincium(datosUser.ProvinciumId)
      await admin.setCiudad(datosUser.CiudadId)

      let role = await Role.findOne({
        where: { id: 4 },
      })
      await admin.setRole(role)

      await Usuario.destroy({ where: { id: UsuarioId } })
      res.status(200).send('Usuario Transferido a Admin')
    }
  } catch (e) {
    console.log(e)
    return res.status(400).send({ message: 'Error en hacerAdmin' })
  }
  return res.status(200).send(comprasSend)
}

const compraDetail = async (req, res) => {
  const { id } = req.params
  try {
    const compra = await Compra.findByPk(id)
    const provServ = await Proveedor_Servicio.findOne({ where: { id: compra.ProveedorServicioId } })
    if (!provServ) return res.status(404).send({ message: 'Proveedor de servicio no encontrado' })

    const usuario = await Usuario.findByPk(compra.UsuarioId)
    if (!usuario) return res.status(404).send({ message: 'Usuario no encontrado' })

    const prov = await Proveedor.findByPk(provServ.ProveedorId)
    if (!prov) return res.status(404).send({ message: 'Proveedor no encontrado' })

    const service = await Servicio.findByPk(provServ.ServicioId)
    const precio = await Precio.findByPk(provServ.PrecioId)
    const descripcion = await Descripcion.findByPk(provServ.DescripcionId)
    if (!service || !precio || !descripcion) return res.status(404).send({ message: 'Servicio no encontrado' })

    const detail = {
      id: compra.id,
      nombreUsuario: usuario.NOMBRE_APELLIDO_USUARIO,
      emailUsuario: usuario.EMAIL,
      imagenUsuario: usuario.IMAGEN,
      nombreProveedor: prov.NOMBRE_APELLIDO_PROVEEDOR,
      emailProveedor: prov.EMAIL,
      imagenProveedor: prov.IMAGEN,
      nombreServicio: service.NOMBRE_SERVICIO,
      descripcionServicio: descripcion.DESCRIPCION,
      precioServicio: precio.PRECIO,
      fechaCompra: compra.createdAt,
    }

    return res.status(200).send(detail)
  } catch (error) {
    console.error(error)
    return res.status(400).send({ message: 'Error en compraDetail' })
  }
}

const getCompras = async (req, res) => {
  let compras = await Compra.findAll()
  let proveedoresServicios = []
  let proveedores = []
  let servicios = []
  let comprasSend = []
  let compraUsuariosId = []
  let compraProveedoresId = []
  let dataUsuarios = []
  let compraNormalId = []
  let proveedoresServiciosNormal = []
  let proveedoresNormal = []
  let serviciosNormal = []

  for (let i = 0; i < compras.length; i++) {
    if (compras[i].UsuarioId && compras[i].ProveedorServicioId) {
      compraNormalId.push(compras[i].id)

      let DataUsuario = await Usuario.findOne({ where: { id: compras[i].UsuarioId } })
      DataUsuario = {
        nombre: DataUsuario.NOMBRE_APELLIDO_USUARIO,
        email: DataUsuario.EMAIL,
        imagen: DataUsuario.IMAGEN,
      }

      let ProveedorServicio = await Proveedor_Servicio.findOne({ where: { id: compras[i].ProveedorServicioId } })
      proveedoresServiciosNormal.push(ProveedorServicio)

      if (ProveedorServicio) {
        for (let j = 0; j < proveedoresServiciosNormal.length; j++) {
          let proveedor = await Proveedor.findOne({ where: { id: proveedoresServiciosNormal[j].ProveedorId } })
          let servicio = await Servicio.findOne({ where: { id: proveedoresServiciosNormal[j].ServicioId } })
          // console.log(proveedor)
          proveedoresNormal.push(proveedor)
          serviciosNormal.push(servicio)
        }
      }

      for (let y = 0; y < proveedoresServiciosNormal.length; y++) {
        let comprasDef = {
          id: compraNormalId[y],
          servicio: serviciosNormal[y].NOMBRE_SERVICIO,
          nombreUsuario: DataUsuario.nombre,
          emailUsuario: DataUsuario.email,
          imagenUsuario: DataUsuario.imagen,
          nombreProveedor: proveedoresNormal[y].NOMBRE_APELLIDO_PROVEEDOR,
          emailProveedor: proveedoresNormal[y].EMAIL,
          imagenProveedor: proveedoresNormal[y].IMAGEN,
        }
        comprasSend.push(comprasDef)
      }
    }

    if (compras[i].UsuarioId === null && compras[i].ProveedorServicioId !== null) {
      let ProveedorServicio = await Proveedor_Servicio.findOne({ where: { id: compras[i].ProveedorServicioId } })
      proveedoresServicios.push(ProveedorServicio)
      compraProveedoresId.push(compras[i].id)
    } else if (compras[i].ProveedorServicioId === null && compras[i].UsuarioId) {
      let DataUsuario = await Usuario.findOne({ where: { id: compras[i].UsuarioId } })
      DataUsuario = {
        nombre: DataUsuario.NOMBRE_APELLIDO_USUARIO,
        email: DataUsuario.EMAIL,
        imagen: DataUsuario.IMAGEN,
      }
      dataUsuarios.push(DataUsuario)
      compraUsuariosId.push(compras[i].id)
    }
  }
  if (proveedoresServicios.length) {
    for (let j = 0; j < proveedoresServicios.length; j++) {
      let proveedor = await Proveedor.findOne({ where: { id: proveedoresServicios[j].ProveedorId } })
      proveedores.push(proveedor)
      let servicio = await Servicio.findOne({ where: { id: proveedoresServicios[j].ServicioId } })
      //  console.log(servicio)
      servicios.push(servicio)
    }
  }
  //  console.log(proveedores)
  // console.log(servicios)
  if (proveedoresServicios.length) {
    for (let x = 0; x < proveedoresServicios.length; x++) {
      comprasSend.push({
        id: compraProveedoresId[x],
        servicio: servicios[x].NOMBRE_SERVICIO,
        remoto: servicios[x].REMOTE,
        usuario: 'Este usuario ya no existe',
        nombreProveedor: proveedores[x].NOMBRE_APELLIDO_PROVEEDOR,
        emailProveedor: proveedores[x].EMAIL,
        imagenProveedor: proveedores[x].IMAGEN,
      })
    }
  }

  if (dataUsuarios.length) {
    for (let k = 0; k < dataUsuarios.length; k++) {
      comprasSend.push({
        id: compraUsuariosId[k],
        nombreUsuario: dataUsuarios[k].nombre,
        emailUsuario: dataUsuarios[k].email,
        imagenUsuario: dataUsuarios[k].imagen,
        proveedor: 'Este proveedor ya no existe',
      })
    }
  }

  return res.status(200).send(comprasSend)
}

const deleteComent = async (req, res) => {
  let { idComentario } = req.params

  await Comentario.destroy({ where: { id: idComentario } })

  return res.status(200).send('comentario eliminado')
}

const deletePregunta = async (req, res) => {
  let { idPregunta } = req.params
  let pregunta = await Pregunta.findOne({ where: { id: idPregunta } })
  console.log(pregunta)
  await Pregunta.destroy({ where: { id: idPregunta } })
  return res.status(200).send('pregunta eliminada')
}

const getAyudas = async (req, res) => {
  let ayudas = await Ayuda.findAll()
  // console.log(ayudas)

  let ayudasDef = []
  for (let i = 0; i < ayudas.length; i++) {
    if (ayudas[i].UsuarioId) {
      let user = await Usuario.findOne({ where: { id: ayudas[i].UsuarioId } })
      let userPush = {
        idAyuda: ayudas[i].id,
        asunto: ayudas[i].ASUNTO,
        idUsuario: user.id,
        nombre: user.NOMBRE_APELLIDO_USUARIO,
        imagen: user.IMAGEN,
        email: user.EMAIL,
      }
      ayudasDef.push(userPush)
    }
    if (ayudas[i].ProveedorId) {
      let prov = await Proveedor.findOne({ where: { id: ayudas[i].ProveedorId } })
      let provPush = {
        idAyuda: ayudas[i].id,
        asunto: ayudas[i].ASUNTO,
        idProveedor: prov.id,
        nombre: prov.NOMBRE_APELLIDO_PROVEEDOR,
        imagen: prov.IMAGEN,
        email: prov.EMAIL,
      }
      ayudasDef.push(provPush)
    }
  }
  return res.status(200).send(ayudasDef)
}

const deleteUser = async (req, res) => {
  let { idUsuario } = req.params
  if (idUsuario) {
    await Usuario.destroy({ where: { id: idUsuario } })
    return res.status(200).send('Usuario eliminado')
  }
}

const deleteProvider = async (req, res) => {
  let { idProveedor } = req.params
  if (idProveedor) {
    await Proveedor.destroy({ where: { id: idProveedor } })
    return res.status(200).send('proveedor eliminado')
  }
}

const createService = async (req,res) =>{
  let {nombreServicio, remote} = req.body
   
  await Servicio.findOrCreate({
    where:{NOMBRE_SERVICIO: nombreServicio,
    REMOTE: remote}
  })
  return res.status(200).send('Servicio Creado')
  }

  const deleteAyuda = async (req,res) => {
    let {ayudaId} = req.params
    
    await Ayuda.destroy({where:{id: ayudaId}})
    return res.status(200).send('Ayuda finalizada')
  }

module.exports = {
  getUsers,
  getProviders,
  ban,
  unBann,
  hacerAdmin,
  getCompras,
  compraDetail,
  deleteComent,
  deletePregunta,
  getAyudas,
  deleteUser,
  deleteProvider,
  createService,
  deleteAyuda
}

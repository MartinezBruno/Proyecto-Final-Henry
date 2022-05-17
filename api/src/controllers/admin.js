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
        celular:datosUser.CELULAR,
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

     await Usuario.destroy({where:{id: UsuarioId}})
     res.status(200).send('Usuario Transferido a Admin')

    }




} catch (e) {
    console.log(e)
    return res.status(400).send({ message: 'Error en hacerAdmin' })
  }
}

const getCompras= async (req,res) => {

let compras = await Compra.findAll()
let proveedoresServicios = [] 
let proveedores = []
let comprasSend = []
for(let i=0 ; i<compras.length ; i++) {
  
  
  let DataUsuario = await Usuario.findOne({where:{id: compras[i].UsuarioId}})
  DataUsuario = {
    nombre: DataUsuario.NOMBRE_APELLIDO_USUARIO,
    email: DataUsuario.EMAIL,
    imagen: DataUsuario.IMAGEN
  }
  
  let ProveedorServicio = await Proveedor_Servicio.findOne({where: {id: compras[i].ProveedorServicioId}})
  proveedoresServicios.push(ProveedorServicio) 

  for(let j= 0 ; j<proveedoresServicios.length; j++){
        let proveedor = await Proveedor.findOne({where: {id: proveedoresServicios[i].ProveedorId} })
        // console.log(proveedor)
        proveedores.push(proveedor)
      }
      
      let comprasDef = {
        id: compras[i].id,
        nombreUsuario: DataUsuario.nombre,
        emailUsuario: DataUsuario.email,
        imagenUsuario: DataUsuario.imagen,
        nombreProveedor: proveedores[i].NOMBRE_APELLIDO_PROVEEDOR,
        emailProveedor: proveedores[i].EMAIL,
        imagenProveedor: proveedores[i].IMAGEN
      }
      comprasSend.push(comprasDef)
    }
   return res.status(200).send(comprasSend)
  }
  

// console.log(compras)

module.exports = {
  getUsers,
  getProviders,
  ban,
  unBann,
  hacerAdmin,
  getCompras
}

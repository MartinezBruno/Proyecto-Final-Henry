const {
  Proveedor,
  Servicio,
  Ciudad,
  Provincia,
  Pais,
  Precio,
} = require('../db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const createProv = async (req, res) => {
  const {
    nombre,
    apellido,
    password,
    email,
    imagen,
    fecha_nacimiento,
    servicios,
    pais,
    provincia,
    ciudad,
    precio,
  } = req.body

  let arrayServicios = servicios.map((servicio) => {
    return {
      NOMBRE_SERVICIO: servicio.NOMBRE_SERVICIO,
      REMOTE: servicio.REMOTE ? true : false,
    }
  })

  let newProveedor = await Proveedor.create({
    NOMBRE_APELLIDO_PROVEEDOR: `${nombre} ${apellido}`,
    PASSWORD: password,
    EMAIL: email,
    IMAGEN: imagen,
    FECHA_NACIMIENTO: fecha_nacimiento,
  })

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

  let precioDisp = await Precio.create({
    where: {
      PRECIO: precio,
    },
  })

  newProveedor.addServicios(serviciosDisp)
  newProveedor.setPai(paisDisp)
  newProveedor.setProvincium(provinciasDisp)
  newProveedor.setCiudad(ciudadesDisp)
  return res.status(201).send('Proveedor creado')
}

const getProv = async (req, res, next) => {
  try {
    let proveedores = await Proveedor.findAll({
      attributes: [
        'id',
        'NOMBRE_APELLIDO_PROVEEDOR',
        'EMAIL',
        'IMAGEN',
        'FECHA_NACIMIENTO',
        'CALIFICACION',
      ],
      include: [
        {
          model: Servicio,
          attributes: ['NOMBRE_SERVICIO', 'REMOTE'],
          through: {
            attributes: [],
          },
        },
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

    proveedores = proveedores.map((prov) => {
      return {
        id: prov.id,
        nombre_apellido: prov.NOMBRE_APELLIDO_PROVEEDOR,
        email: prov.EMAIL,
        imagen: prov.IMAGEN,
        fecha_nacimiento: prov.FECHA_NACIMIENTO,
        calificacion: prov.CALIFICACION,
        pais: prov.Pai.NOMBRE_PAIS,
        provincia: prov.Provincium.NOMBRE_PROVINCIA,
        ciudad: prov.Ciudad.NOMBRE_CIUDAD,
        servicios: prov.Servicios,
      }
    })
    return res.status(200).send(proveedores)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = {
  createProv,
  getProv,
}

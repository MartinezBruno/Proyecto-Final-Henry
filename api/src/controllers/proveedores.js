const { Proveedor, Servicio, Ciudad, Provincia, Pais } = require('../db')

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
  } = req.body

  let newProveedor = await Proveedor.create({
    NOMBRE_APELLIDO_PROVEEDOR: `${nombre} ${apellido}`,
    PASSWORD: password,
    EMAIL: email,
    IMAGEN: imagen,
    FECHA_NACIMIENTO: fecha_nacimiento,
  })
  let arrayServicios = servicios.map((servicio) => {
    return {
      NOMBRE_SERVICIO: servicio.NOMBRE_SERVICIO,
      REMOTE: servicio.REMOTE ? true : false,
      PRICE: servicio.PRICE ? servicio.PRICE : 0,
    }
  })

  arrayServicios.forEach(async (servicio) => {
    console.log(servicio)
    let [newService, _created] = await Servicio.findOrCreate({
      where: {
        NOMBRE_SERVICIO: servicio.NOMBRE_SERVICIO,
        REMOTE: servicio.REMOTE,
        PRICE: servicio.PRICE,
      },
    })
    newProveedor.addServicios(newService)
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

  newProveedor.setPai(paisDisp)
  newProveedor.setProvincium(provinciasDisp)
  newProveedor.setCiudad(ciudadesDisp)

  return res.status(201).send(newProveedor)
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
          attributes: ['NOMBRE_SERVICIO', 'REMOTE', 'PRICE'],
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
      console.log(prov)
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

const getProvByID = async (req, res, next) => {
  const { id } = req.params
  try {
    const proveedor = await Proveedor.findByPk(id, {
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
          attributes: ['NOMBRE_SERVICIO', 'REMOTE', 'PRICE'],
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
    let proveedorDetail = {
      id: proveedor.id,
      nombreApellido: proveedor.NOMBRE_APELLIDO_PROVEEDOR,
      email: proveedor.EMAIL,
      imagen: proveedor.IMAGEN,
      fechaNacimiento: proveedor.FECHA_NACIMIENTO,
      calificacion: proveedor.CALIFICACION,
      pais: proveedor.Pai.NOMBRE_PAIS,
      region: proveedor.Provincium.NOMBRE_PROVINCIA,
      ciudad: proveedor.Ciudad.NOMBRE_CIUDAD,
      servicios: proveedor.Servicios,
    }
    return res.status(200).send(proveedorDetail)
  } catch (error) {
    console.error(error.message)
    next(error)
    return res.status(404).send({ msg: 'Proveedor no encontrado' })
  }
}

module.exports = {
  createProv,
  getProv,
  getProvByID,
}

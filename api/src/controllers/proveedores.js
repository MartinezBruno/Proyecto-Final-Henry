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
  let serviciosDisp = await Servicio.findAll({
    where: { NOMBRE_SERVICIO: servicios },
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

  newProveedor.addServicios(serviciosDisp)
  newProveedor.setPai(paisDisp)
  newProveedor.setProvincium(provinciasDisp)
  newProveedor.setCiudad(ciudadesDisp)
  return res.status(201).send('Proveedor creado')
}

const getProv = async (req, res, next) => {
  try {
    const proveedores = await Proveedor.findAll({
      attributes: [
        'id',
        'NOMBRE_APELLIDO_PROVEEDOR',
        'EMAIL',
        'IMAGEN',
        'FECHA_NACIMIENTO',
        'CALIFICACION',
        'REMOTE',
      ],
      include: [
        {
          model: Servicio,
          attributes: ['NOMBRE_SERVICIO'],
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

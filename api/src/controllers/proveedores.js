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

module.exports = {
  createProv,
}

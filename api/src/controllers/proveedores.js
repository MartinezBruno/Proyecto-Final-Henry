const { Proveedor, Servicio, Ciudad, Provincia, Pais } = require("../db");

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
  } = req.body;

  let newProv = await Proveedor.create({
    NOMBRE_APELLIDO_PROVEEDOR: `${nombre} ${apellido}`,
    PASSWORD: password,
    EMAIL: email,
    IMAGEN: imagen,
    FECHA_NACIMIENTO: fecha_nacimiento,
  });

  let serviciosDisp = await Servicio.findAll({
    where: { NOMBRE_SERVICIO: servicios },
  });
  console.log(serviciosDisp);
  newProv.addServicios(serviciosDisp);

  let paisDisp = await Pais.findAll({
    where: { NOMBRE_PAIS: pais },
  });

  newProv.addPai(paisDisp);

  //   let provinciasDisp = await Provincia.findAll({
  //     where: { NOMBRE_PROVINCIA: provincia },
  //   });

  //   newProv.addProvincia(provinciasDisp);

  //   let ciudadesDisp = await Ciudad.findAll({
  //     where: { NOMBRE_CIUDAD: ciudad },
  //   });

  //   newProv.addCiudad(ciudadesDisp);

  return res.status(201).send("Proveedor creado");
};

module.exports = {
  createProv,
};

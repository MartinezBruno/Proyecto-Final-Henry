const { Servicio } = require("../db");

const getServicios = async (req, res) => {
  let servicio = await Servicio.findAll();
  servicio = servicio.map((ser) => ser.NOMBRE_SERVICIO).sort();

  res.status(200).send(servicio);
};

module.exports = {
  getServicios,
};

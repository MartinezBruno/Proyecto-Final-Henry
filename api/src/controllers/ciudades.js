const { Ciudad, Provincia } = require('../db')
const { ciudad } = require('../dbFill/ubicacion')

const getCiudades = () => {
  ciudad.forEach(async (el) => {
    try {
      let provincia = await Provincia.findByPk(el.idProv)
      let [ciudades, _created] = await Ciudad.findOrCreate({
        where: {
          NOMBRE_CIUDAD: el.nombre,
        },
      })
      ciudades.setProvincium(provincia)
    } catch (error) {
      console.log(error)
    }
  })
}

module.exports = {
  getCiudades,
}

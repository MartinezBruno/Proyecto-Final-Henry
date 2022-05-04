const { Ciudad, Provincia } = require('../db')
const { ciudad } = require('../dbFill/ubicacion')

const saveCiudades = async () => {
  for (let i = 0; i < ciudad.length; i++) {
    try {
      let provincia = await Provincia.findOne({
        where: {
          id: ciudad[i].idProv,
        },
      })
      let [ciudades, _created] = await Ciudad.findOrCreate({
        where: { NOMBRE_CIUDAD: ciudad[i].nombre },
      })
      ciudades.setProvincium(provincia)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = {
  saveCiudades,
}

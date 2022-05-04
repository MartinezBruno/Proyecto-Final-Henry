const { Provincia, Pais } = require('../db')
const { provincia } = require('../dbFill/ubicacion')

const getProvincias = () => {
  provincia.forEach(async (el) => {
    try {
      let pais = await Pais.findOne({
        where: { id: el.idPais },
      })
      let [provincias, _created] = await Provincia.findOrCreate({
        where: { id: el.id, NOMBRE_PROVINCIA: el.nombre },
      })
      provincias.setPai(pais)
    } catch (error) {
      console.log(error)
    }
  })
}

module.exports = {
  getProvincias,
}

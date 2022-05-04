const { Provincia, Pais } = require('../db')
const { provincia } = require('../dbFill/ubicacion')

const getProvincias = async () => {
  for (let i = 0; i < provincia.length; i++) {
    try {
      let pais = await Pais.findOne({
        where: { id: provincia[i].idPais },
      })
      let [provincias, _created] = await Provincia.findOrCreate({
        where: { id: provincia[i].id, NOMBRE_PROVINCIA: provincia[i].nombre },
      })
      provincias.setPai(pais)
    } catch (error) {
      console.log(error)
    }
  }
}

module.exports = {
  getProvincias,
}

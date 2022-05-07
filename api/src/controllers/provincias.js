const { Provincia, Pais } = require('../db')
const { provincia } = require('../dbFill/ubicacion')

const regionDb = async () => {
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

const getRegion = async (req, res) => {
  const { code } = req.params
  let region
  try {
    switch (code) {
      case 'Argentina':
        region = await Provincia.findAll({
          where: { PaiId: 1 },
        })
        break
      case 'Uruguay':
        region = await Provincia.findAll({
          where: { PaiId: 2 },
        })
        break
      case 'Mexico':
        region = await Provincia.findAll({
          where: { PaiId: 3 },
        })
        break
      default:
        region = [{ nombre: 'No encontrado' }]
    }
    res.status(200).send(region)
  } catch (error) {
    res.status(404).send(error)
  }
}

module.exports = {
  regionDb,
  getRegion,
}

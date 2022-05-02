const { getQuota, counter, BATTUTA_KEY } = require('./quotesVerify')
const axios = require('axios')
const { Ciudad, Provincia } = require('../db')

const getCiudades = async (req, res) => {
  const { code, region } = req.params
  if (!code || !region)
    return res.status(400).send({
      msg: 'No se ha enviado correctamente el código de país o la región',
    })
  await getQuota()
  let citiesURL = `https://battuta.medunes.net/api/city/${code}/search/?region=${region}&key=${BATTUTA_KEY[counter]}`
  let cities = (await axios.get(citiesURL)).data

  cities = cities.map((el) => {
    return {
      nombre: el.city,
      latitude: el.latitude,
      longitude: el.longitude,
    }
  })
  let capitalicedRegion =
    region[0].toUpperCase() + region.slice(1).toLowerCase()
  let provincia = await Provincia.findOne({
    where: { NOMBRE_PROVINCIA: capitalicedRegion },
  })
  cities.forEach(async (el) => {
    let [city, _created] = await Ciudad.findOrCreate({
      where: {
        NOMBRE_CIUDAD: el.nombre,
      },
    })
    city.setProvincium(provincia)
  })
  return res.status(200).send(cities)
}

module.exports = {
  getCiudades,
}

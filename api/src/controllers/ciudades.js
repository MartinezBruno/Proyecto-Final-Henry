const { getQuota, counter, BATTUTA_KEY } = require('./quotesVerify')
const axios = require('axios')
const { Ciudad, Provincia } = require('../db')

const getCiudades = async (req, res) => {
  const { code, region } = req.params
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
  Ciudad.truncate({ cascade: true, restartIdentity: true })
  let capitalicedRegion =
    region[0].toUpperCase() + region.slice(1).toLowerCase()
  let provincia = await Provincia.findOne({
    where: { NOMBRE_PROVINCIA: capitalicedRegion },
  })
  cities.forEach(async (el) => {
    let city = await Ciudad.create({
      NOMBRE_CIUDAD: el.nombre,
    })
    city.setProvincium(provincia)
  })
  res.status(200).send(cities)
}

module.exports = {
  getCiudades,
}

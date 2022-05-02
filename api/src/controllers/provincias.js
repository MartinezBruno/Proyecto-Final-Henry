const { getQuota, counter, BATTUTA_KEY } = require('./quotesVerify')
const axios = require('axios')
const { Provincia, Pais } = require('../db')

const getProvincias = async (req, res) => {
  try {
    await getQuota()
    const { code } = req.params
    if (!code)
      return res.status(400).send({
        msg: 'No se ha enviado el código de país o el código es inexistente',
      })
    const regionURL = `http://battuta.medunes.net/api/region/${code}/all/?key=${BATTUTA_KEY[counter]}`
    let provincias = (await axios.get(regionURL)).data
    provincias = provincias.map((provincia) => provincia.region)
    let pais
    switch (code) {
      case 'ar':
        pais = 'Argentina'
        provincias = provincias.map(function (prov) {
          if (prov.includes('Province')) {
            return prov
              .split(' ')
              .filter((el) => el !== 'Province')
              .join(' ')
          } else {
            return prov
          }
        })
        break
      case 'uy':
        pais = 'Uruguay'
        provincias = provincias.map(function (prov) {
          if (prov.includes('Departamento de')) {
            return prov
              .split(' ')
              .filter((el) => el !== 'Departamento' && el !== 'de')
              .join(' ')
          }
        })
        break
      case 'mx':
        pais = 'Mexico'
        provincias = provincias
          .map(function (prov) {
            if (prov.includes('Estado de')) {
              return prov
                .split(' ')
                .filter((el) => el !== 'Estado' && el !== 'de')
                .join(' ')
            } else {
              return prov
            }
          })
          .sort()
        break
      default:
        break
    }
    let paisDb = await Pais.findOne({
      where: { NOMBRE_PAIS: pais },
    })
    provincias.forEach(async (provincia) => {
      let [prov, _created] = await Provincia.findOrCreate({
        where: { NOMBRE_PROVINCIA: provincia },
      })
      prov.setPai(paisDb)
    })
    return res.status(200).send(provincias)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getProvincias,
}

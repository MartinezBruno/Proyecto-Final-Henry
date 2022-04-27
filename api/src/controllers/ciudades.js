const {getQuota, counter, BATTUTA_KEY} = require('./quotesVerify');
const axios = require('axios');
const {Ciudad} = require('../db');

const getCiudades = async (req, res) => {
   const {code, region} = req.params;
   await getQuota();
   let citiesURL = `https://battuta.medunes.net/api/city/${code}/search/?region=${region}&key=${BATTUTA_KEY[counter]}`;
   let cities = (await axios.get(citiesURL)).data;

   cities = cities.map(el => {
      return {
         nombre: el.city,
         latitude: el.latitude,
         longitude: el.longitude,
      };
   });
   Ciudad.truncate({cascade: true, restartIdentity: true});
   cities.forEach(el => {
      Ciudad.create({
         NOMBRE_CIUDAD: el.nombre,
      });
   });
   res.status(200).send(cities);
};

module.exports = {
   getCiudades,
};

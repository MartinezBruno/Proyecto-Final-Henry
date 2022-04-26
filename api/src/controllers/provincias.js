const {getQuota, counter, BATTUTA_KEY} = require('./quotesVerify');
const axios = require('axios');
const {Provincia} = require('../db');

const getProvincias = async (req, res) => {
   try {
      await getQuota();
      const {code} = req.params;
      const regionURL = `http://battuta.medunes.net/api/region/${code}/all/?key=${BATTUTA_KEY[counter]}`;
      let provincias = (await axios.get(regionURL)).data;
      provincias = provincias.map(provincia => provincia.region);
      res.status(200).send(provincias);
      Provincia.truncate({cascade: true, restartIdentity: true});
      provincias.forEach(provincia => {
         Provincia.create({
            NOMBRE_PROVINCIA: provincia,
         });
      });
   } catch (error) {
      console.log(error);
   }
};

module.exports = {
   getProvincias,
};

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
      switch (code) {
         case 'ar':
            provincias = provincias.map(function (prov) {
               if (prov.includes('Province')) {
                  return prov
                     .split(' ')
                     .filter(el => el !== 'Province')
                     .join(' ');
               } else {
                  return prov;
               }
            });
            break;
         case 'uy':
            provincias = provincias.map(function (prov) {
               if (prov.includes('Departamento de')) {
                  return prov
                     .split(' ')
                     .filter(el => el !== 'Departamento' && el !== 'de')
                     .join(' ');
               }
            });
            break;
         case 'mx':
            provincias = provincias
               .map(function (prov) {
                  if (prov.includes('Estado de')) {
                     return prov
                        .split(' ')
                        .filter(el => el !== 'Estado' && el !== 'de')
                        .join(' ');
                  } else {
                     return prov;
                  }
               })
               .sort();
            break;
         default:
            break;
      }
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

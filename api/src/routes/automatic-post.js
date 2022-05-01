const express = require('express')
const axios = require('axios');
const { getProvincias } = require('../controllers/provincias')
const router = express.Router()

const arr_proovedores = [{
  nombre: "asdf",
  apellido: "asdfasdf",
  password: "1234",
  email: "asdfdddggg@gmail.com",
  imagen: "sodáksd0asokdasdokasdasd",
  fecha_nacimiento: "24-05-2022",
  pais: "Uruguay",
  servicios:[ {
      NOMBRE_SERVICIO: "Profe de Guitarra",
      REMOTE: true,
      PRECIO: 50000

    },
     {
      NOMBRE_SERVICIO: "TaxiBoy",
      REMOTE: false,
      PRECIO: 100000
    }
],
  provincia: "Artigas",
},
  { nombre: "eeeeeee",
  apellido: "eeeeeeeee",
  password: "1234",
  email: "eeeeeeeeee@gmail.com",
  imagen: "sodáksd0asokdasdokasdasd",
  fecha_nacimiento: "24-05-2022",
  pais: "Uruguay",
  servicios:[ {
      NOMBRE_SERVICIO: "Profe de Guitarra",
      REMOTE: true,
      PRECIO: 50000

    },
     {
      NOMBRE_SERVICIO: "TaxiBoy",
      REMOTE: false,
      PRECIO: 100000
    }
],
  provincia: "Artigas",
},
{
  nombre: "aaaaa",
  apellido: "aaaaaaa",
  password: "1234",
  email: "aaaaaaa@gmail.com",
  imagen: "sodáksd0asokdasdokasdasd",
  fecha_nacimiento: "24-05-2022",
  pais: "Uruguay",
  servicios:[ {
      NOMBRE_SERVICIO: "Profe de Guitarra",
      REMOTE: true,
      PRECIO: 50000

    },
     {
      NOMBRE_SERVICIO: "TaxiBoy",
      REMOTE: false,
      PRECIO: 100000
    }
],
  provincia: "Artigas",
}]

router.post('/', (req, res) => {
  try {
    arr_proovedores.map(async proveedor => {
      proveedor.pais === "Argentina" ?  axios.get("http://localhost:8080/api/provincias/ar") : null
      proveedor.pais === "Mexico" ?  axios.get("http://localhost:8080/api/provincias/mx") : null
      proveedor.pais === "Uruguay" ?  axios.get("http://localhost:8080/api/provincias/uy") : null
       axios.get("http://localhost:8080/api/ciudad/" + proveedor.provincia.toLowerCase());
       axios.post("http://localhost:8080/api/proveedor", proveedor);
    })
    return res.send('Proovedores subidos a la DB')
  } catch (error) {
    console.error(error);
  }
})

module.exports = router
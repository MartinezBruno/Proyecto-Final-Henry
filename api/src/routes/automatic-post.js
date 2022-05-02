const express = require('express')
const axios = require('axios')
const { getProvincias } = require('../controllers/provincias')
const router = express.Router()

let { arrayProveedores } = require('../dbFill/bulkcreate.js')

async function autofillProveedores() {
  await axios.get('http://localhost:3001/api/provincias/ar')
  await axios.get('http://localhost:3001/api/provincias/uy')
  await axios.get('http://localhost:3001/api/provincias/mx')
  try {
    arrayProveedores.map(async (proveedor) => {
      let pais = ''
      if (proveedor.pais === 'Argentina') {
        pais = 'ar'
      }
      if (proveedor.pais === 'Uruguay') {
        pais = 'uy'
      }
      if (proveedor.pais === 'Mexico') {
        pais = 'mx'
      }
      await axios.get(
        'http://localhost:3001/api/ciudad/' +
          pais +
          '/' +
          proveedor.provincia.toLowerCase()
      )
      await axios.post('http://localhost:3001/api/proveedor', proveedor)
    })
    return console.log('Proovedores subidos a la DB')
  } catch (error) {
    console.error(error)
  }
}

module.exports = autofillProveedores

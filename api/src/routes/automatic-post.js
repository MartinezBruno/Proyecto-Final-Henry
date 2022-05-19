const express = require('express')
const axios = require('axios')

let { arrayProveedores } = require('../dbFill/bulkcreate.js')

async function autofillProveedores() {
  try {
    arrayProveedores.map(async (proveedor) => {
      await axios.post('http://159.223.142.74/api/auth/proveedor/signup', proveedor)
    })
    return console.log('Proovedores subidos a la DB')
  } catch (error) {
    console.error(error)
  }
}

module.exports = autofillProveedores

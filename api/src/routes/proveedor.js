const express = require('express')
const router = express.Router()

const {
  createProv,
  getProv,
  getProvByID,
} = require('../controllers/proveedores.js')

router.get('/', getProv)
router.get('/:id', getProvByID)
router.post('/', createProv)

module.exports = router

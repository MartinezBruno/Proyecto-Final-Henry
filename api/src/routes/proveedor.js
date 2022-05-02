const express = require('express')
const router = express.Router()

const {
  createProv,
  getProv,
  getProvByID,
  deleteServicio_Prov,
} = require('../controllers/proveedores.js')

router.get('/', getProv)
router.get('/:id', getProvByID)
router.post('/', createProv)
router.delete('/', deleteServicio_Prov)

module.exports = router

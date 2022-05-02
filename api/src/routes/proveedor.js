const express = require('express')
const router = express.Router()

const {
  createProv,
  getProv,
  getProvByID,
  deleteServicio_Prov,
  addServicio_Prov,
} = require('../controllers/proveedores.js')

router.get('/', getProv)
router.get('/:id', getProvByID)
router.post('/:id', addServicio_Prov)
router.post('/', createProv)
router.delete('/:servId/:provId', deleteServicio_Prov)

module.exports = router

const express = require('express')
const router = express.Router()

const {
  createProv,
  getProv,
  getProvByID,
  deleteServicio_Prov,
  updateProvServices,
} = require('../controllers/proveedores.js')

router.get('/', getProv)
router.get('/:id', getProvByID)
router.post('/:id', updateProvServices)
router.post('/', createProv)
router.delete('/:servId/:provId', deleteServicio_Prov)

module.exports = router

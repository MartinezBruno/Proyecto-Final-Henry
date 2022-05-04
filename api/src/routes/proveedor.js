const express = require('express')
const router = express.Router()

const {
  getProv,
  getProvByID,
  deleteServicio_Prov,
  updateProvServices,
} = require('../controllers/proveedores.js')

router.get('/', getProv)
router.get('/:id', getProvByID)
router.post('/:id', updateProvServices)
router.delete('/:servId/:provId', deleteServicio_Prov)

module.exports = router

const express = require('express')
const router = express.Router()

const { getProv, getProvByID, deleteServicio_Prov, addServicio_Prov } = require('../controllers/proveedores.js')

router.get('/', getProv)
router.get('/:id', getProvByID)
router.post('/:id', addServicio_Prov)
router.delete('/:servId/:provId', deleteServicio_Prov)

module.exports = router

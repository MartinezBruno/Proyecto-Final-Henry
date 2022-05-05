const express = require('express')
const router = express.Router()

const { getProv, getProvByID, deleteServicio_Prov, addServicio_Prov, filtroPorProfesion, filtroPorProvincia, filtroPorCiudad, filtroPorPais} = require('../controllers/proveedores.js')

router.get('/', getProv)
router.get('/:id', getProvByID)
router.post('/:id', addServicio_Prov)
router.delete('/:servId/:provId', deleteServicio_Prov)
// router.get('/filter?pais&provincia&ciudad&profesion', queryFilter)
router.get('/filter/:service', filtroPorProfesion)
router.get('/filterP/:provincia', filtroPorProvincia)
router.get('/filterC/:ciudad', filtroPorCiudad)
router.get('/filterPA/:pais', filtroPorPais)
module.exports = router

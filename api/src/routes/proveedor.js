const express = require('express')
const router = express.Router()

<<<<<<< HEAD
const {
  getProv,
  getProvByID,
  deleteServicio_Prov,
  addServicio_Prov,
  filtroPorProfesion,
  filtroPorProvincia,
  filtroProveedor,
} = require('../controllers/proveedores.js')
=======
const { getProv, getProvByID, deleteServicio_Prov, addServicio_Prov, filtroPorProfesion, filtroPorProvincia, filtroPorCiudad, filtroPorPais} = require('../controllers/proveedores.js')
>>>>>>> c797b80ac98412fee59323e41922acd5c19764e5

router.get('/', getProv)
router.get('/filtro', filtroProveedor)
router.get('/:id', getProvByID)
router.post('/:id', addServicio_Prov)
router.delete('/:servId/:provId', deleteServicio_Prov)
// router.get('/filter?pais&provincia&ciudad&profesion', queryFilter)
router.get('/filter/:service', filtroPorProfesion)
router.get('/filterP/:provincia', filtroPorProvincia)
<<<<<<< HEAD

=======
router.get('/filterC/:ciudad', filtroPorCiudad)
router.get('/filterPA/:pais', filtroPorPais)
>>>>>>> c797b80ac98412fee59323e41922acd5c19764e5
module.exports = router

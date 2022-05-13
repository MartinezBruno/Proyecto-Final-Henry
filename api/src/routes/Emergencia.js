const express = require('express')
const router = express.Router()

const {emergencia, takeEmergencia, getEmergencias} = require ('../controllers/emergencia')

router.post('/', emergencia)
router.put('/', takeEmergencia)
router.get('/', getEmergencias)

module.exports = router 
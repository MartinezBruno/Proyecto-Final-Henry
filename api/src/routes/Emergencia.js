const express = require('express')
const router = express.Router()

const {emergencia, takeEmergencia} = require ('../controllers/emergencia')

router.post('/', emergencia)
router.put('/', takeEmergencia)

module.exports = router
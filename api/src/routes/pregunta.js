const express = require('express')
const router = express.Router()

const { addPregunta } = require('../controllers/preguntas')

router.post('/', addPregunta)

module.exports = router

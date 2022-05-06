const express = require('express')
const router = express.Router()

const { addPregunta, addRespuesta } = require('../controllers/preguntas')

router.post('/respuesta', addRespuesta)
router.post('/', addPregunta)

module.exports = router

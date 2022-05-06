const express = require('express')
const router = express.Router()

const { addPregunta, addRespuesta } = require('../controllers/preguntas')

router.patch('/respuesta', addRespuesta)
router.patch('/', addPregunta)

module.exports = router

const express = require('express')
const router = express.Router()

const { saveImage } = require('../controllers/saveImage')

router.post('/upload/profile', saveImage)

module.exports = router

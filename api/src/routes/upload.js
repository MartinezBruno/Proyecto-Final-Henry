const express = require('express')
const router = express.Router()
const { saveImage } = require('../controllers/saveImage')

router.post('/profile/:code', saveImage)

module.exports = router

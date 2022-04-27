const express = require('express');
const router = express.Router();

const {getCiudades} = require('../controllers/ciudades');

router.get('/:code/:city', getCiudades);

module.exports = router;

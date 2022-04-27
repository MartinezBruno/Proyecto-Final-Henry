const express = require('express');
const router = express.Router();

const {getProvincias} = require('../controllers/provincias');

router.get('/:code', getProvincias);

module.exports = router;

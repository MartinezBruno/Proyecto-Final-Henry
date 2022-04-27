const {Router} = require('express');
const router = Router();

const region = require('./region');
const ciudad = require('./ciudad');

router.use('/provincias', region);
router.use('/ciudad', ciudad);

module.exports = router;

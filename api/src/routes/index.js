const {Router} = require('express');
const router = Router();

const region = require('./region');

router.use('/provincias', region);

module.exports = router;

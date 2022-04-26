const Router  = require('express');

const router = Router()


router.get('/', (req, res) => {
	res.send('soy la ruta get!');
});


module.exports = router
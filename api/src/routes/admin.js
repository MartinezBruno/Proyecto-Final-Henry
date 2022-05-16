const express = require('express')
const router = express.Router()

const {getUsers, getProviders,ban, hacerAdmin, unBann} = require('../controllers/admin')



router.get('/usuarios', getUsers)
router.get('/proveedores',getProviders)
router.put('/ban', ban)
router.put('/unban', unBann)
router.post('/setAdmin', hacerAdmin)
module.exports = router
const express = require('express')
const router = express.Router()

const {getUsers, getProviders,ban, hacerAdmin, unBann, getCompras, deleteComent, deletePregunta, getAyudas, deleteUser} = require('../controllers/admin')



router.get('/usuarios', getUsers)
router.get('/proveedores',getProviders)
router.get('/compras', getCompras)
router.get('/ayudas', getAyudas)
router.put('/ban', ban)
router.put('/unban', unBann)
router.post('/setAdmin', hacerAdmin)
router.delete('/comentarios', deleteComent)
router.delete('/pregunta', deletePregunta)
router.delete('/delete', deleteUser)
module.exports = router
const express = require('express')
const router = express.Router()

const {getUsers, getProviders,ban, hacerAdmin, unBann, getCompras, deleteComent, compraDetail, deletePregunta, getAyudas, deleteUser} = require('../controllers/admin')



router.get('/usuarios', getUsers)
router.get('/proveedores', getProviders)
router.get('/compras', getCompras)
router.get('/compras/:id', compraDetail)
router.get('/ayudas', getAyudas)
router.put('/ban', ban)
router.put('/unban', unBann)
router.post('/setAdmin', hacerAdmin)
router.delete('/comentarios/:idComentario', deleteComent)
router.delete('/pregunta/:idPregunta', deletePregunta)
router.delete('/delete', deleteUser)
module.exports = router
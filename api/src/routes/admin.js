const express = require('express')
const router = express.Router()

<<<<<<< HEAD
const {getUsers, getProviders,ban, hacerAdmin, unBann, getCompras, deleteComent, deletePregunta, getAyudas, deleteUser} = require('../controllers/admin')

=======
const {getUsers, getProviders,ban, hacerAdmin, unBann, getCompras,compraDetail, deleteComent, deletePregunta, getAyudas} = require('../controllers/admin')
>>>>>>> 24e423cf7bce04485cd79c11a6bdd2046aea017c


router.get('/usuarios', getUsers)
router.get('/proveedores', getProviders)
router.get('/compras', getCompras)
router.get('/compras/:id', compraDetail)
router.get('/ayudas', getAyudas)
router.put('/ban', ban)
router.put('/unban', unBann)
router.post('/setAdmin', hacerAdmin)
router.delete('/comentarios', deleteComent)
router.delete('/pregunta', deletePregunta)
router.delete('/delete', deleteUser)
module.exports = router
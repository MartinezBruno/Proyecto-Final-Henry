const express = require('express')
const { Router } = require('express')
const { authJwt } = require('../middlewares')
const controller = require('../controllers/usuarios')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())

// router.get('/:id', getProvByID)
router.get('/:id', controller.getUserById)

router.put('/:userId/:provId', controller.addFavorito)

router.delete('/:userId/:provId', controller.deleteFavorito)

router.get('/test/all', controller.allAccess)

router.get('/test/usuario', [authJwt.verifyToken], controller.userBoard)

router.get('/test/proveedor', [authJwt.verifyToken, authJwt.isProveedor], controller.userBoard)

router.put('/:id', controller.putUser)

router.get('/test/mod', [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard)

router.get('/test/admin', [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard)

module.exports = router

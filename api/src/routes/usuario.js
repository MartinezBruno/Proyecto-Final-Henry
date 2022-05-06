const express = require('express')
const { Router } = require('express')
const { authJwt } = require('../middlewares')
const { getUserById,buyReview, allAccess, userBoard,putUser, compraSucces,moderatorBoard,adminBoard} = require('../controllers/usuarios')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())

// router.get('/:id', getProvByID)

router.get('/:id', getUserById)

router.get('/test/all', allAccess)

router.get('/test/usuario', [authJwt.verifyToken], userBoard)

router.put('/usuario/:id', putUser)

router.get(
  '/test/proveedor',
  [authJwt.verifyToken, authJwt.isProveedor],
  userBoard
)

router.put('/calificacion', buyReview)

router.patch('/compraSuccess', compraSucces)

router.get(
  '/test/mod',
  [authJwt.verifyToken, authJwt.isModerator],
  moderatorBoard
)

router.get(
  '/test/admin',
  [authJwt.verifyToken, authJwt.isAdmin],
  adminBoard
)

module.exports = router

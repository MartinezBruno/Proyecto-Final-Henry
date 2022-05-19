const express = require('express')
const { Router } = require('express')
const { authJwt } = require('../middlewares')
const {
  getUsers,
  getUserById,
  buyReview,
  addFavorito,
  deleteFavorito,
  getFavorites,
  allAccess,
  userBoard,
  putUser,
  changePassword,
  moderatorBoard,
  adminBoard,
  compraSuccess,
  misCompras,
  createAyuda,
} = require('../controllers/usuarios')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())

// router.get('/:id', getProvByID)

router.put('/calificacion', buyReview)

router.get('/', getUsers)

router.get('/:id', getUserById)

router.get('/favoritos/:userId', getFavorites)

router.put('/favoritos/:userId/:provId', addFavorito)

router.delete('/favoritos/:userId/:provId', deleteFavorito)

// router.get('/test/all', allAccess)

// router.get('/test/usuario', [authJwt.verifyToken], userBoard)

router.put('/:id', putUser)

router.put('/password/:id', changePassword)

// router.get('/test/proveedor', [authJwt.verifyToken, authJwt.isProveedor], userBoard)

router.post('/compraSuccess', compraSuccess)

router.get('/compraSuccess/misCompras', misCompras)
router.post('/ayuda', createAyuda)

// router.get('/test/mod', [authJwt.verifyToken, authJwt.isModerator], moderatorBoard)

// router.get('/test/admin', [authJwt.verifyToken, authJwt.isAdmin], adminBoard)

module.exports = router

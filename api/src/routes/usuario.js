const express = require('express')
const { Router } = require('express')
const { authJwt } = require('../middlewares')
const {
  getUsers,
  getUserById,
  buyReview,
  addFavorito,
  deleteFavorito,
  allAccess,
  userBoard,
  putUser,
  moderatorBoard,
  adminBoard,
  compraSuccess,
  misCompras,
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

router.put('/:userId/:provId', addFavorito)

router.delete('/:userId/:provId', deleteFavorito)

router.get('/test/all', allAccess)

router.get('/test/usuario', [authJwt.verifyToken], userBoard)

router.put('/:id', putUser)

router.get('/test/proveedor', [authJwt.verifyToken, authJwt.isProveedor], userBoard)

router.post('/compraSuccess', compraSuccess)

router.get('/compraSuccess/misCompras', misCompras)

router.get('/test/mod', [authJwt.verifyToken, authJwt.isModerator], moderatorBoard)

router.get('/test/admin', [authJwt.verifyToken, authJwt.isAdmin], adminBoard)

module.exports = router

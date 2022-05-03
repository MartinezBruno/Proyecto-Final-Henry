const express = require('express')
const { Router } = require('express')
const controller = require('../controllers/auth')
const verifySignUp = require('../middlewares/verifySignUp')
const controllerProveedor = require('../controllers/auth')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())

// router.post(
//   'usuario/signup',
//   [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
//   controller.signup
// )

router.post('/signin', controller.signin)
router.post('/refreshtoken', controller.refreshToken)
router.post(
  '/proveedor/signup',
  [verifySignUp.checkDuplicateEmailOnProveedores, verifySignUp.checkRolesExisted],
  controllerProveedor.signup
)

module.exports = router

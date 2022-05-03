const express = require('express')
const { Router } = require('express')
const controller = require('../controllers/auth')
const verifySignUp = require('../middlewares/verifySignUp')
const create  = require ('../controllers/auth.create_prov')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())

router.post(
  'usuario/signup',
  [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
  controller.signup
)

router.post('/signin', controller.signin)
router.post('/refreshtoken', controller.refreshToken)
router.post( 'proovedor/signup',
  [verifySignUp.checkDuplicateEmail, verifySignUp.checkRolesExisted],
  create                            
)

module.exports = router

const express = require('express')
const { Router } = require('express')
const verifySignUp = require('../middlewares/verifySignUp')
const controller = require('../controllers/auth')
const controllerAdmin = require('../controllers/auth.admin')
const controllerProveedor = require('../controllers/auth.proveedor')
const controllerUsuario = require('../controllers/auth.usuario')
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router()

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json())

router.post('/refreshtoken', controller.refreshToken)

router.post('/usuario/signup', [verifySignUp.checkDuplicateEmailOnUsuarios, verifySignUp.checkRolesExisted], controllerUsuario.signup)
router.get('/usuario/confirm/:token', [], controllerUsuario.confirm)
router.post('/usuario/signin', controllerUsuario.signin)

router.post('/proveedor/signup', [verifySignUp.checkDuplicateEmailOnProveedores, verifySignUp.checkRolesExisted], controllerProveedor.signup)
router.post('/proveedor/signin', controllerProveedor.signin)

router.post('/admin/signup', [verifySignUp.checkDuplicateEmailOnAdmin, verifySignUp.checkRolesExisted], controllerAdmin.signup)
router.post('/admin/signin', controllerAdmin.signin)

module.exports = router

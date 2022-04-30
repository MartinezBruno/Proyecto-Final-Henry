const express = require('express');
const { Router } = require('express');
const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use(express.json());

router.get("/test/all", controller.allAccess);

router.get(
  "/test/user",
  [authJwt.verifyToken],
  controller.userBoard
);

router.put(
  "/user/:id",
  controller.putUser
);

router.get(
  "/test/mod",
  [authJwt.verifyToken, authJwt.isModerator],
  controller.moderatorBoard
);

router.get(
  "/test/admin",
  [authJwt.verifyToken, authJwt.isAdmin],
  controller.adminBoard
);

module.exports = router;
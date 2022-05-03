const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const { Usuario } = require('../db')
const { TokenExpiredError } = jwt

const catchError = (err, res) => {
  if (err instanceof TokenExpiredError) {
    return res
      .status(401)
      .send({ message: '¡No autorizado! ¡El token de acceso ha caducado!' })
  }
  return res.sendStatus(401).send({ message: '¡No autorizado!' })
}

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']
  if (!token) {
    return res.status(403).send({ message: '¡No se proporciona token!' })
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return catchError(err, res)
    }
    req.userId = decoded.id
    next()
  })
}

const isProveedor = (req, res, next) => {
  Usuario.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'proveedor') {
          next()
          return
        }
      }
      res.status(403).send({
        message: '¡Se requiere rol de proveedor!',
      })
      return
    })
  })
}

const isAdmin = (req, res, next) => {
  Usuario.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next()
          return
        }
      }
      res.status(403).send({
        message: '¡Se requiere rol de administrador!',
      })
      return
    })
  })
}

const isModerator = async (req, res, next) => {
  // console.log(`---- User ---- ${User} ----`)
  // const pepito = await User.findByPk(req.userId);
  // const roles = pepito.getRoles();
  // for (let i = 0; i < roles.length; i++) {
  //       if (roles[i].name === "moderator") {
  //         next();
  //         return;
  //       }
  //     }
  // res.status(403).send({
  //       message: "Require Moderator Role!"
  //     });
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next()
          return
        }
      }
      res.status(403).send({
        message: '¡Se requiere rol de moderador!',
      })
    })
  })
}

const isModeratorOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'moderator') {
          next()
          return
        }
        if (roles[i].name === 'admin') {
          next()
          return
        }
      }
      res.status(403).send({
        message: '¡Se requiere rol de administrador o moderador!',
      })
    })
  })
}

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isProveedor: isProveedor,
  isModerator: isModerator,
  isModeratorOrAdmin: isModeratorOrAdmin,
}

module.exports = authJwt

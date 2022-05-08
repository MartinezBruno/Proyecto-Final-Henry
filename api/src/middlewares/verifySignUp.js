const ROLES = ['user', 'admin', 'moderator', 'proveedor']
const { Admin, Proveedor, Usuario } = require('../db')

checkDuplicateEmailOnAdmin = (req, res, next) => {
  //Email
  Admin.findOne({
    where: {
      EMAIL: req.body.email,
    },
  }).then((admin) => {
    if (admin) {
      res.status(400).send({
        message: '¡Error! ¡El email provisto ya se encuentra en uso!',
      })
      return
    }
    next()
  })
}

checkDuplicateEmailOnProveedores = (req, res, next) => {
  //Email
  Proveedor.findOne({
    where: {
      EMAIL: req.body.email,
    },
  }).then((proveedor) => {
    if (proveedor) {
      res.status(400).send({
        message: '¡Error! ¡El email provisto ya se encuentra en uso!',
      })
      return
    }
    next()
  })
  // })
}
checkDuplicateEmailOnUsuarios = (req, res, next) => {
  //Username
  // Usuarios.findOne({
  //   where: {
  //     usuario: req.body.usuario,
  //   },
  // }).then((user) => {
  //   if (user) {
  //     res.status(400).send({
  //       message: '¡Error! ¡El nombre de usuario ya se encuentra en uso!',
  //     })
  //     return
  //   }

  //Email
  Usuario.findOne({
    where: {
      EMAIL: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: '¡Error! ¡El email provisto ya se encuentra en uso!',
      })
      return
    }
    next()
  })
  // })
}

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: '¡Error! El rol no existe =' + req.body.roles[i],
        })
        return
      }
    }
  }
  next()
}

const veryfySignUp = {
  checkDuplicateEmailOnProveedores: checkDuplicateEmailOnProveedores,
  checkDuplicateEmailOnUsuarios: checkDuplicateEmailOnUsuarios,
  checkDuplicateEmailOnAdmin: checkDuplicateEmailOnAdmin,
  checkRolesExisted: checkRolesExisted,
}

module.exports = veryfySignUp

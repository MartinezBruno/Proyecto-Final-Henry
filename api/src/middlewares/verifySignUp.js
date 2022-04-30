const ROLES = ["user", "admin", "moderator"];
const { Usuarios } = require("../db");

checkDuplicateUsernameOrEmail = (req, res, next) => {

  //Username
  Usuarios.findOne({
    where: {
      usuario: req.body.usuario
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "¡Error! ¡El nombre de usuario ya se encuentra en uso!"
      });
      return;
    }

    //Email
    Usuarios.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "¡Error! ¡El email provisto ya se encuentra en uso!"
        });
        return;
      }
      next();
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "¡Error! El rol no existe =" + req.body.roles[i]
        });
        return;
      }
    }
  }
  next();
};

const veryfySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = veryfySignUp;
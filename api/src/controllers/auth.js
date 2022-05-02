const Op = require("sequelize").Op;
const config = require("../config/auth.config");
const { Usuarios, Role, RefreshToken } = require("../db");
var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = async (req, res) => {

  // Guardar usuario en la base de datos
  const {
    nombre,
    apellido,
    password,
    email,
    imagen,
    fecha_nacimiento,
    servicios,
    pais,
    provincia,
    ciudad,
  } = req.body;

  const newUser = Usuarios.create({
    nombre,
    apellido,
    password: bcrypt.hashSync(contraseña, 8),
    email,
    imagen,
    fecha_nacimiento,
    servicios,
    pais,
    provincia,
    ciudad,
  }).then(user => {
    if (req.body.roles) {
      Role.findAll({
        where: {
          name: {
            [Op.or]: req.body.roles
          }
        }
      }).then(roles => {
        user.setRoles(roles).then(() => {
          res.send({ message: "¡Usuario registrado exitosamente!" });
        });
      });

    } else {
      // rol de usuario común = 1
      user.setRoles([1]).then(() => {
        res.send({ message: "¡Usuario registrado exitosamente!" });
      });
    }
  })
  .catch(err => {
    res.status(500).send({ message: err.message });
  });
};

exports.signin = (req, res) => {
  Usuarios.findOne({
    where: {
      usuario: req.body.usuario
    }
  })
    .then(async (user) => {
      if (!user) {
        return res.status(404).send({ message: "Usuario no encontrado." });
      }
      const passwordIsValid = bcrypt.compareSync(
        req.body.contraseña,
        user.contraseña
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "¡Usuario o contraseña incorrecta!"
        });
      }
      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: config.jwtExpiration
      });
      let refreshToken = await RefreshToken.createToken(user);
      let authorities = [];
      user.getRoles().then(roles => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name.toUpperCase());
        }
        res.status(200).send({
          id: user.id,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          fechaDeNacimiento: user.fechaDeNacimiento,
          servicios: user.servicios,
          pais: user.pais,
          provincia: user.provincia,
          ciudad: user.ciudad,
          roles: authorities,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
};

exports.refreshToken = async (req, res) => {
  const { refreshToken: requestToken } = req.body;
  if (requestToken == null) {
    return res.status(403).json({ message: "¡Se requiere Refresh Token!" });
  }
  try {
    let refreshToken = await RefreshToken.findOne({ where: { token: requestToken } });
    console.log(refreshToken)
    if (!refreshToken) {
      res.status(403).json({ message: "¡El Refresh Token no se encuentra en la base de datos!" });
      return;
    }
    if (RefreshToken.verifyExpiration(refreshToken)) {
      RefreshToken.destroy({ where: { id: refreshToken.id } });
      
      res.status(403).json({
        message: "El Refresh token expiró. Realice una nueva solicitud de inicio de sesión",
      });
      return;
    }
    const user = await refreshToken.getUser();
    let newAccessToken = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: config.jwtExpiration,
    });
    return res.status(200).json({
      accessToken: newAccessToken,
      refreshToken: refreshToken.token,
    });
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
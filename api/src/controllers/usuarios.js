const { Usuarios } = require('../db');

// exports.allAccess = (req, res) => {
//   res.status(200).send("Public Content.");
// };

// exports.userBoard = (req, res) => {
//   res.status(200).send("User Content.");
// };

exports.putUser = async (req, res, next) =>{
  
  try {
    const { id } = req.params;
    const { 
  Proveedor,
  Servicio,
  Ciudad,
  Provincia,
  Pais,
  Precio,
  Proveedor_Servicio,
  Descripcion } = req.body;

    const usuarioEncontrado = await Usuarios.findOne({
      where: { id: id },
    });

    usuarioEncontrado === null
    ? res.status(404).send('No se encontró una usuario con ese id')
    : await User.update({
      Proveedor,
      Servicio,
      Ciudad,
      Provincia,
      Pais,
      Precio,
      Proveedor_Servicio,
      Descripcion
      },
      { where: { id: id}
      })
      res.send('Usuario actualizada correctamente');

  } catch (error) {
    console.error(error);
    next(error);
  }
};

// exports.adminBoard = (req, res) => {
//   res.status(200).send("Admin Content.");
// };

// exports.moderatorBoard = (req, res) => {
//   res.status(200).send("Moderator Content.");
// };
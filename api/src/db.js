const keys = require('./keys')
const { Sequelize } = require('sequelize')
const fs = require('fs')
const path = require('path')
const { PGUSER, PGHOST, PGDATABASE, PGPASSWORD, PGPORT } = process.env

const sequelize = new Sequelize({
  username: 'doadmin',
  host: 'db-postgresql-nyc1-97441-do-user-11470878-0.b.db.ondigitalocean.com',
  database: 'defaultdb',
  password: 'AVNS_ANFr5VaHiMZeExE',
  port: 25060,
  dialect: 'postgres',
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // <<<<<<< YOU NEED THIS
    },
  },
})

const basename = path.basename(__filename)

const modelDefiners = []

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)))
  })

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach((model) => model(sequelize))
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models)
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]])
sequelize.models = Object.fromEntries(capsEntries)

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const {
  Admin,
  Usuario,
  Proveedor,
  Ciudad,
  Provincia,
  Pais,
  Servicio,
  Proveedor_Servicio,
  Precio,
  Descripcion,
  Role,
  RefreshToken,
  Pregunta,
  Comentario,
  Compra,
  Chat,
  Favorito,
  Evento,
  CompraVerify,
  DuracionServicio,
  Emergencia,
  Ayuda,
} = sequelize.models

// Aca vendrian las relaciones
// Product.hasMany(Reviews);
Admin.belongsToMany(Proveedor, { through: 'Admin_Proveedor' })
Admin.belongsTo(Ciudad)
Admin.belongsTo(Pais)
Admin.belongsTo(Provincia)
Usuario.belongsToMany(Proveedor, { through: 'Usuario_Provedoor' })
Usuario.belongsTo(Ciudad)
Usuario.belongsTo(Pais)
Usuario.belongsTo(Provincia)
Provincia.hasMany(Ciudad)
Provincia.belongsTo(Pais)
Provincia.hasMany(Proveedor)
Provincia.hasMany(Usuario)
Provincia.hasMany(Admin)
Ciudad.belongsTo(Provincia)
Ciudad.hasMany(Usuario)
Ciudad.hasMany(Admin)
Ciudad.hasMany(Proveedor)
Pais.hasMany(Provincia)
Pais.hasMany(Proveedor)
Pais.hasMany(Usuario)
Pais.hasMany(Admin)
Servicio.belongsToMany(Proveedor, { through: Proveedor_Servicio })
Proveedor.belongsToMany(Servicio, { through: Proveedor_Servicio })
Proveedor.belongsToMany(Admin, { through: 'Admin_Provedoor' })
Proveedor.belongsTo(Pais)
Proveedor.belongsTo(Provincia)
Proveedor.belongsTo(Ciudad)
Proveedor_Servicio.belongsTo(DuracionServicio)
DuracionServicio.hasOne(Proveedor_Servicio)
Proveedor_Servicio.belongsTo(Precio)
Precio.hasOne(Proveedor_Servicio)
Proveedor_Servicio.belongsTo(Descripcion)
Descripcion.hasOne(Proveedor_Servicio)
Role.hasMany(Admin)
Admin.belongsTo(Role)
RefreshToken.belongsTo(Admin, {
  foreignKey: 'adminId',
  targetKey: 'id',
})
Admin.hasOne(RefreshToken, {
  foreignKey: 'adminId',
  targetKey: 'id',
})

Role.hasMany(Usuario)
Usuario.belongsTo(Role)
RefreshToken.belongsTo(Usuario, {
  foreignKey: 'userId',
  targetKey: 'id',
})
Usuario.hasOne(RefreshToken, {
  foreignKey: 'userId',
  targetKey: 'id',
})

Role.hasMany(Proveedor)
Proveedor.belongsTo(Role)
RefreshToken.belongsTo(Proveedor, {
  foreignKey: 'proveedorId',
  targetKey: 'id',
})
Proveedor.hasOne(RefreshToken, {
  foreignKey: 'proveedorId',
  targetKey: 'id',
})

Proveedor_Servicio.hasOne(Pregunta)
Pregunta.belongsTo(Proveedor_Servicio)
Proveedor_Servicio.hasOne(Comentario)
Comentario.belongsTo(Proveedor_Servicio)
Comentario.belongsTo(Usuario)
Usuario.hasOne(Comentario)
Pregunta.belongsTo(Usuario)
Usuario.hasOne(Pregunta)

Compra.belongsTo(Usuario)
Usuario.hasMany(Compra)
Compra.belongsTo(Proveedor_Servicio)
Proveedor_Servicio.hasMany(Compra)

Chat.belongsTo(Usuario)
Usuario.hasOne(Chat)
Chat.belongsTo(Proveedor)
Proveedor.hasOne(Chat)

Favorito.belongsToMany(Usuario, { through: 'Usuario_Favorito' })
Usuario.belongsToMany(Favorito, { through: 'Usuario_Favorito' })

CompraVerify.belongsTo(Evento)
Evento.hasOne(CompraVerify)
CompraVerify.belongsTo(Usuario)
Usuario.hasMany(CompraVerify)
CompraVerify.belongsTo(Proveedor_Servicio)
Proveedor_Servicio.hasMany(CompraVerify)
Usuario.hasOne(Emergencia)
Emergencia.belongsTo(Usuario)
Proveedor.hasOne(Emergencia)
Emergencia.belongsTo(Proveedor)
Servicio.hasOne(Emergencia)
Emergencia.belongsTo(Servicio)
Emergencia.belongsTo(Proveedor_Servicio)
Proveedor_Servicio.hasOne(Emergencia)

Proveedor.hasMany(Ayuda)
Ayuda.belongsTo(Proveedor)
Usuario.hasMany(Ayuda)
Ayuda.belongsTo(Usuario)

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
}

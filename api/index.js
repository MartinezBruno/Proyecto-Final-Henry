<<<<<<< HEAD
const server = require('./src/app.js')
const { conn } = require('./src/db.js')
=======

const server = require("./src/app.js");
const { conn } = require("./src/db.js");
>>>>>>> b3d94ba17d4a01b83f74224a3a8b718c86c7f08b
const { paisesDb, serviciosDb } = require('./src/dbFill')

// conn vendria a ser la DB que queremos conectar al localHoost con las relaciones de las tablas
// y las tablas definfidas en sequielize, etc

// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(() => {
    server.listen(process.env.DB_PORT, () => {
      console.log('%s listening at 3001') // eslint-disable-line no-console
    })
  })
  .then(() => {
    paisesDb()
    serviciosDb()
  })

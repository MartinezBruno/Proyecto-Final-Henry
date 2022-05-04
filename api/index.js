const server = require('./src/app.js')
const { conn } = require('./src/db.js')
const { paisesDb, serviciosDb, initialRoles } = require('./src/dbFill')
const autofillProveedores = require('./src/routes/automatic-post')


// conn vendria a ser la DB que queremos conectar al localHoost con las relaciones de las tablas
// y las tablas definfidas en sequielize, etc

// Syncing all the models at once.
conn
  .sync({ force: true })
  .then(() => {
    server.listen(process.env.DB_PORT, () => {
      console.log(`%s listening at ${process.env.DB_PORT}`); // eslint-disable-line no-console
    });

  })
  .then(() => {
    paisesDb()
    serviciosDb()
    initialRoles()
    autofillProveedores()
    }
  );


  module.exports = { server };
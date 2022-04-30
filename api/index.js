const server = require('./src/app.js')
const { conn } = require('./src/db.js')
const { paisesDb, serviciosDb } = require('./src/dbFill')

// conn vendria a ser la DB que queremos conectar al localHoost con las relaciones de las tablas
// y las tablas definfidas en sequielize, etc

// Syncing all the models at once.
conn
  .sync({ force: false })
  .then(() => {
    const connectionServer = server.listen(process.env.DB_PORT, () => {
      console.log(`%s listening at ${process.env.DB_PORT}`); // eslint-disable-line no-console
    });
  })
  .then(() => {
    paisesDb()
    serviciosDb()
    }
  );

  module.exports = {server, connectionServer};

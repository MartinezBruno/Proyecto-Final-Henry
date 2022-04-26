const server = require('./src/app.js');
const {conn} = require('./src/db.js');
const {Pais} = require('./src/db.js');

// conn vendria a ser la DB que queremos conectar al localHoost con las relaciones de las tablas
// y las tablas definfidas en sequielize, etc

// Syncing all the models at once.
const paises = ['Argentina', 'Uruguay', 'Mexico'];

conn
   .sync({force: false})
   .then(() => {
      server.listen(process.env.DB_PORT, () => {
         console.log('%s listening at 3001'); // eslint-disable-line no-console
      });
   })
   .then(() =>
      paises.forEach(pais =>
         Pais.findOrCreate({
            where: {
               NOMBRE_PAIS: pais,
            },
         }),
      ),
   );

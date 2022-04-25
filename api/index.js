const server = require('./src/app')
const mongo = require('./src/mongo')
const {conn} = require('./src/db.js')

conn.sync({force: false}).then(() => {
   server.listen(process.env.PORT, () => {
      console.log('%s listening at 3001')
   })
})

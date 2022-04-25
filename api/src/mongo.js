const mongoose = require('mongoose')
require('dotenv').config()
const {MONGO_URI} = process.env

mongoose
   .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log('Database created'))
   .catch(err => console.error(err))

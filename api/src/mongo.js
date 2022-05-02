const mongoose = require('mongoose');
require('dotenv').config();
const {MONGO_URI} = process.env;

/* const mongo_connection = mongoose
   .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
   })
   .then(() => console.log('Database created'))

   .catch(err => console.error(err)); */

// module.exports = { mongo_connection }

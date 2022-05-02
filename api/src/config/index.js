const dotenv = require('dotenv');

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config(); // config() leerá su archivo .env, analizará el contenido, lo asignará a process.env.
if (envFound.error) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

module.exports = {
  signature: process.env.SECRET,
  expiration: process.env.EXPIRATION_LOGIN,
  algorithm: process.env.ALGORITHM,
}
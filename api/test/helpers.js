const { server } = require('../index')
const supertest = require('supertest')
const { Usuario, Proveedores } = require('../src/db')

const api = supertest(server)

const provincias_ar = [
"Catamarca",
"Chaco",
"Chubut",
"Ciudad Autonoma de Buenos Aires",
"Cordoba",
"Corrientes",
"Entre Rios",
"Formosa",
"Jujuy",
"La Pampa",
"La Rioja",
"Mendoza",
"Misiones",
"Neuquen",
"Provincia de Buenos Aires",
"Rio Negro",
"Salta",
"San Juan",
"San Luis",
"Santa Cruz",
"Santa Fe",
"Santiago del Estero",
"Tierra del Fuego",
"Tucuman"
]

const provincias_mx = [
"Aguascalientes",
"Baja California",
"Baja California Sur",
"Campeche",
"Chiapas",
"Chihuahua",
"Ciudad de Mexico",
"Coahuila Zaragoza",
"Colima",
"Durango",
"Guanajuato",
"Guerrero",
"Hidalgo",
"Jalisco",
"Mexico",
"Michoacan Ocampo",
"Morelos",
"Nayarit",
"Nuevo Leon",
"Oaxaca",
"Puebla",
"Queretaro",
"Quintana Roo",
"San Luis Potosi",
"Sinaloa",
"Sonora",
"Tabasco",
"Tamaulipas",
"Tlaxcala",
"Veracruz-Llave",
"Yucatan",
"Zacatecas"
]

const provincias_uy = [
"Artigas",
"Canelones",
"Cerro Largo",
"Colonia",
"Durazno",
"Flores",
"Florida",
"Lavalleja",
"Maldonado",
"Montevideo",
"Paysandu",
"Rio Negro",
"Rivera",
"Rocha",
"Salto",
"San Jose",
"Soriano",
"Tacuarembo",
"Treinta y Tres"
]

const getAllProvincias = async (pais) => {
  const response = await api.get('/api/provincias/' + pais)
  return {
    contents: response.body.map(provincia => provincia.content),
    response
  }
}

const getUsers = async () => {
  const usersDB = await Usuario.findAll({})
  return usersDB.map(user => user.toJSON())
}

module.exports = {
  api,
  provincias_ar,
  provincias_mx,
  provincias_uy,
  getAllProvincias,
  getUsers
}
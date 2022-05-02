const request = require('supertest')
const app = require('../../src/app')

const ar_provinces = [
  'Catamarca',
  'Chaco',
  'Chubut',
  'Ciudad Autonoma de Buenos Aires',
  'Cordoba',
  'Corrientes',
  'Entre Rios',
  'Formosa',
  'Jujuy',
  'La Pampa',
  'La Rioja',
  'Mendoza',
  'Misiones',
  'Neuquen',
  'Provincia de Buenos Aires',
  'Rio Negro',
  'Salta',
  'San Juan',
  'San Luis',
  'Santa Cruz',
  'Santa Fe',
  'Santiago del Estero',
  'Tierra del Fuego',
  'Tucuman',
]
const mx_states = [
  'Aguascalientes',
  'Baja California',
  'Baja California Sur',
  'Campeche',
  'Chiapas',
  'Chihuahua',
  'Ciudad de Mexico',
  'Coahuila Zaragoza',
  'Colima',
  'Durango',
  'Guanajuato',
  'Guerrero',
  'Hidalgo',
  'Jalisco',
  'Mexico',
  'Michoacan Ocampo',
  'Morelos',
  'Nayarit',
  'Nuevo Leon',
  'Oaxaca',
  'Puebla',
  'Queretaro',
  'Quintana Roo',
  'San Luis Potosi',
  'Sinaloa',
  'Sonora',
  'Tabasco',
  'Tamaulipas',
  'Tlaxcala',
  'Veracruz-Llave',
  'Yucatan',
  'Zacatecas',
]
const uy_departments = [
  'Artigas',
  'Canelones',
  'Cerro Largo',
  'Colonia',
  'Durazno',
  'Flores',
  'Florida',
  'Lavalleja',
  'Maldonado',
  'Montevideo',
  'Paysandu',
  'Rio Negro',
  'Rivera',
  'Rocha',
  'Salto',
  'San Jose',
  'Soriano',
  'Tacuarembo',
  'Treinta y Tres',
]

describe('/api', () => {
  it('get /api debe responder con un status code 200', async () => {
    const res = await request(app).get('/api')
    expect(res.statusCode).toBe(200)
  })

  it('get /api debe responder con un content type text/html', async () => {
    const res = await request(app)
      .get('/api')
      .expect('Content-Type', 'text/html; charset=utf-8')
  })
})

describe('/provincias/:code', () => {
  // si noCode o :code invalid responde con un bad request status code 400
  // si bad request response con un obj que tiene una propiedad message.
  describe(':code no existe o es invalido', () => {
    it('debe responder con un status code 400 si no existe :code', async () => {
      const res = await request(app).get('/api/provincias/')
      expect(res.statusCode).toBe(400)
    })

    it('debe responder con un status code 400 si :code es invalido', async () => {
      const res = await request(app).get('/api/provincias/col')
      expect(res.statusCode).toBe(400)
    })

    it('debe responder con un objeto con la propiedad ', async () => {
      const res = await request(app).get('/api/provincias/col')
      expect(res.statusCode).toBe(400)
    })
  })
  // tipo de respuesta === array,
  describe('Argentina', () => {
    it(':code = ar debe responder con un array con las provincias de Argentina', async () => {
      const res = await request(app)
        .get('/api/provincias/ar')
        .expect('Content-Type', /json/)
      expect(res.body).toEqual(ar_provinces)
      expect(res.statusCode).toBe(200)
    })
  })

  describe('México', () => {
    it(':code = ar debe responder con un array con los estados de México', async () => {
      const res = await request(app)
        .get('/api/provincias/mx')
        .expect('Content-Type', /json/)
      expect(res.body).toEqual(mx_states)
      expect(res.statusCode).toBe(200)
    })
  })

  describe('Uruguay', () => {
    it(':code = ar debe responder con un array con los departamentos de Uruguay', async () => {
      const res = await request(app)
        .get('/api/provincias/uy')
        .expect('Content-Type', /json/)
      expect(res.body).toEqual(uy_departments)
      expect(res.statusCode).toBe(200)
    })
  })
})

describe('/api/ciudad/:code/:region', () => {
  // si noCode o :code invalid responde con un bad request status code 400
  // si bad request response con un obj que tiene una propiedad message.
  //status code 200
  // debe responder con un tipo array de objetos que tienen las propiedades NOMBRE - LONGITUDE - LATITUDE
  // array con nombres de ciudades.
})

describe('/api/servicios', () => {
  //status code 200
  //devuelve un array de strings con los servicios en DBFILL
})

describe('/api/proveedor', () => {
  describe('get proveedores', () => {
    //status code 200
    // devuelve un array con objetos que tiene props id, nombre, mail, imagen, fecha de nac, ciudad, provincia, pais y servicio. En el caso de uruguay para 2da entrega.
  })

  describe('get proveedor by ID', () => {
    //status code 404
    //devuelve un objeto con el message not found
    //status code 200
    // devuelve un objeto que tiene props id, nombre, mail, imagen, fecha de nac, ciudad, provincia, pais y servicio. En el caso de uruguay para la 2da entrega.
  })

  describe('post crear proveedor', () => {
    //status code 201
    // devuelve un objeto con el mensaje message: proveedor creado
    // crea/sube un nuevo proveedor a la base de datos.
    //repite datos de proveedor por la cantidad de serivicios que ofrece.
  })
})

xit('should reply the POST method /bodyData with status code 400 if data not send', async () => {
  const res = await request(app).post('/bodyData')
  expect(res.statusCode).toBe(400)
})

xit('should reply the POST method /bodyData with status code 200 if data is send', async () => {
  const res = await request(app).post('/bodyData').send({ arg1: 3, arg2: 7 })
  expect(res.statusCode).toBe(200)
})

xit('should reply the GET method /queryData with status code 400 if query not send', async () => {
  const res = await request(app).get('/queryDataSend')
  expect(res.statusCode).toBe(400)
})

xit('should reply the GET method /queryData with the query if provided (res.send)', async () => {
  const res = await request(app).get('/queryDataSend?q=henry')
  expect(res.statusCode).toBe(200)
  expect(res.text).toBe('henry')
})

xit('should reply the GET method /queryData with the query if provided (res.json)', async () => {
  const res = await request(app).get('/queryDataJson?q=henry')
  expect(res.statusCode).toBe(200)
  expect(res.body).toBe('henry')
})

xit('should reply the GET method /paramsData with status code 400 if params is not a number', async () => {
  const res = await request(app).get('/paramsData/Franco')
  expect(res.statusCode).toBe(400)
})

xit('should reply the GET method /paramsData with the number passed and msg with OK text', async () => {
  const res = await request(app).get('/paramsData/7')
  expect(res.statusCode).toBe(200)
  expect(res.body).toEqual({ id: 7, msg: 'OK' })
})

xit('should reply the GET method /image with status code 200', async () => {
  const res = await request(app).get('/image')
  expect(res.statusCode).toBe(200)
})

xit('should reply the GET method /image with content type image', async () => {
  const res = await request(app)
    .get('/image')
    .expect('Content-Type', 'image/jpeg')
})

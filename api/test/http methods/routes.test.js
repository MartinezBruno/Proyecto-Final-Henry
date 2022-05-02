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
  xdescribe(':code no existe o es invalido', () => {
    it('debe responder con un status code 400 si no existe :code', async () => {
      const res = await request(app).get('/api/provincias/')
      expect(res.statusCode).toBe(400)
    })

    it('debe responder con un status code 400 si :code es invalido', async () => {
      const res = await request(app).get('/api/provincias/col')
      expect(res.statusCode).toBe(400)
    })

    it('debe responder con un objeto con la propiedad msg si existe algun error con :code ', async () => {
      const res = await request(app).get('/api/provincias/col')
      expect(res.statusCode).toBe(400)
      expect(res.body).toEqual({
        msg: 'No se ha enviado el código de país o el código es inexistente',
      })
    })
  })

  describe('Argentina', () => {
    it(':code = ar debe responder con un array con las provincias de Argentina', async () => {
      const res = await request(app)
        .get('/api/provincias/ar')
        .expect('Content-Type', /json/)
      expect(res.statusCode).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
      expect(res.body).toEqual(ar_provinces)
    })
  })

  describe('México', () => {
    it(':code = ar debe responder con un array con los estados de México', async () => {
      const res = await request(app)
        .get('/api/provincias/mx')
        .expect('Content-Type', /json/)
      expect(res.statusCode).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
      expect(res.body).toEqual(mx_states)
    })
  })

  describe('Uruguay', () => {
    it(':code = ar debe responder con un array con los departamentos de Uruguay', async () => {
      const res = await request(app)
        .get('/api/provincias/uy')
        .expect('Content-Type', /json/)
      expect(res.statusCode).toBe(200)
      expect(res.body).toBeInstanceOf(Array)
      expect(res.body).toEqual(uy_departments)
    })
  })
})

describe('/api/ciudad/:code/:region', () => {
  xdescribe(':code no existe o es invalido', () => {
    it('debe responder con un status code 400 si no existe :code ni :region', async () => {
      const res = await request(app).get('/api/ciudad/')
      expect(res.statusCode).toBe(400)
    })

    it('debe responder con un status code 400 si :code o :region son invalidos', async () => {
      const res = await request(app).get('/api/ciudad/col/merina')
      expect(res.statusCode).toBe(400)
    })

    it('debe responder con un objeto con la propiedad msg si existe algun error con :code o :region ', async () => {
      const res = await request(app).get('/api/ciudad/col/merina')
      expect(res.statusCode).toBe(400)
      expect(res.body).toEqual({
        msg: 'No se ha enviado correctamente el código de país o la región',
      })
    })
  })

  xdescribe('/api/ciudad/ar/misiones', () => {
    it('debe responder con un array de objetos con las propiedades "nombre", "latitude" y "longitude", obteniendo tambien los nombres de las ciudades', async () => {
      const res = await request(app)
        .get('/api/ciudad/ar/misiones')
        .expect('Content-Type', /json/)
      expect(res.statusCode).toBe(200)
      expect(res.body).toMatchObject([
        {
          nombre: 'Departamento de Apostoles',
          latitude: '-27.91666985',
          longitude: '-55.75000000',
        },
      ])
    })
  })
})

describe('/api/servicios', () => {
  //status code 200
  //devuelve un array de strings con los servicios en DBFILL
  it('debe responder con un array de servicios que ofrece la app', async () => {
    const res = await request(app)
      .get('/api/servicios')
      .expect('Content-Type', /json/)
    expect(res.statusCode).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body).toEqual([
      'Cerrajeria',
      'Cuidado de niños',
      'Jardineria',
      'Limpieza de hogares',
      'Mantenimiento de piletas',
      'Plomeria',
      'Profesor de Fisica',
      'Profesor de Fisica',
      'Profesor de Ingles',
      'Profesor de Ingles',
      'Profesor de Matematicas',
      'Profesor de Matematicas',
      'Profesor de Quimica',
      'Profesor de Quimica',
      'Servicio de mudanza',
      'Sin servicios disponibles',
    ])
  })
})

xdescribe('/api/proveedor', () => {
  describe('get proveedores', () => {
    //En el caso de uruguay para 2da entrega.
    //despues podemos testear el tipo de dato de cada propiedad del objeto
    it('debe devolver un array de objetos con las propiedades id, nombre_apellido_proveedor, email, imagen, fecha_nacimiento, calificacion, status, ciudad, provincia, pais y servicio', async () => {
      const res = await request(app)
        .get('/api/proveedor')
        .expect('Content-Type', /json/)
      expect(res.statusCode).toBe(200)
      expect(res.body).toMatchObject([
        {
          id: 1,
          nombre_apellido_proveedor: 'Melisa Perez',
          email: 'melisa@gmail.com',
          imagen: 'https://i.pravatar.cc/300?u=melisaperez',
          fecha_nacimiento: '24-04-1980',
          calificacion: [],
          status: 'Proveedor',
          ciudad: 'Departamento de Alumine',
          provincia: 'Neuquen',
          pais: 'Argentina',
          servicio: {
            id: 1,
            nombre: 'Sin servicios disponibles',
            remote: true,
            precio: 473,
            descripcion: 'Lorem ipsum',
          },
        },
      ])
    })
  })

  xdescribe('get proveedor by ID', () => {
    //status code 404
    //devuelve un objeto con el message not found
    //status code 200
    // devuelve un objeto que tiene props id, nombre, mail, imagen, fecha de nac, ciudad, provincia, pais y servicio. En el caso de uruguay para la 2da entrega.
  })

  //   xdescribe('post crear proveedor', async () => {
  //     //status code 201
  //     // devuelve un objeto con el mensaje message: proveedor creado
  //     // crea/sube un nuevo proveedor a la base de datos.
  //     //repite datos de proveedor por la cantidad de serivicios que ofrece.
  //     const res = await request(app)
  //       .post('/api/proveedor')
  //       .send({
  //         nombre: 'Pedro',
  //         apellido: 'Martinez',
  //         password: '1234',
  //         email: 'pedro@gmail.com',
  //         imagen: 'https://thispersondoesnotexist.com/',
  //         fecha_nacimiento: '24-04-1988',
  //         pais: 'Argentina',
  //         servicios: [
  //           {
  //             NOMBRE_SERVICIO: 'Profesor de Matematicas',
  //             REMOTE: false,
  //             PRECIO: 500,
  //             DESCRIPCION: 'Matematicas nivel secundario',
  //           },
  //         ],
  //         provincia: 'Misiones',
  //         ciudad: 'Departamento de Apostoles',
  //       })
  //     expect(res.statusCode).toBe(201)
  //     expect(res.statusCode).toEqual({ msg: 'Proveedor creado' })
  //   })
  // })

  // xit('should reply the POST method /bodyData with status code 400 if data not send', async () => {
  //   const res = await request(app).post('/bodyData')
  //   expect(res.statusCode).toBe(400)
  // })

  // xit('should reply the POST method /bodyData with status code 200 if data is send', async () => {
  //   const res = await request(app).post('/bodyData').send({ arg1: 3, arg2: 7 })
  //   expect(res.statusCode).toBe(200)
  // })

  // xit('should reply the GET method /queryData with status code 400 if query not send', async () => {
  //   const res = await request(app).get('/queryDataSend')
  //   expect(res.statusCode).toBe(400)
  // })

  // xit('should reply the GET method /queryData with the query if provided (res.send)', async () => {
  //   const res = await request(app).get('/queryDataSend?q=henry')
  //   expect(res.statusCode).toBe(200)
  //   expect(res.text).toBe('henry')
  // })

  // xit('should reply the GET method /queryData with the query if provided (res.json)', async () => {
  //   const res = await request(app).get('/queryDataJson?q=henry')
  //   expect(res.statusCode).toBe(200)
  //   expect(res.body).toBe('henry')
  // })

  // xit('should reply the GET method /paramsData with status code 400 if params is not a number', async () => {
  //   const res = await request(app).get('/paramsData/Franco')
  //   expect(res.statusCode).toBe(400)
  // })

  // xit('should reply the GET method /paramsData with the number passed and msg with OK text', async () => {
  //   const res = await request(app).get('/paramsData/7')
  //   expect(res.statusCode).toBe(200)
  //   expect(res.body).toEqual({ id: 7, msg: 'OK' })
  // })

  // xit('should reply the GET method /image with status code 200', async () => {
  //   const res = await request(app).get('/image')
  //   expect(res.statusCode).toBe(200)
  // })

  // xit('should reply the GET method /image with content type image', async () => {
  //   const res = await request(app)
  //     .get('/image')
  //     .expect('Content-Type', 'image/jpeg')
  // })
})

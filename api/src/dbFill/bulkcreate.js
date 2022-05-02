const servicios = [
  { NOMBRE_SERVICIO: 'Sin servicios disponibles', REMOTE: true },
  { NOMBRE_SERVICIO: 'Profesor de Fisica', REMOTE: true },
  { NOMBRE_SERVICIO: 'Profesor de Fisica', REMOTE: false },
  { NOMBRE_SERVICIO: 'Profesor de Ingles', REMOTE: true },
  { NOMBRE_SERVICIO: 'Profesor de Ingles', REMOTE: false },
  { NOMBRE_SERVICIO: 'Profesor de Matematicas', REMOTE: true },
  { NOMBRE_SERVICIO: 'Profesor de Matematicas', REMOTE: false },
  { NOMBRE_SERVICIO: 'Profesor de Quimica', REMOTE: true },
  { NOMBRE_SERVICIO: 'Profesor de Quimica', REMOTE: false },
  { NOMBRE_SERVICIO: 'Jardineria', REMOTE: false },
  { NOMBRE_SERVICIO: 'Mantenimiento de piletas', REMOTE: false },
  { NOMBRE_SERVICIO: 'Servicio de mudanza', REMOTE: false },
  { NOMBRE_SERVICIO: 'Limpieza de hogares', REMOTE: false },
  { NOMBRE_SERVICIO: 'Cuidado de niños', REMOTE: false },
  { NOMBRE_SERVICIO: 'Plomeria', REMOTE: false },
  { NOMBRE_SERVICIO: 'Cerrajeria', REMOTE: false },
]

function random() {
  let random = Math.trunc(Math.random(0, 1) * 16)
  return random
}

let arrayRandom = []

for (let i = 0; i < 100; i++) {
  arrayRandom.push(random())
}

let arrayProveedores = [
  {
    nombre: 'Pedro',
    apellido: 'Martinez',
    password: '1234',
    email: 'pedro@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=pedromartinez',
    fecha_nacimiento: '24-04-1988',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: 'Profesor de Matematicas',
        REMOTE: false,
        PRECIO: 500,
        DESCRIPCION: 'Matematicas nivel secundario',
      },
    ],
    provincia: 'Misiones',
    ciudad: 'Departamento de Apostoles',
  },
  {
    nombre: 'Bruno',
    apellido: 'Gonzales',
    password: '1235',
    email: 'bruno@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=brunogonzalez',
    fecha_nacimiento: '24-04-1990',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: 'Profesor de Fisica',
        REMOTE: true,
        PRECIO: 700,
        DESCRIPCION: 'Fisica nivel secundario y universitario',
      },
      {
        NOMBRE_SERVICIO: 'Profesor de Quimica',
        REMOTE: true,
        PRECIO: 700,
        DESCRIPCION: 'quimica general',
      },
    ],
    provincia: 'Neuquen',
    ciudad: 'Departamento de Alumine',
  },
  {
    nombre: 'Martin',
    apellido: 'Tincho',
    password: '1236',
    email: 'martin@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=martintincho',
    fecha_nacimiento: '24-04-1980',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: 'Jardineria',
        REMOTE: false,
        PRECIO: 3000,
        DESCRIPCION: 'Mantenimiento integral de patios',
      },
      {
        NOMBRE_SERVICIO: 'Plomeria',
        REMOTE: false,
        PRECIO: 3000,
        DESCRIPCION: 'Plomeria general',
      },
    ],
    provincia: 'Neuquen',
    ciudad: 'Departamento de Alumine',
  },
  {
    nombre: 'Juan',
    apellido: 'Gonzales',
    password: '1235',
    email: 'juan@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=juangonzales',
    fecha_nacimiento: '24-04-1980',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: 'Servicio de mudanza',
        REMOTE: false,
        PRECIO: 10000,
        DESCRIPCION: 'Mudanzas',
      },
      {
        NOMBRE_SERVICIO: 'Plomeria',
        REMOTE: false,
        PRECIO: 3000,
        DESCRIPCION: 'Plomeria general',
      },
    ],
    provincia: 'Neuquen',
    ciudad: 'Departamento de Alumine',
  },
  {
    nombre: 'Melisa',
    apellido: 'Perez',
    password: '12354',
    email: 'melisa@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=melisaperez',
    fecha_nacimiento: '24-04-1980',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: servicios[0].NOMBRE_SERVICIO,
        REMOTE: servicios[0].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION: 'Lorem ipsum',
      },
      {
        NOMBRE_SERVICIO: servicios[1].NOMBRE_SERVICIO,
        REMOTE: servicios[0].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION: 'Lorem ipsum',
      },
    ],
    provincia: 'Neuquen',
    ciudad: 'Departamento de Alumine',
  },
  {
    nombre: 'Fede',
    apellido: 'Roque',
    password: '46546846',
    email: 'fede@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=federoque',
    fecha_nacimiento: '25-06-1987',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: servicios[2].NOMBRE_SERVICIO,
        REMOTE: servicios[2].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION: 'Lorem ipsum',
      },
      {
        NOMBRE_SERVICIO: servicios[3].NOMBRE_SERVICIO,
        REMOTE: servicios[3].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION: 'Lorem ipsum',
      },
    ],
    provincia: 'Provincia de Buenos Aires',
    ciudad: 'Partido de Bahia Blanca',
  },
  {
    nombre: 'Bruno',
    apellido: 'Beltramone',
    password: '465468asdf46',
    email: 'brunobeltra@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=brunobeltra',
    fecha_nacimiento: '25-06-1987',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: servicios[4].NOMBRE_SERVICIO,
        REMOTE: servicios[4].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION: 'Lorem ipsum',
      },
      {
        NOMBRE_SERVICIO: servicios[4].NOMBRE_SERVICIO,
        REMOTE: servicios[4].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION: 'Lorem ipsum',
      },
    ],
    provincia: 'Provincia de Buenos Aires',
    ciudad: 'Partido de La Plata',
  },
  {
    nombre: 'Santiago',
    apellido: 'Bojanich',
    password: '4654sdf46',
    email: 'santiboja@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=santiboja',
    fecha_nacimiento: '25-06-1987',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: servicios[5].NOMBRE_SERVICIO,
        REMOTE: servicios[5].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION: 'Lorem ipsum',
      },
      {
        NOMBRE_SERVICIO: servicios[6].NOMBRE_SERVICIO,
        REMOTE: servicios[6].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION: 'Lorem ipsum',
      },
      {
        NOMBRE_SERVICIO: servicios[7].NOMBRE_SERVICIO,
        REMOTE: servicios[7].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION: 'Lorem ipsum',
      },
    ],
    provincia: 'Provincia de Buenos Aires',
    ciudad: 'Partido de La Plata',
  },
  {
    nombre: 'Maximiliano',
    apellido: 'Candia',
    password: '465asdfasdf',
    email: 'max@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=maxi',
    fecha_nacimiento: '25-06-1987',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: servicios[8].NOMBRE_SERVICIO,
        REMOTE: servicios[8].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[9].NOMBRE_SERVICIO,
        REMOTE: servicios[9].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[10].NOMBRE_SERVICIO,
        REMOTE: servicios[10].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
    ],
    provincia: 'Misiones',
    ciudad: 'Departamento de Posadas',
  },
  {
    nombre: 'Oscar',
    apellido: 'Rodriguez',
    password: '5a4sdfasdf',
    email: 'oscar@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=oscarrod',
    fecha_nacimiento: '25-06-1987',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: servicios[11].NOMBRE_SERVICIO,
        REMOTE: servicios[11].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[12].NOMBRE_SERVICIO,
        REMOTE: servicios[12].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[13].NOMBRE_SERVICIO,
        REMOTE: servicios[13].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
    ],
    provincia: 'Misiones',
    ciudad: 'Departamento de Posadas',
  },
  {
    nombre: 'George',
    apellido: 'Harrison',
    password: '5a4sdfasasdfdf',
    email: 'george@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=georgecarrison',
    fecha_nacimiento: '25-06-1987',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: servicios[14].NOMBRE_SERVICIO,
        REMOTE: servicios[14].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[15].NOMBRE_SERVICIO,
        REMOTE: servicios[15].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[1].NOMBRE_SERVICIO,
        REMOTE: servicios[1].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
    ],
    provincia: 'Provincia de Buenos Aires',
    ciudad: 'Partido de La Plata',
  },
  {
    nombre: 'Paul',
    apellido: 'Mc Cartney',
    password: '5a4sasdfasasdfdf',
    email: 'paul@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=paulmccartney',
    fecha_nacimiento: '25-06-1987',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: servicios[2].NOMBRE_SERVICIO,
        REMOTE: servicios[2].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[3].NOMBRE_SERVICIO,
        REMOTE: servicios[3].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[5].NOMBRE_SERVICIO,
        REMOTE: servicios[5].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
    ],
    provincia: 'Provincia de Buenos Aires',
    ciudad: 'Partido de La Plata',
  },
  {
    nombre: 'Ringo',
    apellido: 'Star',
    password: '5a4sasdfasasdfddsf',
    email: 'ringo@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=ringostar',
    fecha_nacimiento: '25-06-1987',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: servicios[5].NOMBRE_SERVICIO,
        REMOTE: servicios[5].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[5].NOMBRE_SERVICIO,
        REMOTE: servicios[5].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[6].NOMBRE_SERVICIO,
        REMOTE: servicios[6].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
    ],
    provincia: 'Provincia de Buenos Aires',
    ciudad: 'Partido de Bahia Blanca',
  },
  {
    nombre: 'Tim',
    apellido: 'Burton',
    password: '5a4sasdasdffasasdfddsf',
    email: 'tim@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=timburton',
    fecha_nacimiento: '25-06-1987',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: servicios[6].NOMBRE_SERVICIO,
        REMOTE: servicios[6].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[8].NOMBRE_SERVICIO,
        REMOTE: servicios[8].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[7].NOMBRE_SERVICIO,
        REMOTE: servicios[7].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
    ],
    provincia: 'Provincia de Buenos Aires',
    ciudad: 'Partido de Bahia Blanca',
  },
  {
    nombre: 'Jesus',
    apellido: 'de Nazaret',
    password: '5a4sasdaasdfddsf',
    email: 'jesus@gmail.com',
    imagen: 'https://i.pravatar.cc/300?u=jesus',
    fecha_nacimiento: '25-06-1987',
    pais: 'Argentina',
    servicios: [
      {
        NOMBRE_SERVICIO: servicios[10].NOMBRE_SERVICIO,
        REMOTE: servicios[10].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[5].NOMBRE_SERVICIO,
        REMOTE: servicios[5].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
      {
        NOMBRE_SERVICIO: servicios[3].NOMBRE_SERVICIO,
        REMOTE: servicios[3].REMOTE,
        PRECIO: Math.trunc(Math.random(0, 1) * 1000),
        DESCRIPCION:
          'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
      },
    ],
    provincia: 'Provincia de Buenos Aires',
    ciudad: 'Partido de La Plata',
  },
]

module.exports = {
  arrayProveedores,
}

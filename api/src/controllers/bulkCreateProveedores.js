const {
  Proveedor,
  Servicio,
  Ciudad,
  Provincia,
  Pais,
  Precio,
  Proveedor_Servicio,
  Descripcion,
} = require('../db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const bulkCreate = async (req, res) => {
  let arrayProveedores = [
    {
      nombre: 'Pedro',
      apellido: 'Martinez',
      password: '1234',
      email: 'pedro@gmail.com',
      imagen: 'https://i.pravatar.cc/300?u=pedro',
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
      imagen: 'https://i.pravatar.cc/300?u=bruno',
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
      imagen: 'https://i.pravatar.cc/300?u=martin',
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
      imagen: 'https://i.pravatar.cc/300?u=juan',
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
  ]

  for (let i = 0; i < arrayProveedores.length; i++) {
    arrayProveedores[i].servicios?.length === 0 ||
    arrayProveedores[i].servicios == null
      ? (arrayProveedores[i].servicios = [
          {
            NOMBRE_SERVICIO: 'Sin servicios disponibles',
            REMOTE: true,
            PRECIO: NaN,
            DESCRIPCION: '',
          },
        ])
      : arrayProveedores.servicios
  }

  let arrayServiciosTotal = []
  for (let i = 0; i < arrayProveedores.length; i++) {
    let arrayServicios = arrayProveedores[i].servicios.map((servicio) => {
      return {
        NOMBRE_SERVICIO: servicio.NOMBRE_SERVICIO,
        REMOTE: servicio.REMOTE ? true : false,
      }
    })
    arrayServiciosTotal.push(arrayServicios)
  }

  console.log(arrayServiciosTotal)

  let arrayPreciosTotal = []
  for (let i = 0; i < arrayProveedores.length; i++) {
    let arrayPrecios = arrayProveedores[i].servicios.map(
      (servicio) => servicio.PRECIO
    )
    arrayPreciosTotal.push(arrayPrecios)
  }

  console.log(arrayPreciosTotal)

  let arrayDescripcionTotal = []
  for (let i = 0; i < arrayProveedores.length; i++) {
    let arrayDescripcion = arrayProveedores[i].servicios.map(
      (servicio) => servicio.DESCRIPCION
    )
    arrayDescripcionTotal.push(arrayDescripcion)
  }

  console.log(arrayDescripcionTotal)

  for (let i = 0; i < arrayProveedores.length; i++) {
    let newProveedor = await Proveedor.create({
      NOMBRE_APELLIDO_PROVEEDOR: `${arrayProveedores[i].nombre} ${arrayProveedores[i].apellido}`,
      PASSWORD: arrayProveedores[i].password,
      EMAIL: arrayProveedores[i].email,
      IMAGEN: arrayProveedores[i].imagen,
      FECHA_NACIMIENTO: arrayProveedores[i].fecha_nacimiento,
    })

    let serviciosDisp = await Servicio.findAll({
      where: {
        [Op.or]: arrayServiciosTotal[i],
      },
    })

    let paisDisp = await Pais.findOne({
      where: { NOMBRE_PAIS: arrayProveedores[i].pais },
    })

    let provinciasDisp = await Provincia.findOne({
      where: { NOMBRE_PROVINCIA: arrayProveedores[i].provincia },
    })

    let ciudadesDisp = await Ciudad.findOne({
      where: { NOMBRE_CIUDAD: arrayProveedores[i].ciudad },
    })

    newProveedor.addServicios(serviciosDisp)
    newProveedor.setPai(paisDisp)
    newProveedor.setProvincium(provinciasDisp)
    newProveedor.setCiudad(ciudadesDisp)

    for (let j = 0; j < arrayPreciosTotal[i].length; j++) {
      let p = await Precio.create({
        PRECIO: arrayPreciosTotal[i][j],
      })
      let proovedor = await Proveedor.findOne({
        where: { EMAIL: arrayProveedores[i].email },
      })
      let servicio = await Servicio.findOne({
        where: {
          NOMBRE_SERVICIO: arrayServiciosTotal[i][j].NOMBRE_SERVICIO,
          REMOTE: arrayServiciosTotal[i][j].REMOTE,
        },
      })
      let proveedor_servicio = await Proveedor_Servicio.findOne({
        where: {
          ProveedorId: proovedor.id,
          ServicioId: servicio.id,
        },
      })
      proveedor_servicio.setPrecio(p)
    }

    for (let j = 0; j < arrayDescripcionTotal[i].length; j++) {
      let d = await Descripcion.create({
        DESCRIPCION: arrayDescripcionTotal[i][j],
      })
      let proovedor = await Proveedor.findOne({
        where: { EMAIL: arrayProveedores[i].email },
      })
      let servicio = await Servicio.findOne({
        where: {
          NOMBRE_SERVICIO: arrayServiciosTotal[i][j].NOMBRE_SERVICIO,
          REMOTE: arrayServiciosTotal[i][j].REMOTE,
        },
      })
      let proveedor_servicio = await Proveedor_Servicio.findOne({
        where: {
          ProveedorId: proovedor.id,
          ServicioId: servicio.id,
        },
      })
      proveedor_servicio.setDescripcion(d)
    }
  }

  return res.status(201).send('Proveedores Bulkcreados')
}

module.exports = {
  bulkCreate,
}

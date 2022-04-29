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

const createProv = async (req, res) => {
  let {
    nombre,
    apellido,
    password,
    email,
    imagen,
    fecha_nacimiento,
    servicios,
    pais,
    provincia,
    ciudad,
  } = req.body

  servicios?.length === 0 || servicios == null
    ? (servicios = [
        {
          NOMBRE_SERVICIO: 'Sin servicios disponibles',
          REMOTE: true,
          PRECIO: NaN,
          DESCRIPCION: '',
        },
      ])
    : servicios

  let arrayServicios = servicios.map((servicio) => {
    return {
      NOMBRE_SERVICIO: servicio.NOMBRE_SERVICIO,
      REMOTE: servicio.REMOTE ? true : false,
    }
  })

  let arrayPrecios = servicios.map((servicio) => servicio.PRECIO)
  let arrayDescripcion = servicios.map((servicio) => servicio.DESCRIPCION)

  let newProveedor = await Proveedor.create({
    NOMBRE_APELLIDO_PROVEEDOR: `${nombre} ${apellido}`,
    PASSWORD: password,
    EMAIL: email,
    IMAGEN: imagen,
    FECHA_NACIMIENTO: fecha_nacimiento,
  })

  let serviciosDisp = await Servicio.findAll({
    where: {
      [Op.or]: arrayServicios,
    },
  })

  let paisDisp = await Pais.findOne({
    where: { NOMBRE_PAIS: pais },
  })

  let provinciasDisp = await Provincia.findOne({
    where: { NOMBRE_PROVINCIA: provincia },
  })

  let ciudadesDisp = await Ciudad.findOne({
    where: { NOMBRE_CIUDAD: ciudad },
  })

  newProveedor.addServicios(serviciosDisp)
  newProveedor.setPai(paisDisp)
  newProveedor.setProvincium(provinciasDisp)
  newProveedor.setCiudad(ciudadesDisp)

  for (let i = 0; i < arrayPrecios.length; i++) {
    let p = await Precio.create({
      PRECIO: arrayPrecios[i],
    })
    let proovedor = await Proveedor.findOne({ where: { EMAIL: email } })
    let servicio = await Servicio.findOne({
      where: {
        NOMBRE_SERVICIO: arrayServicios[i].NOMBRE_SERVICIO,
        REMOTE: arrayServicios[i].REMOTE,
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

  for (let i = 0; i < arrayDescripcion.length; i++) {
    let d = await Descripcion.create({
      DESCRIPCION: arrayDescripcion[i],
    })
    let proovedor = await Proveedor.findOne({ where: { EMAIL: email } })
    let servicio = await Servicio.findOne({
      where: {
        NOMBRE_SERVICIO: arrayServicios[i].NOMBRE_SERVICIO,
        REMOTE: arrayServicios[i].REMOTE,
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

  res.status(201).send('Proveedor creado')
}

const getProv = async (req, res, next) => {
  try {
    let proveedorServ = await Proveedor_Servicio.findAll({
      attributes: ['ServicioId', 'ProveedorId', 'PrecioId', 'DescripcionId'],
      include: [
        {
          model: Precio,
          attributes: ['PRECIO'],
        },
        {
          model: Descripcion,
          attributes: ['DESCRIPCION'],
        },
      ],
    })

    proveedorServ = proveedorServ.map((el) => {
      return {
        ServicioId: el.ServicioId,
        ProveedorId: el.ProveedorId,
        PrecioId: el.PrecioId,
        Precio: el.Precio.PRECIO,
        Descripcion: el.Descripcion.DESCRIPCION,
      }
    })

    let ProveedoresAMostrar = []

    for (let i = 0; i < proveedorServ.length; i++) {
      let servicio = await Servicio.findByPk(proveedorServ[i].ServicioId)
      let proveedor = await Proveedor.findOne({
        where: { id: proveedorServ[i].ProveedorId },
        include: [
          {
            model: Pais,
            attributes: ['NOMBRE_PAIS'],
          },
          {
            model: Provincia,
            attributes: ['NOMBRE_PROVINCIA'],
          },
          {
            model: Ciudad,
            attributes: ['NOMBRE_CIUDAD'],
          },
        ],
      })
      ProveedoresAMostrar.push({
        proveedor: proveedor,
        servicio: servicio,
        precio: proveedorServ[i].Precio,
        descripcion: proveedorServ[i].Descripcion,
      })
    }

    ProveedoresAMostrar = ProveedoresAMostrar.map((prov) => {
      return {
        id: prov.proveedor.id,
        nombre_apellido_proveedor: prov.proveedor.NOMBRE_APELLIDO_PROVEEDOR,
        email: prov.proveedor.EMAIL,
        imagen: prov.proveedor.IMAGEN,
        fehcha_nacimiento: prov.proveedor.FECHA_NACIMIENTO,
        calificacion: prov.proveedor.CALIFICACION,
        status: prov.proveedor.STATUS,
        ciudad: prov.proveedor.Ciudad
          ? prov.proveedor.Ciudad.NOMBRE_CIUDAD
          : 'Sin definir',
        provincia: prov.proveedor.Provincium
          ? prov.proveedor.Provincium.NOMBRE_PROVINCIA
          : 'Sin definir',
        pais: prov.proveedor.Pai.NOMBRE_PAIS,
        servicio: {
          id: prov.servicio.id,
          nombre: prov.servicio.NOMBRE_SERVICIO,
          remote: prov.servicio.REMOTE,
          precio: prov.precio,
          descripcion: prov.descripcion,
        },
      }
    })

    return res.status(200).send(ProveedoresAMostrar)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

module.exports = {
  createProv,
  getProv,
}

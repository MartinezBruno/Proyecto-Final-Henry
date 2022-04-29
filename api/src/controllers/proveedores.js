const {
  Proveedor,
  Servicio,
  Ciudad,
  Provincia,
  Pais,
  Precio,
  Proveedor_Servicio,
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

  res.status(201).send('Proveedor creado')
}

const getProv = async (req, res, next) => {
  try {
    let proveedorServ = await Proveedor_Servicio.findAll({
      attributes: ['ServicioId', 'ProveedorId', 'PrecioId'],
      include: [
        {
          model: Precio,
          attributes: ['PRECIO'],
        },
      ],
    })

    proveedorServ = proveedorServ.map((el) => {
      return {
        ServicioId: el.ServicioId,
        ProveedorId: el.ProveedorId,
        PrecioId: el.PrecioId,
        Precio: el.Precio.PRECIO,
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
        },
      }
    })

    return res.status(200).send(ProveedoresAMostrar)
  } catch (error) {
    console.error(error)
    next(error)
  }
}

const getProvByID = async (req, res, next) => {
  const { id } = req.params
  try {
    let proveedorServ = await Proveedor_Servicio.findAll({
      where: { ProveedorId: id },
      attributes: ['ServicioId', 'ProveedorId', 'PrecioId'],
      include: [
        {
          model: Precio,
          attributes: ['PRECIO'],
        },
      ],
    })

    let proveedorAMostrar = {}
    let servicios = []

    let proveedor = await Proveedor.findOne({
      where: { id: proveedorServ[0].ProveedorId },
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
    for (let i = 0; i < proveedorServ.length; i++) {
      let servicio = await Servicio.findByPk(proveedorServ[i].ServicioId)
      servicios.push({
        servicio: servicio,
        precio: proveedorServ[i].Precio,
      })
    }
    proveedorAMostrar = {
      id: proveedor.id,
      nombre_apellido_proveedor: proveedor.NOMBRE_APELLIDO_PROVEEDOR,
      email: proveedor.EMAIL,
      imagen: proveedor.IMAGEN,
      fehcha_nacimiento: proveedor.FECHA_NACIMIENTO,
      calificacion: proveedor.CALIFICACION,
      status: proveedor.STATUS,
      ciudad: proveedor.Ciudad ? proveedor.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
      provincia: proveedor.Provincium
        ? proveedor.Provincium.NOMBRE_PROVINCIA
        : 'Sin definir',
      pais: proveedor.Pai.NOMBRE_PAIS,
      servicios: servicios.map((servicio) => {
        return {
          id: servicio.servicio.id,
          nombre: servicio.servicio.NOMBRE_SERVICIO,
          remote: servicio.servicio.REMOTE,
          precio: servicio.precio.PRECIO,
        }
      }),
    }
    return res.send(proveedorAMostrar)
  } catch (error) {
    console.error(error.message)
    next(error)
    return res.status(404).send({ msg: 'Proveedor no encontrado' })
  }
}

module.exports = {
  createProv,
  getProv,
  getProvByID,
}

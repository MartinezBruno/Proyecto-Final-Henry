const {
  Proveedor,
  Servicio,
  Ciudad,
  Provincia,
  Pais,
  Precio,
  Proveedor_Servicio,
  Descripcion,
  Role,
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
  
  let roleDisp = await Role.findOne({
    where: {id: 2}
  })
  
  newProveedor.addRole(roleDisp)
  newProveedor.addServicios(serviciosDisp)
  newProveedor.setPai(paisDisp)
  newProveedor.setProvincium(provinciasDisp)
  newProveedor.setCiudad(ciudadesDisp)

  for (let i = 0; i < arrayPrecios.length; i++) {
    let [p, _created] = await Precio.findOrCreate({
      where: {
        PRECIO: arrayPrecios[i],
      },
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

  return res.status(201).send({ msg: 'Proveedor creado' })
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
        fecha_nacimiento: prov.proveedor.FECHA_NACIMIENTO,
        calificacion: prov.proveedor.CALIFICACION,
        status: prov.proveedor.STATUS,
        creation_date: prov.proveedor.createdAt,
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
        {
          model: Descripcion,
          attributes: ['DESCRIPCION'],
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
        descripcion: proveedorServ[i].Descripcion,
      })
    }
    proveedorAMostrar = {
      id: proveedor.id,
      nombre_apellido_proveedor: proveedor.NOMBRE_APELLIDO_PROVEEDOR,
      email: proveedor.EMAIL,
      imagen: proveedor.IMAGEN,
      fecha_nacimiento: proveedor.FECHA_NACIMIENTO,
      calificacion: proveedor.CALIFICACION,
      status: proveedor.STATUS,
      creation_date: proveedor.createdAt,
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
          descripcion: servicio.descripcion.DESCRIPCION,
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

const deleteServicio_Prov = async (req, res) => {
  const { provId, servId } = req.params

  let precioDisp = await Proveedor_Servicio.findOne({
    where: [{ ServicioId: servId, ProveedorId: provId }],
  })
  console.log(precioDisp)
  let precio = precioDisp.PrecioId
  let descripcionDisp = precioDisp.DescripcionId

  console.log(precio)
  console.log(descripcionDisp)

  await Descripcion.destroy({
    where: [{ id: descripcionDisp }],
  })

  await Precio.destroy({
    where: [{ id: precio }],
  })

  await Proveedor_Servicio.destroy({
    where: [{ ServicioId: servId, ProveedorId: provId }],
  })
  res.status(200).send('borrado')
}


const updateProvServices = async (req, res, next) => {
  const { id } = req.params
  const { servicios } = req.body
  try {
    let proveedor = await Proveedor.findByPk(id)
    if (!proveedor)
      return res.status(404).send({ msg: 'Proveedor no encontrado' })
    let arrayServicios = servicios.map((servicio) => {
      return {
        NOMBRE_SERVICIO: servicio.NOMBRE_SERVICIO,
        REMOTE: servicio.REMOTE ? true : false,
      }
    })

    let arrayPrecios = servicios.map((servicio) => servicio.PRECIO)
    let arrayDescripcion = servicios.map((servicio) => servicio.DESCRIPCION)

    let serviciosDisp = await Servicio.findAll({
      where: {
        [Op.or]: arrayServicios,
      },
    })

    proveedor.addServicios(serviciosDisp)

    for (let i = 0; i < arrayPrecios.length; i++) {
      let [p, created] = await Precio.findOrCreate({
        where: {
          PRECIO: arrayPrecios[i],
        },
      })
      let proovedor = await Proveedor.findOne({ where: { id: id } })
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
      let proovedor = await Proveedor.findOne({ where: { id: id } })
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
    return res.send(proveedor)
  } catch (error) {
    console.error(error)
    next(error)
  }
}
module.exports = {
  createProv,
  getProv,
  getProvByID,
  deleteServicio_Prov,
  updateProvServices,
}

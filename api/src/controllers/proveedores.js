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
  Pregunta,
  Usuario,
  Comentario,
  DuracionServicio,
  Ayuda
} = require('../db')
var bcrypt = require('bcryptjs')
const Sequelize = require('sequelize')
const Op = Sequelize.Op

const allProvs = async () => {
  let proveedorServ = await Proveedor_Servicio.findAll({
    attributes: ['ServicioId', 'ProveedorId', 'PrecioId', 'DescripcionId', 'DuracionServicioId'],
    include: [
      {
        model: Precio,
        attributes: ['PRECIO'],
      },
      {
        model: Descripcion,
        attributes: ['DESCRIPCION'],
      },
      {
        model: DuracionServicio,
        attributes: ['DURACION'],
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
      DuracionServicio: el.DuracionServicio.DURACION,
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
      duracion: proveedorServ[i].DuracionServicio,
    })
  }

  function promedio(calificaciones) {
    var suma = 0
    for (let i = 0; i < calificaciones.length; i++) {
      suma = suma + calificaciones[i]
    }
    let promedio = suma / calificaciones.length
    promedio = Math.round(promedio)
    return promedio
  }

  ProveedoresAMostrar = ProveedoresAMostrar.map((prov) => {
    if (prov.servicio.id !== 1) {
      return {
        id: prov.proveedor.id,
        nombre_apellido_proveedor: prov.proveedor.NOMBRE_APELLIDO_PROVEEDOR,
        email: prov.proveedor.EMAIL,
        imagen: prov.proveedor.IMAGEN,
        fecha_nacimiento: prov.proveedor.FECHA_NACIMIENTO,
        calificacion: promedio(prov.proveedor.CALIFICACION),
        serviciosCompletados: prov.proveedor.CALIFICACION.length,
        status: prov.proveedor.STATUS,
        creation_date: prov.proveedor.createdAt,
        ciudad: prov.proveedor.Ciudad ? prov.proveedor.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
        provincia: prov.proveedor.Provincium ? prov.proveedor.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
        pais: prov.proveedor.Pai.NOMBRE_PAIS,
        servicio: {
          id: prov.servicio.id,
          nombre: prov.servicio.NOMBRE_SERVICIO,
          remote: prov.servicio.REMOTE,
          precio: prov.precio,
          descripcion: prov.descripcion,
          duracionServicio: prov.duracion,
        },
        hora_inicio: prov.servicio.HORA_INICIO ? prov.proveedor.HORA_INICIO : 'Sin definir',
        hora_final: prov.servicio.HORA_FINAL ? prov.proveedor.HORA_FINAL : 'Sin definir',
      }
    }
    return null
  }).filter((prov) => prov !== null)

  return ProveedoresAMostrar
}

const getProv = async (req, res, next) => {
  const { idProv, idServ } = req.query
  if (!idProv && !idServ) {
    try {
      let proveedores = await allProvs()
      return res.status(200).send(proveedores)
    } catch (error) {
      console.error(error)
      next(error)
    }
  } else {
    try {
      let proveedores = await allProvs()
      proveedores = proveedores.filter((prov) => prov.id === idProv && prov.servicio.id === parseInt(idServ))
      let proveedorServicio = await Proveedor_Servicio.findAll({
        where: { ServicioId: idServ, ProveedorId: idProv },
      })
      if (proveedorServicio) {
        let preguntas = await Pregunta.findAll({
          where: { ProveedorServicioId: proveedorServicio[0].dataValues.id },
        })

        let preguntasAMostrar = []
        for (let i = 0; i < preguntas.length; i++) {
          let usuario = await Usuario.findOne({ where: { id: preguntas[i].UsuarioId } })
          preguntasAMostrar.unshift({
            id: preguntas[i].id,
            USUARIO_ID: usuario.id,
            USUARIO: usuario.NOMBRE_APELLIDO_USUARIO,
            PREGUNTA: preguntas[i].PREGUNTA,
            RESPUESTA: preguntas[i].RESPUESTA,
            horarioPregunta: Date(preguntas[i].createdAt),
            horarioRespuesta: Date(preguntas[i].updatedAt),
          })
        }
        // console.log(preguntasAMostrar)

        let Comentarios = await Comentario.findAll({
          where: { ProveedorServicioId: proveedorServicio[0].dataValues.id },
        })
        // console.log(Comentarios)

        let UsuarioComentario = []
        for (let i = 0; i < Comentarios.length; i++) {
          let usuario = await Usuario.findOne({ where: { id: Comentarios[i].UsuarioId } })
          UsuarioComentario.unshift({ id: Comentarios[i].id, USUARIO: usuario.NOMBRE_APELLIDO_USUARIO,USUARIO_ID: usuario.id, COMENTARIO: Comentarios[i].COMENTARIO })
        }

        proveedores = proveedores.map((prov) => {
          return {
            ...prov,
            preguntas: preguntasAMostrar,
            comentarios: UsuarioComentario,
          }
        })
      }
      return res.status(200).send(proveedores)
    } catch (error) {
      console.error(error)
      next(error)
    }
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
        {
          model: DuracionServicio,
          attributes: ['DURACION'],
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
        duracionServicio: proveedorServ[i].DuracionServicio,
      })
    }
    proveedorAMostrar = {
      id: proveedor.id,
      nombre_apellido_proveedor: proveedor.NOMBRE_APELLIDO_PROVEEDOR,
      email: proveedor.EMAIL,
      imagen: proveedor.IMAGEN,
      fecha_nacimiento: proveedor.FECHA_NACIMIENTO,
      celular: proveedor.CELULAR,
      calificacion: proveedor.CALIFICACION,
      creation_date: proveedor.createdAt,
      ciudad: proveedor.Ciudad ? proveedor.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
      provincia: proveedor.Provincium ? proveedor.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
      pais: proveedor.Pai ? proveedor.Pai.NOMBRE_PAIS : 'Sin definir',
      servicios: servicios.map((servicio) => {
        return {
          id: servicio.servicio.id,
          nombre: servicio.servicio.NOMBRE_SERVICIO,
          remote: servicio.servicio.REMOTE,
          precio: servicio.precio.PRECIO,
          descripcion: servicio.descripcion.DESCRIPCION,
          duracionServicio: servicio.duracionServicio.DURACION,
        }
      }),
      hora_inicio: proveedor.HORA_INICIO ? proveedor.HORA_INICIO : 'Sin definir',
      hora_final: proveedor.HORA_FINAL ? proveedor.HORA_FINAL : 'Sin definir',
    }
    return res.status(200).send(proveedorAMostrar)
  } catch (error) {
    next(error)
    return res.status(404).send({ msg: 'Proveedor no encontrado' })
  }
}

const deleteServicio_Prov = async (req, res) => {
  const { provId, servId } = req.params
  try {
    let precioDisp = await Proveedor_Servicio.findOne({
      where: [{ ServicioId: servId, ProveedorId: provId }],
    })

    let precio = precioDisp.PrecioId
    let descripcionDisp = precioDisp.DescripcionId
    let duracionDisp = precioDisp.DuracionServicioId

    await Descripcion.destroy({
      where: [{ id: descripcionDisp }],
    })

    await Precio.destroy({
      where: [{ id: precio }],
    })

    await DuracionServicio.destroy({
      where: [{ id: duracionDisp }],
    })

    await Proveedor_Servicio.destroy({
      where: [{ ServicioId: servId, ProveedorId: provId }],
    })

    let allServices = await Proveedor_Servicio.findAll({
      where: { ProveedorId: provId },
    })

    if (allServices[0] === undefined) {
      let proveedor = await Proveedor.findOne({
        where: { id: provId },
      })

      let servicio = {
        NOMBRE_SERVICIO: 'Sin servicios disponibles',
        REMOTE: true,
        PRECIO: NaN,
        DESCRIPCION: '',
        DURACION: '',
      }

      let serviciosDisp = await Servicio.findOne({
        where: {
          NOMBRE_SERVICIO: servicio.NOMBRE_SERVICIO,
          REMOTE: servicio.REMOTE,
        },
      })
      await proveedor.addServicio(serviciosDisp)

      let proveedor_servicio = await Proveedor_Servicio.findOne({
        where: {
          ProveedorId: proveedor.id,
          ServicioId: serviciosDisp.id,
        },
      })

      let p = await Precio.findOrCreate({
        PRECIO: servicio.PRECIO,
      })
      let d = await Descripcion.create({
        DESCRIPCION: servicio.DESCRIPCION,
      })
      let dur = await DuracionServicio.create({
        DURACION: servicio.DURACION,
      })

      await proveedor_servicio.setPrecio(p)
      await proveedor_servicio.setDescripcion(d)
      await proveedor_servicio.setDuracionServicio(dur)
    }

    return res.status(204).send({ msg: 'Servicio eliminado' })
  } catch (error) {
    next(error)
    return res.status(500).send(error)
  }
}

const addServicio_Prov = async (req, res, next) => {
  const { id } = req.params
  const { servicios } = req.body
  try {
    let proveedor = await Proveedor.findByPk(id)
    if (!proveedor) return res.status(404).send({ message: 'Proveedor no encontrado' })
    let arrayServicios = servicios.map((servicio) => {
      return {
        NOMBRE_SERVICIO: servicio.NOMBRE_SERVICIO,
        REMOTE: servicio.REMOTE ? true : false,
      }
    })

    let arrayPrecios = servicios.map((servicio) => servicio.PRECIO)
    let arrayDescripcion = servicios.map((servicio) => servicio.DESCRIPCION)
    let arrayDuration = servicios.map((servicio) => servicio.DURACION)

    let serviciosDisp = await Servicio.findAll({
      where: {
        [Op.or]: arrayServicios,
      },
    })

    proveedor.addServicios(serviciosDisp)

    for (let i = 0; i < arrayPrecios.length; i++) {
      let p = await Precio.create({
        PRECIO: arrayPrecios[i],
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

    for (let i = 0; i < arrayDuration.length; i++) {
      let dur = await DuracionServicio.create({
        DURACION: arrayDuration[i],
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
      proveedor_servicio.setDuracionServicio(dur)
    }
    return res.status(204).send({ message: 'Servicios agregados' })
  } catch (error) {
    next(error)
    return res.status(500).send(error)
  }
}

const filtroPorProfesion = async (req, res) => {
  const { service } = req.params

  try {
    let servicios = await Servicio.findOne({
      where: {
        NOMBRE_SERVICIO: service,
      },
    })
    // console.log(servicios)
    let servicioFilt = servicios.id
    //     console.log(servicios.id)
    let proveedorServ = await getProveedores()
    // console.log(proveedorServ)
    let provFiltered = proveedorServ.filter((prov) => prov.servicio.id === servicioFilt)
    return res.status(200).send(provFiltered)
  } catch (error) {
    next(error)
    return res.status(500).send(error)
  }
}

const filtroPorProvincia = async (req, res) => {
  const { provincia } = req.params

  try {
    let provincias = await Provincia.findOne({
      where: {
        NOMBRE_PROVINCIA: provincia,
      },
    })

    let filtProvincia = provincias.NOMBRE_PROVINCIA
    let proveedores = await getProveedores()
    let proveedorProvincia = proveedores.filter((provincia) => provincia.provincia === filtProvincia)
    // console.log(proveedorProvincia)
    return res.status(200).send(proveedorProvincia)
  } catch (error) {
    return res.status(500).send(error)
  }
}

const filtroProveedor = async (req, res, next) => {
  const { pais, provincia, ciudad, servicio, search, remote } = req.query
  function toBool(string) {
    if (string === 'Si') {
      return true
    } else {
      return false
    }
  }
  /////// SIN SEARCHBAR
  if (!search) {
    ////////////////////// REMOTE EN TODOS //////////////////////////////////
    // TODOS
    if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    // FILTRO DE A UNO
    if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio)
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.ciudad === ciudad)
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.provincia === provincia)
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.pais === pais)
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    //FILTRO DE A DOS
    if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.servicio.nombre === servicio)
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.provincia === provincia)
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.pais === pais && prov.provincia === provincia)
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.pais === pais && prov.servicio.nombre === servicio)
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.nombre === servicio)
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    // FILTRO DE A TRES
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.nombre === servicio && prov.ciudad === ciudad)
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais !== 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.pais === pais && prov.ciudad === ciudad)
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais !== 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.ciudad === ciudad)
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.provincia === provincia)
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    // FILTRO DE A CUATRO
    if (pais !== 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter(
          (prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.provincia === provincia && prov.ciudad === ciudad
        )
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }

    ////////////////////// REMOTE DISTINTO A TODOS //////////////////////////////////
    if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.servicio.remote === toBool(remote))
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    // FILTRO DE A UNO
    if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.pais === pais && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    //FILTRO DE A DOS
    if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.provincia === provincia && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.pais === pais && prov.provincia === provincia && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.pais === pais && prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    // FILTRO DE A TRES
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter(
          (prov) => prov.provincia === provincia && prov.servicio.nombre === servicio && prov.ciudad === ciudad && prov.servicio.remote === toBool(remote)
        )

        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais !== 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter(
          (prov) => prov.provincia === provincia && prov.pais === pais && prov.ciudad === ciudad && prov.servicio.remote === toBool(remote)
        )

        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais !== 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter(
          (prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.ciudad === ciudad && prov.servicio.remote === toBool(remote)
        )
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter(
          (prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.provincia === provincia && prov.servicio.remote === toBool(remote)
        )
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
    // FILTRO DE A CUATRO
    if (pais !== 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter(
          (prov) =>
            prov.servicio.nombre === servicio &&
            prov.pais === pais &&
            prov.provincia === provincia &&
            prov.ciudad === ciudad &&
            prov.servicio.remote === toBool(remote)
        )
        return res.status(200).send(proveedores)
      } catch (error) {
        next(error)
        return res.status(500).send(error)
      }
    }
  }
  //// CON SEARCHBAR
  if (search) {
    try {
      let proveedores = await allProvs()
      proveedores = proveedores.filter((prov) => prov.nombre_apellido_proveedor.toLowerCase().includes(search.toLowerCase()))
      // TODOS
      if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      // FILTRO DE A UNO
      if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio)
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.ciudad === ciudad)
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.provincia === provincia)
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.pais === pais)
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      //FILTRO DE A DOS
      if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.servicio.nombre === servicio)
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.provincia === provincia)
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.pais === pais && prov.provincia === provincia)
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.pais === pais && prov.servicio.nombre === servicio)
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.nombre === servicio)
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      // FILTRO DE A TRES
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.nombre === servicio && prov.ciudad === ciudad)
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.pais === pais && prov.ciudad === ciudad)
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais !== 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.ciudad === ciudad)
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.provincia === provincia)
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      // FILTRO DE A CUATRO
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter(
            (prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.provincia === provincia && prov.ciudad === ciudad
          )
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }

      ////////////////////// REMOTE DISTINTO A TODOS //////////////////////////////////
      if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.servicio.remote === toBool(remote))
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      // FILTRO DE A UNO
      if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.pais === pais && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      //FILTRO DE A DOS
      if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.provincia === provincia && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.pais === pais && prov.provincia === provincia && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.pais === pais && prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter(
            (prov) => prov.provincia === provincia && prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote)
          )

          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      // FILTRO DE A TRES
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter(
            (prov) => prov.provincia === provincia && prov.servicio.nombre === servicio && prov.ciudad === ciudad && prov.servicio.remote === toBool(remote)
          )

          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter(
            (prov) => prov.provincia === provincia && prov.pais === pais && prov.ciudad === ciudad && prov.servicio.remote === toBool(remote)
          )

          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais !== 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter(
            (prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.ciudad === ciudad && prov.servicio.remote === toBool(remote)
          )
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter(
            (prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.provincia === provincia && prov.servicio.remote === toBool(remote)
          )
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
      // FILTRO DE A CUATRO
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter(
            (prov) =>
              prov.servicio.nombre === servicio &&
              prov.pais === pais &&
              prov.provincia === provincia &&
              prov.ciudad === ciudad &&
              prov.servicio.remote === toBool(remote)
          )
          return res.status(200).send(proveedores)
        } catch (error) {
          next(error)
          return res.status(500).send(error)
        }
      }
    } catch (error) {
      next(error)
      return res.status(500).send(error)
    }
  }
}

const putProvider = async (req, res, next) => {
  const { id } = req.params
  const { nombre_apellido_proveedor, email, celular, fecha_nacimiento, hora_inicio, hora_final } = req.body
  try {
    const proveedor = await Proveedor.findByPk(id)
    proveedor === null
      ? res.status(404).send('No se encontró el proveedor')
      : await Proveedor.update(
          {
            NOMBRE_APELLIDO_PROVEEDOR: nombre_apellido_proveedor,
            EMAIL: email,
            CELULAR: celular,
            FECHA_NACIMIENTO: fecha_nacimiento,
            HORA_INICIO: hora_inicio,
            HORA_FINAL: hora_final,
          },
          { where: { id: id } }
        )
    return res.status(204).send({ message: 'Proveedor actualizado' })
  } catch (error) {
    console.error(error)
    return res.status(500).send(error)
  }
}


const createAyuda = async (req,res) => {
  let {proveedorId, asunto} = req.body
    
  let prov = await Proveedor.findByPk(proveedorId)
  //  console.log(prov)
   
  let ayudaCreate = await Ayuda.create({
    ASUNTO: asunto
  })

 ayudaCreate.setProveedor(prov.id)

 return res.status(200).send("Ayuda enviada Exitosamente")
}

const changePassword = async (req, res) => {
  const { id } = req.params
  const { newPassword, oldPassword } = req.body
  try {
    const providerEncontrado = await Proveedor.findOne({
      where: { id: id },
    })

    if (providerEncontrado === null) return res.status(404).send({ message: 'No se encontró un usuario con ese id' })

    const passwordIsValid = bcrypt.compareSync(oldPassword, providerEncontrado.PASSWORD)
    if (!passwordIsValid) {
      return res.status(401).send({
        message: '¡Contraseña incorrecta!',
      })
    }

    await Proveedor.update(
      {
        PASSWORD: bcrypt.hashSync(newPassword, 8),
      },
      { where: { id: id } }
    )
    return res.status(204).send({ message: 'Contraseña actualizada correctamente' })
  } catch (error) {
    console.error(error)
    return res.status(500).send({ message: 'Error al actualizar contraseña' })
  }
}

module.exports = {
  getProv,
  getProvByID,
  deleteServicio_Prov,
  addServicio_Prov,
  filtroPorProfesion,
  filtroPorProvincia,
  filtroProveedor,
  putProvider,
  createAyuda,
  changePassword,
}

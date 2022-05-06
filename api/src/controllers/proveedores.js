const { Proveedor, Servicio, Ciudad, Provincia, Pais, Precio, Proveedor_Servicio, Descripcion, Role, Pregunta, Usuario, Comentario} = require('../db')
const Sequelize = require('sequelize')
const Op = Sequelize.Op
const axios = require('axios')

const allProvs = async () => {
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
      ciudad: prov.proveedor.Ciudad ? prov.proveedor.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
      provincia: prov.proveedor.Provincium ? prov.proveedor.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
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
          preguntasAMostrar.push({id:preguntas[i].id, USUARIO: usuario.NOMBRE_APELLIDO_USUARIO, PREGUNTA: preguntas[i].PREGUNTA, RESPUESTA: preguntas[i].RESPUESTA, horarioPregunta: Date(preguntas[i].createdAt), horarioRespuesta: Date(preguntas[i].updatedAt)})
        }
        // console.log(preguntasAMostrar)
        
      
      
        let Comentarios = await Comentario.findAll({
        where: {ProveedorServicioId: proveedorServicio[0].dataValues.id, }
      })
      console.log(Comentarios)
      
      
      
      let UsuarioComentario = []
      for (let i = 0; i < Comentarios.length; i++) {
      let usuario = await Usuario.findOne({ where: { id: Comentarios[i].UsuarioId } })
       UsuarioComentario.push  ({id:  Comentarios[i].id , USUARIO: usuario.NOMBRE_APELLIDO_USUARIO, COMENTARIO: Comentarios[i].COMENTARIO})
    
      }
        
        
        proveedores = proveedores.map((prov) => {
          return {
            ...prov,
            preguntas: preguntasAMostrar,
            comentarios: UsuarioComentario
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
      creation_date: proveedor.createdAt,
      ciudad: proveedor.Ciudad ? proveedor.Ciudad.NOMBRE_CIUDAD : 'Sin definir',
      provincia: proveedor.Provincium ? proveedor.Provincium.NOMBRE_PROVINCIA : 'Sin definir',
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
    return res.status(200).send(proveedorAMostrar)
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

const addServicio_Prov = async (req, res, next) => {
  const { id } = req.params
  const { servicios } = req.body
  try {
    let proveedor = await Proveedor.findByPk(id)
    if (!proveedor) return res.status(404).send({ msg: 'Proveedor no encontrado' })
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

const filtroPorProfesion = async (req, res) => {
  const { service } = req.params
  console.log(service)

  let servicios = await Servicio.findOne({
    where: {
      NOMBRE_SERVICIO: service,
    },
  })
  console.log(servicios)
  let servicioFilt = servicios.id
  //     console.log(servicios.id)
  let proveedorServ = await getProveedores()
  console.log(proveedorServ)
  let provFiltered = proveedorServ.filter((prov) => prov.servicio.id === servicioFilt)
  return res.status(200).send(provFiltered)
}

const filtroPorProvincia = async (req, res) => {
  const { provincia } = req.params
  console.log(provincia)
  let provincias = await Provincia.findOne({
    where: {
      NOMBRE_PROVINCIA: provincia,
    },
  })
  console.log(provincias)
  let filtProvincia = provincias.NOMBRE_PROVINCIA
  let proveedores = await getProveedores()
  let proveedorProvincia = proveedores.filter((provincia) => provincia.provincia === filtProvincia)
  console.log(proveedorProvincia)
  return res.status(200).send(proveedorProvincia)
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
        console.error(error)
        next(error)
      }
    }
    // FILTRO DE A UNO
    if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio)
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.ciudad === ciudad)
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.provincia === provincia)
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.pais === pais)
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    //FILTRO DE A DOS
    if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.servicio.nombre === servicio)
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.provincia === provincia)
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.pais === pais && prov.provincia === provincia)
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.pais === pais && prov.servicio.nombre === servicio)
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.nombre === servicio)
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    // FILTRO DE A TRES
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.nombre === servicio && prov.ciudad === ciudad)
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais !== 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.pais === pais && prov.ciudad === ciudad)
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais !== 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.ciudad === ciudad)
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.provincia === provincia)
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
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
        console.error(error)
        next(error)
      }
    }

    ////////////////////// REMOTE DISTINTO A TODOS //////////////////////////////////
    if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.servicio.remote === toBool(remote))
        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    // FILTRO DE A UNO
    if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.pais === pais && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    //FILTRO DE A DOS
    if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.provincia === provincia && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.pais === pais && prov.provincia === provincia && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.pais === pais && prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
      }
    }
    if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
      try {
        let proveedores = await allProvs()
        proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

        return res.status(200).send(proveedores)
      } catch (error) {
        console.error(error)
        next(error)
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
        console.error(error)
        next(error)
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
        console.error(error)
        next(error)
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
        console.error(error)
        next(error)
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
        console.error(error)
        next(error)
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
        console.error(error)
        next(error)
      }
    }
  }
  //// CON SEARCHBAR
  if (search) {
    try {
      let proveedores = await allProvs()
      proveedores = proveedores.filter(
        (prov) =>
          prov.servicio.nombre.toLowerCase().includes(search.toLowerCase()) || prov.nombre_apellido_proveedor.toLowerCase().includes(search.toLowerCase())
      )
      // TODOS
      if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      // FILTRO DE A UNO
      if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio)
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.ciudad === ciudad)
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.provincia === provincia)
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.pais === pais)
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      //FILTRO DE A DOS
      if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.servicio.nombre === servicio)
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.provincia === provincia)
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.pais === pais && prov.provincia === provincia)
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.pais === pais && prov.servicio.nombre === servicio)
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.nombre === servicio)
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      // FILTRO DE A TRES
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.nombre === servicio && prov.ciudad === ciudad)
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.pais === pais && prov.ciudad === ciudad)
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais !== 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.ciudad === ciudad)
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote === 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.provincia === provincia)
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
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
          console.error(error)
          next(error)
        }
      }

      ////////////////////// REMOTE DISTINTO A TODOS //////////////////////////////////
      if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.servicio.remote === toBool(remote))
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      // FILTRO DE A UNO
      if (pais === 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.provincia === provincia && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.pais === pais && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      //FILTRO DE A DOS
      if (pais === 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.ciudad === ciudad && prov.provincia === provincia && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.pais === pais && prov.provincia === provincia && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais !== 'Todos' && provincia === 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter((prov) => prov.pais === pais && prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote))

          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais === 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter(
            (prov) => prov.provincia === provincia && prov.servicio.nombre === servicio && prov.servicio.remote === toBool(remote)
          )

          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
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
          console.error(error)
          next(error)
        }
      }
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad !== 'Todos' && servicio === 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter(
            (prov) => prov.provincia === provincia && prov.pais === pais && prov.ciudad === ciudad && prov.servicio.remote === toBool(remote)
          )

          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais !== 'Todos' && provincia === 'Todos' && ciudad !== 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter(
            (prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.ciudad === ciudad && prov.servicio.remote === toBool(remote)
          )
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
        }
      }
      if (pais !== 'Todos' && provincia !== 'Todos' && ciudad === 'Todos' && servicio !== 'Todos' && remote !== 'Todos') {
        try {
          proveedores = proveedores.filter(
            (prov) => prov.servicio.nombre === servicio && prov.pais === pais && prov.provincia === provincia && prov.servicio.remote === toBool(remote)
          )
          return res.status(200).send(proveedores)
        } catch (error) {
          console.error(error)
          next(error)
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
          console.error(error)
          next(error)
        }
      }
    } catch (error) {
      console.error(error)
      next(error)
    }
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
}

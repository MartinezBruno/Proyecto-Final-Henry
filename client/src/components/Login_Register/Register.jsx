import React, { useState, useEffect, useRef } from 'react'
import styles from '../../styles/register.module.css'
import { Modal, Button, Container, Row, Col } from 'react-bootstrap'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { providerRegister, rf, rs, userRegister } from '../../redux/slices/auth'
import { chargeCities, chargeProvinces } from '../../redux/slices/countriesData'
import { chargeAllUsers } from '../../redux/slices/user'
import { getAllProviders } from '../../redux/slices/provider'
import { v4 as uuidv4 } from 'uuid'
import api from '../../services/api'
import Swal from 'sweetalert2'
import 'animate.css'
import ReCAPTCHA from 'react-google-recaptcha'
import FacebookLogin from 'react-facebook-login'

export default function Register({ isModal }) {
  const { allProviders } = useSelector((state) => state.provider)
  const { allUsers } = useSelector((state) => state.user)
  let [termsAccepted, setTerms] = useState('disabled')
  let providersEmail = allProviders?.map((el) => el.email)
  let usersEmail = allUsers?.map((el) => el.email)
  let [termsAcceptedProvider, setTermsProvider] = useState('disabled')
  const { registerSuccess } = useSelector((state) => state.auth)
  const { mensaje } = useSelector((state) => state.message)
  const { provinces, cities, countries } = useSelector((state) => state.countriesData)

  const dispatch = useDispatch()

  const captcha = useRef(null)

  function onRecaptcha(e) {
    e.preventDefault(e)
    console.log('PASO CAPTCHA')
    // captcha.current.getValue()
  }

  function responseFacebook(e){
    let userName= e.name.split(' ')

    let userRegister = { 
      nombre: userName[0],
      apellido: userName[1],
      password: e.id, ///VERIFICAR
      email: e.email,
      imagen: e.picture.data.url,
      // fecha_nacimiento: "30-11-1960",
      // pais: "Argentina",
      // provincia: "Provincia de Buenos Aires",
      // ciudad: "Partido de La Plata",
      // celular: 2841282
    }
  api
    .post('/auth/usuario/signup', userRegister)
    .then((r) => {
      Swal.fire('¡Registrado con exito!', '', 'success')
    })
    .catch((err) => {
      Swal.fire('¡Ha ocurrido un error, intentalo nuevamente!', '', 'error')
    })

  }

  function responseFacebookProv(e){
    let userName= e.name.split(' ')

    let provRegister = { 
      nombre: userName[0],
      apellido: userName[1],
      password: e.id, ///VERIFICAR
      email: e.email,
      imagen: e.picture.data.url,
      // fecha_nacimiento: "30-11-1960",
      // pais: "Argentina",
      // provincia: "Provincia de Buenos Aires",
      // ciudad: "Partido de La Plata",
      // celular: 2841282
    }
  api
    .post('/auth/proveedor/signup', provRegister)
    .then((r) => {
      Swal.fire('¡Registrado con exito!', '', 'success')
    })
    .catch((err) => {
      Swal.fire('¡Ha ocurrido un error, intentalo nuevamente!', '', 'error')
    })

  }
  function facebookClicked(e){
    console.log('clicked:', e)
  }

  // Estado auxiliar para selects del pais/provincia/ciudad
  const [countriesInfo, setCountriesInfo] = useState({
    name: 'none',
    code: 'none',
    province: 'none',
    city: 'none',
    uruguayDone: false,
  })

  const [countriesInfoProvider, setCountriesInfoProvider] = useState({
    name: 'none',
    code: 'none',
    province: 'none',
    city: 'none',
    uruguayDone: false,
  })
  //Sacamos todos los proveedores/usuarios para filtrar su Email
  useEffect(() => {
    dispatch(getAllProviders())
    dispatch(chargeAllUsers())
  }, [dispatch])

  // Vinculamos hacer dispatch cuando hayan cambio en cierta propiedad -> USER
  useEffect(() => {
    if (countriesInfo.name !== 'none') {
      dispatch(chargeProvinces(countriesInfo.name))
    }
  }, [countriesInfo.name])

  useEffect(() => {
    if (countriesInfo.province !== 'none') {
      dispatch(chargeCities(countriesInfo.province))
    }
  }, [countriesInfo.province])

  // Vinculamos hacer dispatch cuando hayan cambio en cierta propiedad -> PROVIDER
  useEffect(() => {
    if (countriesInfoProvider.name !== 'none') {
      dispatch(chargeProvinces(countriesInfoProvider.name))
    }
  }, [countriesInfoProvider.name])

  useEffect(() => {
    if (countriesInfoProvider.province !== 'none') {
      dispatch(chargeCities(countriesInfoProvider.province))
    }
  }, [countriesInfoProvider.province])

  //FUNCION ESPECIAL PARA QUE A URUGUAY SE LE ASIGNE AUTOMATICAMENTE UNA CIUDAD "SIN DEFINIR" DE ACUERDO AL ID DE PROVINCIA -> USER
  function isUruguay() {
    setInput((prevState) => {
      return { ...prevState, ciudad: cities[0].NOMBRE_CIUDAD }
    })
    setCountriesInfo((prevState) => {
      return { ...prevState, uruguayDone: true }
    })
  }
  //FUNCION ESPECIAL PARA QUE A URUGUAY SE LE ASIGNE AUTOMATICAMENTE UNA CIUDAD "SIN DEFINIR" DE ACUERDO AL ID DE PROVINCIA -> PROVIDER
  function isUruguayProvider() {
    setInputProvider((prevState) => {
      return { ...prevState, ciudad: cities[0].NOMBRE_CIUDAD }
    })
    setCountriesInfoProvider((prevState) => {
      return { ...prevState, uruguayDone: true }
    })
  }

  //FUNCION QUE GUARDA EN UN ESTADO LOCAL LAS OPCIONES DE UBICACION SELECCIONADAS POR EL USUARIO
  function handleCountriesData(e) {
    if (e.target.name === 'pais') {
      let nombresPais = countries.map((el) => el.name)
      if (nombresPais.includes(e.target.value)) {
        let pais = countries.filter((el) => el.name === e.target.value)
        setCountriesInfo((prevState) => {
          return { ...prevState, name: e.target.value, code: pais[0].code }
        })
      }
    }

    if (e.target.name === 'provincia') {
      let nombresProvincias = provinces.map((el) => el.NOMBRE_PROVINCIA)
      if (nombresProvincias.includes(e.target.value)) {
        let provincia = provinces.filter((el) => el.NOMBRE_PROVINCIA === e.target.value)
        setCountriesInfo((prevState) => {
          return { ...prevState, province: provincia[0].NOMBRE_PROVINCIA }
        })
      }
    }

    if (e.target.name === 'ciudad') {
      let nombresCiudades = cities.map((el) => el.NOMBRE_CIUDAD)
      if (nombresCiudades.includes(e.target.value)) {
        let ciudad = cities.filter((el) => el.NOMBRE_CIUDAD === e.target.value)
        // console.log(ciudad)
        setCountriesInfo((prevState) => {
          return { ...prevState, city: ciudad[0].NOMBRE_CIUDAD }
        })
      }
    }
  }

  function handleCountriesDataProvider(e) {
    if (e.target.name === 'pais') {
      let nombresPais = countries.map((el) => el.name)
      if (nombresPais.includes(e.target.value)) {
        let pais = countries.filter((el) => el.name === e.target.value)
        setCountriesInfoProvider((prevState) => {
          return { ...prevState, name: e.target.value, code: pais[0].code }
        })
      }
    }

    if (e.target.name === 'provincia') {
      let nombresProvincias = provinces.map((el) => el.NOMBRE_PROVINCIA)
      if (nombresProvincias.includes(e.target.value)) {
        let provincia = provinces.filter((el) => el.NOMBRE_PROVINCIA === e.target.value)
        setCountriesInfoProvider((prevState) => {
          return { ...prevState, province: provincia[0].NOMBRE_PROVINCIA }
        })
      }
    }

    if (e.target.name === 'ciudad') {
      let nombresCiudades = cities.map((el) => el.NOMBRE_CIUDAD)
      if (nombresCiudades.includes(e.target.value)) {
        let ciudad = cities.filter((el) => el.NOMBRE_CIUDAD === e.target.value)
        // console.log(ciudad)
        setCountriesInfoProvider((prevState) => {
          return { ...prevState, city: ciudad[0].NOMBRE_CIUDAD }
        })
      }
    }
  }

  //OBJETO USUARIO QUE SE MANDARA A LA RUTA PARA HACER EL REGISTER

  const [input, setInput] = useState({
    nombre: '',
    apellido: '',
    password: '',
    email: '',
    imagen: '',
    fecha_nacimiento: '',
    pais: '',
    provincia: '',
    ciudad: '',
    celular: '',
  })

  //OBJETO PROVIDER QUE SE MANDARA A LA RUTA PARA HACER EL REGISTER

  const [inputProvider, setInputProvider] = useState({
    nombre: '',
    apellido: '',
    password: '',
    email: '',
    imagen: '',
    fecha_nacimiento: '',
    pais: '',
    provincia: '',
    ciudad: '',
    celular: '',
  })

  //FUNCION QUE MODIFICA EL OBJETO DEL USUARIO
  function handleChangeUser(e) {
    e.preventDefault()
    handleCountriesData(e) //Controlador de paises
    handleErrorsUser(e) //controlador de errores

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    if (registerSuccess) {
      Swal.fire('¡Registrado con éxito!', 'Ahora puedes iniciar sesión.', 'success')
    }
  }, [registerSuccess])

  // FUNCION QUE HACE DISPATCH A LA RUTA PARA CREAR EL USUARIO Y LIMPIA LOS CAMPOS
  function handleSubmitUser(e) {
    dispatch(userRegister(input))
    setInput({
      nombre: '',
      apellido: '',
      password: '',
      email: '',
      imagen: '',
      fecha_nacimiento: '',
      pais: '',
      provincia: '',
      ciudad: '',
      celular: '',
    })
    if (!registerSuccess) {
      Swal.fire('Error al Registrarse', 'Porfavor Intentelo nuevamente.', 'error')
    }
  }

  function handleChangeProvider(e) {
    e.preventDefault()
    handleCountriesDataProvider(e) //Controlador de paises
    handleErrorsProvider(e) //controlador de errores

    setInputProvider({
      ...inputProvider,
      [e.target.name]: e.target.value,
    })
  }

  function handleSubmitProvider(e) {
    dispatch(providerRegister(inputProvider))
    setInputProvider({
      nombre: '',
      apellido: '',
      password: '',
      email: '',
      imagen: '',
      fecha_nacimiento: '',
      pais: '',
      provincia: '',
      ciudad: '',
      celular: '',
    })
    if (!registerSuccess) {
      Swal.fire('Error al Registrarse', 'Porfavor Intentelo nuevamente.', 'error')
    }
  }

  //FORMULARIO CONTROLADO FUNCIONES DE USUARIO
  let [errors, setErrors] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    imagen: '',
    fecha_nacimiento: '',
    celular: '',
    conditions: '',
    checked: '',
  })
  function handleErrorsUser(e) {
    if (e.target.name === 'nombre') {
      ;/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(e.target.value)
        ? setErrors((prevState) => {
            return { ...prevState, [e.target.name]: '' }
          })
        : setErrors((prevState) => {
            return { ...prevState, [e.target.name]: 'El NOMBRE solo debe contener letras.' }
          })

      if (e.target.value === '') {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'El NOMBRE no puede estar vacío' }
        })
      }
    }

    if (e.target.name === 'apellido') {
      ;/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(e.target.value)
        ? setErrors((prevState) => {
            return { ...prevState, [e.target.name]: '' }
          })
        : setErrors((prevState) => {
            return { ...prevState, [e.target.name]: 'El APELLIDO solo debe contener letras.' }
          })

      if (e.target.value === '') {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'El APELLIDO no puede estar vacío' }
        })
      }
    }

    if (e.target.name === 'email') {
      ;/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        e.target.value
      )
        ? setErrors((prevState) => {
            return { ...prevState, [e.target.name]: '' }
          })
        : setErrors((prevState) => {
            return { ...prevState, [e.target.name]: 'Ingrese un email válido. Ej: example@example.com' }
          })

      if (usersEmail.includes(e.target.value)) {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Este correo ya está en uso, intente con otro' }
        })
      }

      if (e.target.value === '') {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Es obligatorio ingresar un EMAIL.' }
        })
      }
    }

    if (e.target.name === 'celular') {
      !isNaN(e.target.value * 1)
        ? setErrors((prevState) => {
            return { ...prevState, [e.target.name]: '' }
          })
        : setErrors((prevState) => {
            return { ...prevState, [e.target.name]: 'Solo debe ingresar numeros' }
          })

      if (!(e.target.value.length > 5)) {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'El numero celular debe tener entre 6 a 15 dígitos' }
        })
      }

      if (e.target.value.length > 15) {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'El numero celular debe tener entre 6 a 15 dígitos' }
        })
      }

      if (e.target.value === '') {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Es obligatorio ingresar un NUMERO DE CELULAR.' }
        })
      }
    }

    if (e.target.name === 'password') {
      ;/^.{6,}$/.test(e.target.value)
        ? setErrors((prevState) => {
            return { ...prevState, [e.target.name]: '' }
          })
        : setErrors((prevState) => {
            return { ...prevState, [e.target.name]: 'La contraseña debe tener al menos 6 caracteres.' }
          })

      if (e.target.value === '') {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Es obligatorio ingresar una CONTRASEÑA' }
        })
      }
    }

    if (e.target.name === 'fecha_nacimiento') {
      let year = e.target.value.slice(0, 4)
      let month = e.target.value.slice(5, 7)
      let day = e.target.value.slice(-2)

      setErrors((prevState) => {
        return { ...prevState, [e.target.name]: '' }
      })

      if (day < 1 || day > 31) {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Ingrese un día válido.' }
        })
      }

      if (month < 1 || month > 12) {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Ingrese un mes válido.' }
        })
      }

      if (year < 1900 || year > new Date().getFullYear()) {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Ingrese un año válido.' }
        })
      }
      if (new Date().getFullYear() - year < 18) {
        setErrors((prevState) => {
          return { ...prevState, [e.target.name]: 'Debe ser mayor de edad para registarse.' }
        })
      }
    }
  }

  //FORMULARIO CONTROLADO FUNCIONES DE USUARIO   ---------->PROVIDER
  let [errorsProvider, setErrorsProvider] = useState({
    nombre: '',
    apellido: '',
    email: '',
    password: '',
    imagen: '',
    fecha_nacimiento: '',
    celular: '',
    conditions: '',
    checked: '',
  })
  function handleErrorsProvider(e) {
    if (e.target.name === 'nombre') {
      ;/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(e.target.value)
        ? setErrorsProvider((prevState) => {
            return { ...prevState, [e.target.name]: '' }
          })
        : setErrorsProvider((prevState) => {
            return { ...prevState, [e.target.name]: 'El NOMBRE solo debe contener letras.' }
          })

      if (e.target.value === '') {
        setErrorsProvider((prevState) => {
          return { ...prevState, [e.target.name]: 'El NOMBRE no puede estar vacío' }
        })
      }
    }

    if (e.target.name === 'apellido') {
      ;/^[A-Za-zÁÉÍÓÚáéíóúñÑ ]+$/g.test(e.target.value)
        ? setErrorsProvider((prevState) => {
            return { ...prevState, [e.target.name]: '' }
          })
        : setErrorsProvider((prevState) => {
            return { ...prevState, [e.target.name]: 'El APELLIDO solo debe contener letras.' }
          })

      if (e.target.value === '') {
        setErrorsProvider((prevState) => {
          return { ...prevState, [e.target.name]: 'El APELLIDO no puede estar vacío' }
        })
      }
    }

    if (e.target.name === 'email') {
      ;/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/.test(
        e.target.value
      )
        ? setErrorsProvider((prevState) => {
            return { ...prevState, [e.target.name]: '' }
          })
        : setErrorsProvider((prevState) => {
            return { ...prevState, [e.target.name]: 'Ingrese un email válido. Ej: example@example.com' }
          })
      if (providersEmail.includes(e.target.value)) {
        setErrorsProvider((prevState) => {
          return { ...prevState, [e.target.name]: 'Este correo ya está en uso, intente con otro' }
        })
      }
      if (e.target.value === '') {
        setErrorsProvider((prevState) => {
          return { ...prevState, [e.target.name]: 'Es obligatorio ingresar un EMAIL.' }
        })
      }
    }

    if (e.target.name === 'celular') {
      !isNaN(e.target.value * 1)
        ? setErrorsProvider((prevState) => {
            return { ...prevState, [e.target.name]: '' }
          })
        : setErrorsProvider((prevState) => {
            return { ...prevState, [e.target.name]: 'Solo debe ingresar numeros' }
          })

      if (!(e.target.value.length > 5)) {
        setErrorsProvider((prevState) => {
          return { ...prevState, [e.target.name]: 'El numero celular debe tener entre 6 a 15 dígitos' }
        })
      }

      if (e.target.value.length > 15) {
        setErrorsProvider((prevState) => {
          return { ...prevState, [e.target.name]: 'El numero celular debe tener entre 6 a 15 dígitos' }
        })
      }

      if (e.target.value === '') {
        setErrorsProvider((prevState) => {
          return { ...prevState, [e.target.name]: 'Es obligatorio ingresar un NUMERO DE CELULAR.' }
        })
      }
    }

    if (e.target.name === 'password') {
      ;/^.{6,}$/.test(e.target.value)
        ? setErrorsProvider((prevState) => {
            return { ...prevState, [e.target.name]: '' }
          })
        : setErrorsProvider((prevState) => {
            return { ...prevState, [e.target.name]: 'La contraseña debe tener al menos 6 caracteres.' }
          })

      if (e.target.value === '') {
        setErrorsProvider((prevState) => {
          return { ...prevState, [e.target.name]: 'Es obligatorio ingresar una CONTRASEÑA' }
        })
      }
    }

    // if (e.target.name === 'imagen') {
    //   ;/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/g.test(e.target.value)
    //     ? setErrorsProvider((prevState) => {
    //         return { ...prevState, [e.target.name]: '' }
    //       })
    //     : setErrorsProvider((prevState) => {
    //         return { ...prevState, [e.target.name]: 'Ingrese un LINK DE IMAGEN válido' }
    //       })

    //   if (e.target.value === '') {
    //     setErrorsProvider((prevState) => {
    //       return { ...prevState, [e.target.name]: 'Es obligatorio ingresar un LINK DE IMAGEN' }
    //     })
    //   }
    // }

    if (e.target.name === 'fecha_nacimiento') {
      let year = e.target.value.slice(0, 4)
      let month = e.target.value.slice(5, 7)
      let day = e.target.value.slice(-2)

      setErrorsProvider((prevState) => {
        return { ...prevState, [e.target.name]: '' }
      })

      if (day < 1 || day > 31) {
        setErrorsProvider((prevState) => {
          return { ...prevState, [e.target.name]: 'Ingrese un día válido.' }
        })
      }

      if (month < 1 || month > 12) {
        setErrorsProvider((prevState) => {
          return { ...prevState, [e.target.name]: 'Ingrese un mes válido.' }
        })
      }

      if (year < 1900 || year > new Date().getFullYear()) {
        setErrorsProvider((prevState) => {
          return { ...prevState, [e.target.name]: 'Ingrese un año válido.' }
        })
      }
      if (new Date().getFullYear() - year < 18) {
        setErrorsProvider((prevState) => {
          return { ...prevState, [e.target.name]: 'Debe ser mayor de edad para registrarse.' }
        })
      }
    }
  }

  //FUNCION QUE HACE EL TOGGLE DEL BUTON AL ACEPTAR LOS TERMINOS Y CHEQUEA SI HAY ERRORES, Y DATA EN EL OBJETO A ENVIAR
  // function handleChecked(e) {
  //   //Se checkea
  //   let errorsCounter = 0
  //   let dataEmpty = 0
  //   if (termsAccepted === 'disabled') {
  //     setTerms('')

  //     setErrors((prevState) => {
  //       return { ...prevState, [e.target.name]: '' }
  //     })

  //     for (let prop in input) {
  //       if (input[prop] === '') {
  //         // console.log(input[prop])
  //         if (prop === 'imagen') {
  //           //NO CONTAMOS imagen
  //         } else {
  //           // console.log(input[prop], prop, 'sumó')
  //           dataEmpty++
  //         }
  //       }
  //     }
  //     for (let prop in errors) {
  //       if (errors[prop]) {
  //         // console.log(errors[prop], prop, 'sumó')
  //         errorsCounter++
  //       }
  //     }

  //     if (dataEmpty > 0 || errorsCounter > 0) {
  //       setTerms('disabled')
  //     } else if (dataEmpty === 0 || errorsCounter === 0) {
  //       setTerms('')
  //     }
  //     // console.log(errorsCounter, dataEmpty)
  //   }

  //   if (termsAccepted === '') {
  //     setTerms('disabled')
  //   }
  // }

  function handleChecked(e) {
    //Se checkea
    let errorsCounter = 0
    let dataEmpty = 0
    if (termsAccepted === 'disabled') {
      setTerms('')
      setErrors((prevState) => {
        return { ...prevState, checked: '' }
      })

      // console.log(errorsCounter, dataEmpty)
    }

    if (termsAccepted === '') {
      setTerms('disabled')
      setErrors((prevState) => {
        return { ...prevState, checked: 'Debe aceptar los términos y condiciones' }
      })
    }
  }

  // Cargar imagen de tipo File
  const [file, setFile] = useState()
  const [format, setFormat] = useState('')

  const saveFile = (e) => {
    setFile(e.target.files[0])
    var formatImage = e.target.files[0]?.name.split('.')
    setFormat(formatImage[formatImage?.length - 1])
  }

  const uploadUserFile = async (e) => {
    const code = uuidv4()
    // console.log(code)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('format', format)
    try {
      const res = await api.post(`/upload/profile/${code}.${format}`, formData)
      console.log(res)
      setInput({
        ...input,
        [e.target.name]: code + '.' + format,
      })
      Swal.fire('Imagen cargada con Exito', '', 'success')
    } catch (ex) {
      console.log(ex)
    }
  }
  const uploadProviderFile = async (e) => {
    const code = uuidv4()
    console.log(code)
    const formData = new FormData()
    formData.append('file', file)
    formData.append('format', format)
    try {
      const res = await api.post(`/upload/profile/${code}.${format}`, formData)
      console.log(res)
      setInputProvider({
        ...inputProvider,
        [e.target.name]: code + '.' + format,
      })
      Swal.fire('Imagen cargada con Exito', '', 'success')
    } catch (ex) {
      console.log(ex)
    }
  }

  function finalCheck(e) {
    let errorsCounter = 0
    let dataEmpty = 0

    for (let prop in input) {
      if (input[prop] === '') {
        // console.log(input[prop])
        if (prop === 'imagen') {
          //NO CONTAMOS imagen
        } else {
          // console.log(input[prop], prop, 'sumó')
          dataEmpty++
        }
      }
    }
    for (let prop in errors) {
      if (errors[prop]) {
        // console.log(errors[prop], prop, 'sumó')
        errorsCounter++
      }
    }

    if (dataEmpty > 0 || errorsCounter > 0) {
      Swal.fire('¡Ha ocurrido un error!', 'Revisa los datos ingresados', 'error')
    } else if (dataEmpty === 0 || errorsCounter === 0) {
      handleSubmitUser(e)
    }
    // console.log(errorsCounter, dataEmpty)
  }

  //FUNCION QUE HACE EL TOGGLE DEL BUTON AL ACEPTAR LOS TERMINOS Y CHEQUEA SI HAY ERRORES, Y DATA EN EL OBJETO A ENVIAR --------------> PROVIDER
  // function handleCheckedProvider(e) {
  //   //Se checkea
  //   let errorsCounter = 0
  //   let dataEmpty = 0
  //   if (termsAccepted === 'disabled') {
  //     setTermsProvider('')

  //     setErrorsProvider((prevState) => {
  //       return { ...prevState, [e.target.name]: '' }
  //     })

  //     for (let prop in inputProvider) {
  //       if (inputProvider[prop] === '') {
  //         // console.log(input[prop])
  //         if (prop === 'imagen') {
  //           //NO CONTAMOS imagen
  //         } else {
  //           dataEmpty++
  //         }
  //       }
  //     }
  //     for (let prop in errorsProvider) {
  //       if (errorsProvider[prop]) {
  //         errorsCounter++
  //       }
  //     }

  //     if (dataEmpty > 0 || errorsCounter > 0) {
  //       setTermsProvider('disabled')
  //     } else if (dataEmpty === 0 || errorsCounter === 0) {
  //       setTermsProvider('')
  //     }
  //   }

  //   if (termsAcceptedProvider === '') {
  //     setTermsProvider('disabled')
  //   }
  // }
  function handleCheckedProvider(e) {
    //Se checkea
    let errorsCounter = 0
    let dataEmpty = 0
    if (termsAccepted === 'disabled') {
      setTermsProvider('')
      setErrorsProvider((prevState) => {
        return { ...prevState, checked: '' }
      })

      // console.log(errorsCounter, dataEmpty)
    }

    if (termsAccepted === '') {
      setTermsProvider('disabled')
      setErrorsProvider((prevState) => {
        return { ...prevState, checked: 'Debe aceptar los términos y condiciones' }
      })
    }
  }

  function finalCheckProvider(e) {
    let errorsCounter = 0
    let dataEmpty = 0

    for (let prop in inputProvider) {
      if (inputProvider[prop] === '') {
        // console.log(input[prop])
        if (prop === 'imagen') {
          //NO CONTAMOS imagen
        } else {
          dataEmpty++
        }
      }
    }
    for (let prop in errorsProvider) {
      if (errorsProvider[prop]) {
        errorsCounter++
      }
    }

    if (dataEmpty > 0 || errorsCounter > 0) {
      Swal.fire('¡Ha ocurrido un error!', 'Revisa los datos ingresados', 'error')
    } else if (dataEmpty === 0 || errorsCounter === 0) {
      handleSubmitProvider(e)
    }
  }

  if (isModal) {
    return (
      <>
        <Container>
          <Col md={12}>
            <div className={`${styles.card} ${styles.myTabs}`}>
              {' '}
              <span className={styles.circle}>
                <i className='fa fa-check'></i>
              </span>
              <h5 className='mt-3 '>
                Unete a la comunidad profesional
                <br /> más completa de la red.
              </h5>{' '}
              <small className='mt-2 text-muted'>Conecta con miles de profesionistas de calidad o encuentra a tus potenciales clientes. </small>
              <br />
              <br />
              <Tabs defaultActiveKey='Usuario' className={`mb-3 text-center justify-content-center ${styles.myTabs}`}>
                {/* PESTAÑA DE USUARIO */}
                <Tab eventKey='Usuario' title='Registrar usuario'>
                  <div className='text-center mt-3'>
                    <div className={styles.halfInputContainer}>
                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-user' style={{ left: '15px' }}></i>{' '}
                        <input
                          type='text'
                          className={`${styles.formControl} ${styles.halfInput}`}
                          name='nombre'
                          placeholder='Nombre'
                          value={input.nombre}
                          onChange={(e) => handleChangeUser(e)}
                        />{' '}
                      </div>
                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-address-card' style={{ left: '13px' }}></i>
                        <input
                          type='text'
                          className={`${styles.formControl} ${styles.halfInput}`}
                          name='apellido'
                          placeholder='Apellido'
                          value={input.apellido}
                          onChange={(e) => handleChangeUser(e)}
                        />
                      </div>
                    </div>

                    {/* MENSAJE DE ERROR DE NOMBRE Y APELLIDO */}

                    {errors.nombre && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.nombre}</p>}
                    {errors.apellido && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.apellido}</p>}

                    <div className={styles.formInput}>
                      {' '}
                      <i className='fa fa-envelope'></i>{' '}
                      <input
                        type='text'
                        className={styles.formControl}
                        name='email'
                        placeholder='Correo electrónico'
                        value={input.email}
                        onChange={(e) => handleChangeUser(e)}
                      />{' '}
                    </div>
                    {errors.email && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.email}</p>}

                    <div className={styles.formInput}>
                      {' '}
                      <i className='fa fa-lock'></i>{' '}
                      <input
                        type='password'
                        className={styles.formControl}
                        name='password'
                        placeholder='Contraseña'
                        value={input.password}
                        onChange={(e) => handleChangeUser(e)}
                      />{' '}
                    </div>
                    {errors.password && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.password}</p>}

                    <div className={styles.formInput}>
                      <label htmlFor='imagen'>Suba una foto (opcional):</label><br />
                      <input
                        type='file'
                        accept='image/x-png,image/jpeg'
                        className={styles.formControl}
                        style={{margin: '10px'}}
                        name='imagen'
                        placeholder='Imagen'
                        onChange={(e) => {
                          saveFile(e)
                        }}
                      />{' '}
                      <button className='btn btn-primary' name='imagen' onClick={(e) => uploadUserFile(e)}>
                      <i className='fa fa-camera' aria-hidden='true'></i> Subir imagen
                      </button>
                    </div>
                    {errors.imagen && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.imagen}</p>}

                    <div className={styles.formInput}>
                      {' '}
                      <i className='fa fa-mobile' aria-hidden='true'></i>{' '}
                      <input
                        type='number'
                        className={styles.formControl}
                        name='celular'
                        placeholder='Celular'
                        value={input.celular}
                        onChange={(e) => handleChangeUser(e)}
                      />{' '}
                    </div>
                    {errors.celular && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.celular}</p>}

                    <div className={styles.formInput}>
                      <label htmlFor='date'>Fecha nacimiento:</label>
                      <input
                        type='date'
                        className={styles.formControl}
                        name='fecha_nacimiento'
                        placeholder='Fecha de nacimiento'
                        value={input.fecha_nacimiento}
                        onChange={(e) => handleChangeUser(e)}
                      />
                    </div>
                    {errors.fecha_nacimiento && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.fecha_nacimiento}</p>}

                    <div className={styles.formInput}>
                      {' '}
                      <i className='fa fa-globe' aria-hidden='true'></i>{' '}
                      <select
                        className={styles.formControl}
                        name='pais'
                        onChange={(e) => {
                          handleChangeUser(e)
                        }}>
                        <option selected disabled hidden>
                          Selecciona país
                        </option>

                        {countries.length > 0
                          ? countries?.map((el, i) => {
                              return (
                                <option key={i} id={el.code} value={el.name}>
                                  {el.name}
                                </option>
                              )
                            })
                          : 'Cargando...'}
                      </select>
                    </div>

                    {input.pais ? (
                      <div className={styles.formInput}>
                        <i className='fa fa-map-marker' aria-hidden='true'></i>{' '}
                        <select className={styles.formControl} name='provincia' onChange={(e) => handleChangeUser(e)}>
                          <option selected disabled hidden>
                            Selecciona una provincia
                          </option>

                          {provinces.length > 0 ? (
                            provinces?.map((el, i) => {
                              return (
                                <option key={i} value={el.NOMBRE_PROVINCIA}>
                                  {el.NOMBRE_PROVINCIA}
                                </option>
                              )
                            })
                          ) : (
                            <option>Cargando...</option>
                          )}
                        </select>
                      </div>
                    ) : null}

                    {input.provincia && input.pais !== 'Uruguay' ? (
                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-building' aria-hidden='true'>
                          {' '}
                        </i>{' '}
                        <select
                          type='text'
                          className={styles.formControl}
                          name='ciudad'
                          placeholder='Ciudad'
                          value={input.ciudad}
                          onChange={(e) => handleChangeUser(e)}>
                          <option selected disabled hidden>
                            Selecciona una ciudad
                          </option>
                          {cities?.length > 0 ? (
                            cities?.map((el, i) => {
                              return (
                                <option key={i} value={el.NOMBRE_CIUDAD}>
                                  {el.NOMBRE_CIUDAD}
                                </option>
                              )
                            })
                          ) : (
                            <option>Cargando...</option>
                          )}
                        </select>
                      </div>
                    ) : null}

                    {input.pais === 'Uruguay' && cities?.length > 0 && !cities.map((el) => el.NOMBRE_CIUDAD).includes(input.ciudad) ? isUruguay() : null}

                    <div className={styles.formInput}></div>
                    <div className='form-check d-flex justify-content-center'>
                      {' '}
                      <input className='form-check-input' type='checkbox' name='checked' id='flexCheckChecked' onChange={(e) => handleChecked(e)} />{' '}
                      <label className={styles.formCheckLabel} htmlFor='flexCheckChecked'>
                        {' '}
                       Acepto términos y condiciones.
                      </label>{' '}
                      <br />
                      
                    </div>
                    {errors.checked && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.checked}</p>}
                    {/* <button className={`btn btn-success mt-4 ${styles.signup} ${termsAccepted}`} onClick={(e) => handleSubmitUser(e)}> */}
                    {/* <div className={styles.recaptcha}>
                      <ReCAPTCHA ref={captcha} sitekey='6LdFXPofAAAAAEPQJIgFt3-_imqhXY6RDnBA10_7' onChange={onRecaptcha} callback= {onRecaptcha}/>
                    </div> */}
                    <button className={`btn btn-success mt-4 ${styles.signup} ${termsAccepted}`} onClick={(e) => finalCheck(e)}>
                      Confirmar registro
                    </button>
                  </div>

                  <div className='text-center mt-3'>
                    {' '}
                    <span>O registrate usando:</span>{' '}
                  </div>
                  <div className='d-flex justify-content-center mt-4'>
                    {' '}
                    {/* <span className={styles.social}>
                      <i className='fa fa-google'></i>
                    // </span>{' '} */}
                    {/* //{' '}
                    <span className={styles.social}>
                      // <i className='fa fa-facebook'></i>
                      //{' '}
                    </span>{' '} */}
                    {/* <span className={styles.social}>
                      <i className='fa fa-linkedin'></i>
                    </span>{' '} */}
                    <FacebookLogin
                      appId='422066786032438'
                      autoLoad={false}
                      fields='name,email,picture,birthday'
                      onClick={facebookClicked}
                      callback={responseFacebook}
                      cssClass={styles.social}
                      textButton={<i className='fa fa-facebook'></i>}
                    />
                  </div>
                  <div className='text-center mt-4'>
                    {' '}
                    <span>¿Ya estás registrado?</span>{' '}
                    <Link to='/login' className='text-decoration-none'>
                      Inicia sesión
                    </Link>{' '}
                  </div>
                </Tab>

                <Tab eventKey='Proveedor' title='Registrar proveedor'>
                  <div className='text-center mt-3'>
                    <div className={styles.halfInputContainer}>
                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-user' style={{ left: '15px' }}></i>{' '}
                        <input
                          type='text'
                          className={`${styles.formControl} ${styles.halfInput}`}
                          name='nombre'
                          placeholder='Nombre'
                          value={inputProvider.nombre}
                          onChange={(e) => handleChangeProvider(e)}
                        />{' '}
                      </div>
                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-address-card' style={{ left: '13px' }}></i>
                        <input
                          type='text'
                          className={`${styles.formControl} ${styles.halfInput}`}
                          name='apellido'
                          placeholder='Apellido'
                          value={inputProvider.apellido}
                          onChange={(e) => handleChangeProvider(e)}
                        />
                      </div>
                    </div>

                    {/* MENSAJE DE ERROR DE NOMBRE Y APELLIDO */}

                    {errorsProvider.nombre && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.nombre}</p>}
                    {errorsProvider.apellido && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.apellido}</p>}

                    <div className={styles.formInputPage}>
                      {' '}
                      <i className='fa fa-envelope'></i>{' '}
                      <input
                        type='text'
                        className={styles.formControl}
                        name='email'
                        placeholder='Correo electrónico'
                        value={inputProvider.email}
                        onChange={(e) => handleChangeProvider(e)}
                      />{' '}
                    </div>
                    {errorsProvider.email && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.email}</p>}

                    <div className={styles.formInputPage}>
                      {' '}
                      <i className='fa fa-lock'></i>{' '}
                      <input
                        type='password'
                        className={styles.formControl}
                        name='password'
                        placeholder='Contraseña'
                        value={inputProvider.password}
                        onChange={(e) => handleChangeProvider(e)}
                      />{' '}
                    </div>
                    {errorsProvider.password && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.password}</p>}



                    <div className={styles.formInput}>
                      <label htmlFor='imagen'>Suba una foto (opcional):</label><br />
                      <input
                        type='file'
                        accept='image/x-png,image/jpeg'
                        className={styles.formControl}
                        style={{margin: '10px'}}
                        name='imagen'
                        placeholder='Imagen'
                        onChange={(e) => {
                          saveFile(e)
                        }}
                      />{' '}
                      <button className='btn btn-primary' name='imagen' onClick={(e) => uploadProviderFile(e)}>
                      <i className='fa fa-camera' aria-hidden='true'></i> Subir imagen
                      </button>
                    </div>
                    {/* <div className={styles.formInputPage}>
                      {' '}
                      <i className='fa fa-camera' aria-hidden='true'></i>{' '}
                      <input
                        type='file'
                        accept='image/x-png,image/jpeg'
                        className={styles.formControl}
                        name='imagen'
                        placeholder='Imagen'
                        onChange={(e) => {
                          saveFile(e)
                        }}
                      />{' '}
                      <button name='imagen' onClick={(e) => uploadProviderFile(e)}>
                        Upload
                      </button>
                    </div> */}
                    {errorsProvider.imagen && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.imagen}</p>}

                    <div className={styles.formInputPage}>
                      {' '}
                      <i className='fa fa-mobile' aria-hidden='true'></i>{' '}
                      <input
                        type='text'
                        className={styles.formControl}
                        name='celular'
                        placeholder='Celular'
                        value={inputProvider.celular}
                        onChange={(e) => handleChangeProvider(e)}
                      />{' '}
                    </div>
                    {errorsProvider.celular && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.celular}</p>}

                    <div className={styles.formInputPage}>
                      <label htmlFor='date'>Fecha nacimiento:</label>
                      <input
                        type='date'
                        className={styles.formControl}
                        name='fecha_nacimiento'
                        placeholder='Fecha de nacimiento'
                        value={inputProvider.fecha_nacimiento}
                        onChange={(e) => handleChangeProvider(e)}
                      />
                    </div>
                    {errorsProvider.fecha_nacimiento && (
                      <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.fecha_nacimiento}</p>
                    )}

                    <div className={styles.formInput}>
                      {' '}
                      <i className='fa fa-globe' aria-hidden='true'></i>{' '}
                      <select
                        className={styles.formControl}
                        name='pais'
                        onChange={(e) => {
                          handleChangeProvider(e)
                        }}>
                        <option selected disabled hidden>
                          Selecciona país
                        </option>

                        {countries.length > 0
                          ? countries?.map((el, i) => {
                              return (
                                <option key={i} id={el.code} value={el.name}>
                                  {el.name}
                                </option>
                              )
                            })
                          : 'Cargando...'}
                      </select>
                    </div>

                    {inputProvider.pais ? (
                      <div className={styles.formInput}>
                        <i className='fa fa-map-marker' aria-hidden='true'></i>{' '}
                        <select className={styles.formControl} name='provincia' onChange={(e) => handleChangeProvider(e)}>
                          <option selected disabled hidden>
                            Selecciona una provincia
                          </option>

                          {provinces.length > 0 ? (
                            provinces?.map((el, i) => {
                              return (
                                <option key={i} value={el.NOMBRE_PROVINCIA}>
                                  {el.NOMBRE_PROVINCIA}
                                </option>
                              )
                            })
                          ) : (
                            <option>Cargando...</option>
                          )}
                        </select>
                      </div>
                    ) : null}

                    {inputProvider.provincia && inputProvider.pais !== 'Uruguay' ? (
                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-building' aria-hidden='true'>
                          {' '}
                        </i>{' '}
                        <select
                          type='text'
                          className={styles.formControl}
                          name='ciudad'
                          placeholder='Ciudad'
                          value={inputProvider.ciudad}
                          onChange={(e) => handleChangeProvider(e)}>
                          <option selected disabled hidden>
                            Selecciona una ciudad
                          </option>
                          {cities?.length > 0 ? (
                            cities?.map((el, i) => {
                              return (
                                <option key={i} value={el.NOMBRE_CIUDAD}>
                                  {el.NOMBRE_CIUDAD}
                                </option>
                              )
                            })
                          ) : (
                            <option>Cargando...</option>
                          )}
                        </select>
                      </div>
                    ) : null}

                    {inputProvider.pais === 'Uruguay' && cities?.length > 0 && !cities.map((el) => el.NOMBRE_CIUDAD).includes(inputProvider.ciudad)
                      ? isUruguayProvider()
                      : null}

                    <div className={styles.formInput}></div>
                    <div className='form-check d-flex justify-content-center'>
                      {' '}
                      <input
                        className='form-check-input'
                        type='checkbox'
                        name='checked'
                        id='flexCheckChecked'
                        onChange={(e) => handleCheckedProvider(e)}
                      />{' '}
                      <label className={styles.formCheckLabel} htmlFor='flexCheckChecked'>
                        {' '}
                        Acepto términos y condiciones.{' '}
                      </label>{' '}
                    </div>
                    {/* <button className={`btn btn-success mt-4 ${styles.signup} ${termsAcceptedProvider}`} onClick={(e) => handleSubmitUser(e)}> */}
                    {/* <div className='recaptcha'>
                      <ReCAPTCHA ref={captcha} sitekey='6Le5jukfAAAAAD7b-AKYrJS1A8bT_VqYBbXPwLcX' onChange={onRecaptcha} />
                    </div> */}
                    <button className={`btn btn-success mt-4 ${styles.signup} ${termsAcceptedProvider}`} onClick={(e) => finalCheckProvider(e)}>
                      Confirmar registro
                    </button>
                  </div>

                  <div className='text-center mt-3'>
                    {' '}
                    <span>O registrate usando:</span>{' '}
                  </div>
                  <div className='d-flex justify-content-center mt-4'>
                    {' '}
                    {/* <span className={styles.social}>
                      <i className='fa fa-google'></i>
                    </span>{' '}
                    <span className={styles.social}>
                      <i className='fa fa-facebook'></i>
                    </span>{' '}
                    <span className={styles.social}>
                      <i className='fa fa-linkedin'></i>
                    </span>{' '} */}
                     <FacebookLogin
                      appId='422066786032438'
                      autoLoad={false}
                      fields='name,email,picture,birthday'
                      onClick={facebookClicked}
                      callback={responseFacebookProv}
                      cssClass={styles.social}
                      textButton={<i className='fa fa-facebook'></i>}
                    />
                  </div>
                  <div className='text-center mt-4'>
                    {' '}
                    <span>¿Ya estás registrado?</span>{' '}
                    <Link to='/login' className='text-decoration-none'>
                      Inicia sesión
                    </Link>{' '}
                  </div>
                </Tab>
              </Tabs>
            </div>
          </Col>
        </Container>
      </>
    )
  } else {
    return (
      <>
        <div className='d-flex container align-items-center justify-content-center' style={{ marginTop: '1rem' }}>
          <div
            className={styles.registerContainer}
            style={{ borderRadius: '10px', border: '1px solid DarkGray', background: 'white', boxShadow: '0 0 5px 1px rgba(0, 0, 0, 0.4)' }}>
            <Col md={12}>
              <div className={`${styles.card} ${styles.myTabs}`} style={{ padding: '3rem' }}>
                {' '}
                <span className={styles.circle}>
                  <i className='fa fa-check'></i>
                </span>
                <h5 className='mt-3 '>
                  Unete a la comunidad profesional
                  <br /> más completa de la red.
                </h5>{' '}
                <small className='mt-2 text-muted'>Conecta con miles de profesionistas de calidad o encuentra a tus potenciales clientes. </small>
                <br />
                <br />
                <Tabs defaultActiveKey='Usuario' className={`mb-3 text-center justify-content-center ${styles.myTabs}`}>
                  {/* PESTAÑA DE USUARIO */}
                  <Tab eventKey='Usuario' title='Registrar usuario'>
                    <div className='text-center mt-3'>
                      <div className={styles.halfInputContainer}>
                        <div className={styles.formInput}>
                          {' '}
                          <i className='fa fa-user' style={{ left: '15px' }}></i>{' '}
                          <input
                            type='text'
                            className={`${styles.formControl} ${styles.halfInput}`}
                            name='nombre'
                            placeholder='Nombre'
                            value={input.nombre}
                            onChange={(e) => handleChangeUser(e)}
                          />{' '}
                        </div>
                        <div className={styles.formInput}>
                          {' '}
                          <i className='fa fa-address-card' style={{ left: '13px' }}></i>
                          <input
                            type='text'
                            className={`${styles.formControl} ${styles.halfInput}`}
                            name='apellido'
                            placeholder='Apellido'
                            value={input.apellido}
                            onChange={(e) => handleChangeUser(e)}
                          />
                        </div>
                      </div>

                      {/* MENSAJE DE ERROR DE NOMBRE Y APELLIDO */}

                      {errors.nombre && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.nombre}</p>}
                      {errors.apellido && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.apellido}</p>}

                      <div className={styles.formInputPage}>
                        {' '}
                        <i className='fa fa-envelope' style={{ left: '5rem!important' }}></i>{' '}
                        <input
                          type='text'
                          className={styles.formControl}
                          name='email'
                          placeholder='Correo electrónico'
                          value={input.email}
                          onChange={(e) => handleChangeUser(e)}
                        />{' '}
                      </div>
                      {errors.email && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.email}</p>}

                      <div className={styles.formInputPage}>
                        {' '}
                        <i className='fa fa-lock'></i>{' '}
                        <input
                          type='password'
                          className={styles.formControl}
                          name='password'
                          placeholder='Contraseña'
                          value={input.password}
                          onChange={(e) => handleChangeUser(e)}
                        />{' '}
                      </div>
                      {errors.password && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.password}</p>}

                      <div className={styles.formInput}>
                      <label htmlFor='imagen'>Suba una foto (opcional):</label><br />
                      <input
                        type='file'
                        accept='image/x-png,image/jpeg'
                        className={styles.formControl}
                        style={{margin: '10px'}}
                        name='imagen'
                        placeholder='Imagen'
                        onChange={(e) => {
                          saveFile(e)
                        }}
                      />{' '}
                      <button className='btn btn-primary' name='imagen' onClick={(e) => uploadUserFile(e)}>
                      <i className='fa fa-camera' aria-hidden='true'></i> Subir imagen
                      </button>
                    </div>
                      {errors.imagen && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.imagen}</p>}

                      <div className={styles.formInputPage}>
                        {' '}
                        <i className='fa fa-mobile' aria-hidden='true'></i>{' '}
                        <input
                          type='number'
                          className={styles.formControl}
                          name='celular'
                          placeholder='Celular'
                          value={input.celular}
                          onChange={(e) => handleChangeUser(e)}
                        />{' '}
                      </div>
                      {errors.celular && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.celular}</p>}

                      <div className={styles.formInput}>
                        <label htmlFor='date'>Fecha nacimiento:</label>
                        <input
                          type='date'
                          className={styles.formControl}
                          name='fecha_nacimiento'
                          placeholder='Fecha de nacimiento'
                          value={input.fecha_nacimiento}
                          onChange={(e) => handleChangeUser(e)}
                        />
                      </div>
                      {errors.fecha_nacimiento && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.fecha_nacimiento}</p>}

                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-globe' aria-hidden='true'></i>{' '}
                        <select
                          className={styles.formControl}
                          name='pais'
                          onChange={(e) => {
                            handleChangeUser(e)
                          }}>
                          <option selected disabled hidden>
                            Selecciona país
                          </option>

                          {countries.length > 0
                            ? countries?.map((el, i) => {
                                return (
                                  <option key={i} id={el.code} value={el.name}>
                                    {el.name}
                                  </option>
                                )
                              })
                            : 'Cargando...'}
                        </select>
                      </div>

                      {input.pais ? (
                        <div className={styles.formInput}>
                          <i className='fa fa-map-marker' aria-hidden='true'></i>{' '}
                          <select className={styles.formControl} name='provincia' onChange={(e) => handleChangeUser(e)}>
                            <option selected disabled hidden>
                              Provincia
                            </option>

                            {provinces.length > 0 ? (
                              provinces?.map((el, i) => {
                                return (
                                  <option key={i} value={el.NOMBRE_PROVINCIA}>
                                    {el.NOMBRE_PROVINCIA}
                                  </option>
                                )
                              })
                            ) : (
                              <option>Cargando...</option>
                            )}
                          </select>
                        </div>
                      ) : null}

                      {input.provincia && input.pais !== 'Uruguay' ? (
                        <div className={styles.formInput}>
                          {' '}
                          <i className='fa fa-building' aria-hidden='true'>
                            {' '}
                          </i>{' '}
                          <select
                            type='text'
                            className={styles.formControl}
                            name='ciudad'
                            placeholder='Ciudad'
                            value={input.ciudad}
                            onChange={(e) => handleChangeUser(e)}>
                            <option selected disabled hidden>
                              Ciudad
                            </option>
                            {cities?.length > 0 ? (
                              cities?.map((el, i) => {
                                return (
                                  <option key={i} value={el.NOMBRE_CIUDAD}>
                                    {el.NOMBRE_CIUDAD}
                                  </option>
                                )
                              })
                            ) : (
                              <option>Cargando...</option>
                            )}
                          </select>
                        </div>
                      ) : null}

                      {input.pais === 'Uruguay' && cities?.length > 0 && !cities.map((el) => el.NOMBRE_CIUDAD).includes(input.ciudad) ? isUruguay() : null}

                      <div className={styles.formInput}></div>
                      <div className='form-check d-flex justify-content-center'>
                        {' '}
                        <input className='form-check-input' type='checkbox' name='checked' id='flexCheckChecked' onChange={(e) => handleChecked(e)} />{' '}
                        <label className={styles.formCheckLabel} htmlFor='flexCheckChecked'>
                          {' '}
                          Acepto términos y condiciones.{' '}
                        </label>{' '}
                      </div>
                      {/* <button className={`btn btn-success mt-4 ${styles.signup} ${termsAccepted}`} onClick={(e) => handleSubmitUser(e)}> */}
                      {/* <div className='recaptcha'>
                        <ReCAPTCHA ref={captcha} sitekey='6Le5jukfAAAAAD7b-AKYrJS1A8bT_VqYBbXPwLcX' onChange={onRecaptcha} />
                      </div> */}
                      <button className={`btn btn-success mt-4 ${styles.signup} ${termsAccepted}`} onClick={(e) => finalCheck(e)}>
                        Confirmar registro
                      </button>
                    </div>

                    <div className='text-center mt-3'>
                      {' '}
                      <span>O registrate usando:</span>{' '}
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                      {' '}
                      {/* <span className={styles.social}>
                        <i className='fa fa-google'></i>
                      </span>{' '}
                      <span className={styles.social}>
                        <i className='fa fa-facebook'></i>
                      </span>{' '}
                      <span className={styles.social}>
                        <i className='fa fa-linkedin'></i>
                      </span>{' '} */}
                       <FacebookLogin
                      appId='422066786032438'
                      autoLoad={false}
                      fields='name,email,picture,birthday'
                      onClick={facebookClicked}
                      callback={responseFacebook}
                      cssClass={styles.social}
                      textButton={<i className='fa fa-facebook'></i>}
                    />
                    </div>
                    <div className='text-center mt-4'>
                      {' '}
                      <span>¿Ya estás registrado?</span>{' '}
                      <Link to='/login' className='text-decoration-none'>
                        Inicia sesión
                      </Link>{' '}
                    </div>
                  </Tab>

                  <Tab eventKey='Proveedor' title='Registrar proveedor'>
                    <div className='text-center mt-3'>
                      <div className={styles.halfInputContainer}>
                        <div className={styles.formInput}>
                          {' '}
                          <i className='fa fa-user' style={{ left: '15px' }}></i>{' '}
                          <input
                            type='text'
                            className={`${styles.formControl} ${styles.halfInput}`}
                            name='nombre'
                            placeholder='Nombre'
                            value={inputProvider.nombre}
                            onChange={(e) => handleChangeProvider(e)}
                          />{' '}
                        </div>
                        <div className={styles.formInput}>
                          {' '}
                          <i className='fa fa-address-card' style={{ left: '13px' }}></i>
                          <input
                            type='text'
                            className={`${styles.formControl} ${styles.halfInput}`}
                            name='apellido'
                            placeholder='Apellido'
                            value={inputProvider.apellido}
                            onChange={(e) => handleChangeProvider(e)}
                          />
                        </div>
                      </div>

                      {/* MENSAJE DE ERROR DE NOMBRE Y APELLIDO */}

                      {errorsProvider.nombre && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.nombre}</p>}
                      {errorsProvider.apellido && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.apellido}</p>}

                      <div className={styles.formInputPage}>
                        {' '}
                        <i className='fa fa-envelope' style={{ left: '5rem!important' }}></i>{' '}
                        <input
                          type='text'
                          className={styles.formControl}
                          name='email'
                          placeholder='Correo electrónico'
                          value={inputProvider.email}
                          onChange={(e) => handleChangeProvider(e)}
                        />{' '}
                      </div>
                      {errorsProvider.email && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.email}</p>}

                      <div className={styles.formInputPage}>
                        {' '}
                        <i className='fa fa-lock'></i>{' '}
                        <input
                          type='password'
                          className={styles.formControl}
                          name='password'
                          placeholder='Contraseña'
                          value={inputProvider.password}
                          onChange={(e) => handleChangeProvider(e)}
                        />{' '}
                      </div>
                      {errorsProvider.password && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.password}</p>}

                      <div className={styles.formInput}>
                      <label htmlFor='imagen'>Suba una foto (opcional):</label><br />
                      <input
                        type='file'
                        accept='image/x-png,image/jpeg'
                        className={styles.formControl}
                        style={{margin: '10px'}}
                        name='imagen'
                        placeholder='Imagen'
                        onChange={(e) => {
                          saveFile(e)
                        }}
                      />{' '}
                      <button className='btn btn-primary' name='imagen' onClick={(e) => uploadProviderFile(e)}>
                      <i className='fa fa-camera' aria-hidden='true'></i> Subir imagen
                      </button>
                    </div>
                      {errorsProvider.imagen && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.imagen}</p>}

                      <div className={styles.formInputPage}>
                        {' '}
                        <i className='fa fa-mobile' aria-hidden='true'></i>{' '}
                        <input
                          type='text'
                          className={styles.formControl}
                          name='celular'
                          placeholder='Celular'
                          value={inputProvider.celular}
                          onChange={(e) => handleChangeProvider(e)}
                        />{' '}
                      </div>
                      {errorsProvider.celular && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.celular}</p>}

                      <div className={styles.formInputPage}>
                        <label htmlFor='date'>Fecha nacimiento:</label>
                        <input
                          type='date'
                          className={styles.formControl}
                          name='fecha_nacimiento'
                          placeholder='Fecha de nacimiento'
                          value={inputProvider.fecha_nacimiento}
                          onChange={(e) => handleChangeProvider(e)}
                        />
                      </div>
                      {errorsProvider.fecha_nacimiento && (
                        <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errorsProvider.fecha_nacimiento}</p>
                      )}

                      <div className={styles.formInput}>
                        {' '}
                        <i className='fa fa-globe' aria-hidden='true'></i>{' '}
                        <select
                          className={styles.formControl}
                          name='pais'
                          onChange={(e) => {
                            handleChangeProvider(e)
                          }}>
                          <option selected disabled hidden>
                            Selecciona país
                          </option>

                          {countries.length > 0
                            ? countries?.map((el, i) => {
                                return (
                                  <option key={i} id={el.code} value={el.name}>
                                    {el.name}
                                  </option>
                                )
                              })
                            : 'Cargando...'}
                        </select>
                      </div>

                      {inputProvider.pais ? (
                        <div className={styles.formInput}>
                          <i className='fa fa-map-marker' aria-hidden='true'></i>{' '}
                          <select className={styles.formControl} name='provincia' onChange={(e) => handleChangeProvider(e)}>
                            <option selected disabled hidden>
                              Provincia
                            </option>

                            {provinces.length > 0 ? (
                              provinces?.map((el, i) => {
                                return (
                                  <option key={i} value={el.NOMBRE_PROVINCIA}>
                                    {el.NOMBRE_PROVINCIA}
                                  </option>
                                )
                              })
                            ) : (
                              <option>Cargando...</option>
                            )}
                          </select>
                        </div>
                      ) : null}

                      {inputProvider.provincia && inputProvider.pais !== 'Uruguay' ? (
                        <div className={styles.formInput}>
                          {' '}
                          <i className='fa fa-building' aria-hidden='true'>
                            {' '}
                          </i>{' '}
                          <select
                            type='text'
                            className={styles.formControl}
                            name='ciudad'
                            placeholder='Ciudad'
                            value={inputProvider.ciudad}
                            onChange={(e) => handleChangeProvider(e)}>
                            <option selected disabled hidden>
                              Ciudad
                            </option>
                            {cities?.length > 0 ? (
                              cities?.map((el, i) => {
                                return (
                                  <option key={i} value={el.NOMBRE_CIUDAD}>
                                    {el.NOMBRE_CIUDAD}
                                  </option>
                                )
                              })
                            ) : (
                              <option>Cargando...</option>
                            )}
                          </select>
                        </div>
                      ) : null}

                      {inputProvider.pais === 'Uruguay' && cities?.length > 0 && !cities.map((el) => el.NOMBRE_CIUDAD).includes(inputProvider.ciudad)
                        ? isUruguayProvider()
                        : null}

                      <div className={styles.formInput}></div>
                      <div className='form-check d-flex justify-content-center'>
                        {' '}
                        <input
                          className='form-check-input'
                          type='checkbox'
                          name='checked'
                          id='flexCheckChecked'
                          onChange={(e) => handleCheckedProvider(e)}
                        />{' '}
                        <label className={styles.formCheckLabel} htmlFor='flexCheckChecked'>
                          {' '}
                          Acepto términos y condiciones.{' '}
                        </label>{' '}
                      </div>
                      {/* <button className={`btn btn-success mt-4 ${styles.signup} ${termsAcceptedProvider}`} onClick={(e) => handleSubmitUser(e)}> */}
                      {/* <div className='recaptcha'>
                        <ReCAPTCHA ref={captcha} sitekey='6Le5jukfAAAAAD7b-AKYrJS1A8bT_VqYBbXPwLcX' onChange={onRecaptcha} />
                      </div> */}
                      <button className={`btn btn-success mt-4 ${styles.signup} ${termsAcceptedProvider}`} onClick={(e) => finalCheckProvider(e)}>
                        Confirmar registro
                      </button>
                    </div>

                    <div className='text-center mt-3'>
                      {' '}
                      <span>O registrate usando:</span>{' '}
                    </div>
                    <div className='d-flex justify-content-center mt-4'>
                      {' '}
                      {/* <span className={styles.social}>
                        <i className='fa fa-google'></i>
                      </span>{' '}
                      <span className={styles.social}>
                        <i className='fa fa-facebook'></i>
                      </span>{' '}
                      <span className={styles.social}>
                        <i className='fa fa-linkedin'></i>
                      </span>{' '} */}
                       <FacebookLogin
                      appId='422066786032438'
                      autoLoad={false}
                      fields='name,email,picture,birthday'
                      onClick={facebookClicked}
                      callback={responseFacebookProv}
                      cssClass={styles.social}
                      textButton={<i className='fa fa-facebook'></i>}
                    />
                    </div>
                    <div className='text-center mt-4'>
                      {' '}
                      <span>¿Ya estás registrado?</span>{' '}
                      <Link to='/login' className='text-decoration-none'>
                        Inicia sesión
                      </Link>{' '}
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </Col>
          </div>
        </div>
      </>
    )
  }
}

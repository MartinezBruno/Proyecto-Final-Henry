import React from 'react'
import styles from '../../styles/profile.module.css'
import Swal from 'sweetalert2'
import 'animate.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUniqueProvider, modifyProvider, getAllProviders } from '../../redux/slices/provider'

export default function ProfileEditInfo(props) {
  function handleSave() {
    props.changeForm(false)
  }

  const dispatch = useDispatch()
  const { allProviders } = useSelector((state) => state.provider)
  let providersEmail = allProviders?.map((el) => el.email)
  const { uniqueprovider } = useSelector((state) => state.provider)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getAllProviders())
    dispatch(getUniqueProvider(user.id))
  }, [dispatch])

  const [input, setInput] = useState({
    nombre_apellido_proveedor: uniqueprovider.nombre_apellido_proveedor,
    email: uniqueprovider.email,
    fecha_nacimiento: uniqueprovider.fecha_nacimiento,
    celular: uniqueprovider.celular,
  })
  const [errors, setErrors] = useState({
    nombre_apellido_proveedor: '',
    email: '',
    fecha_nacimiento: '',
    celular: '',
  })

  let handleChange = (e) => {
    e.preventDefault()
    handleErrorsProvider(e)

    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  let handleSubmit = (e) => {
    e.preventDefault()
    if (input.nombre_apellido_proveedor.length === 0 || input.email.length === 0 || input.fecha_nacimiento.length === 0 || input.celular.length === 0) {
      return Swal.fire('Error al cambiar los datos', 'Por favor Intentelo nuevamente y asegurece de llenar todos los campos', 'error')
    } else {
      //pasarle bien el ID y estamos
      dispatch(modifyProvider(user.id, input))
      handleSave()
      return Swal.fire('¡Enhorabuena!', 'Su informacion a sido actualizada con éxito', 'success')
    }
  }
  function handleErrorsProvider(e) {
    if (e.target.name === 'nombre_apellido_proveedor') {
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

      if (providersEmail.includes(e.target.value)) {
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
    }
  }
  return (
    <>
      {/* <form onSubmit={(e) => handleSubmit(e)}> */}
      <div className={`${styles.card} mb-3 ${styles.mb3}`}>
        <form autocomplete='off'>
          <div className='card-body'>
            <div className='row mb-3'>
              <div className='col-sm-3'>
                <h6 className='mb-0'>Nombre completo</h6>
              </div>
              <div className='col-sm-9 text-secondary'>
                <input
                  type='text'
                  name='nombre_apellido_proveedor'
                  className='form-control'
                  value={input.nombre_apellido_proveedor}
                  onChange={(e) => handleChange(e)}
                />
              </div>
              {errors.nombre_apellido_proveedor && (
                <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.nombre_apellido_proveedor}</p>
              )}
            </div>
            <div className='row mb-3'>
              <div className='col-sm-3'>
                <h6 className='mb-0'>Email</h6>
              </div>
              <div className='col-sm-9 text-secondary'>
                <input type='text' name='email' className='form-control' value={input.email} onChange={(e) => handleChange(e)} />
              </div>
            </div>
            {errors.email && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.email}</p>}

            <div className='row mb-3'>
              <div className='col-sm-3'>
                <h6 className='mb-0'>Fecha de Nacimiento</h6>
              </div>
              <div className='col-sm-9 text-secondary'>
                <input type='date' name='fecha_nacimiento' className='form-control' value={input.fecha_nacimiento} onChange={(e) => handleChange(e)} />
              </div>
            </div>
            {errors.fecha_nacimiento && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.fecha_nacimiento}</p>}

            <div className='row mb-3'>
              <div className='col-sm-3'>
                <h6 className='mb-0'>Celular</h6>
              </div>
              <div className='col-sm-9 text-secondary'>
                <input type='text' name='celular' className='form-control' value={input.celular} onChange={(e) => handleChange(e)} />
              </div>
            </div>
            {errors.celular && <p className={`${styles.errors} animate__animated animate__fadeInDown `}>{errors.celular}</p>}

            {/* <div className='row mb-3'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Ubicacion</h6>
            </div>
            <div className='col-sm-9 text-secondary'>
              <input
                type='text'
                name='ubicacion'
                className='form-control'
                value={input.ubicacion}
              />
            </div>
          </div> */}
            <div className='row'>
              <div className='col-sm-3'></div>
              <div className='col-sm-9 text-secondary'>
                <button type='submit' className='btn btn-primary px-4' onClick={handleSubmit}>
                  Guardar Cambios
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {/* </form> */}
    </>
  )
}

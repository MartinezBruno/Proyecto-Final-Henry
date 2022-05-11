import React from 'react'
import styles from '../../styles/profile.module.css'
import Swal from 'sweetalert2'
import 'animate.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useState } from 'react'
import { getUniqueProvider } from '../../redux/slices/provider'

export default function ProfileEditInfo(props) {
  function handleSave() {
    props.changeForm(false)
  }

  const dispatch = useDispatch()
  const { uniqueproveedor } = useSelector((state) => state.provider)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getUniqueProvider(user.id))
  }, [dispatch])

  const [input, setInput] = useState({
    nombre_apellido_usuario: uniqueproveedor?.nombre_apellido_proveedor,
    email: uniqueproveedor?.email,
    fecha_nacimiento: uniqueproveedor?.fecha_nacimiento,
    celular: uniqueproveedor?.celular,
  })

  let handleChange = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
  }

  let handleSubmit = (e) => {
    //   e.preventDefault()
    //   if (input.nombre.length === 0 || input.email.length === 0 || input.nacimiento.length === 0 || input.celular.length === 0) {
    //     return alert('Error al modificar sus Datos, Por favor llene todos los campos')
    //   } else {
    //     //pasarle bien el ID y estamos
    //     dispatch(ModifyUser(user.id, input))
    //     props.changeForm(false)
    //     return alert('Perfil Actualizado Correctamente')
    //   }
  }

  return (
    <>
      {/* <form onSubmit={(e) => handleSubmit(e)}> */}
      <div className={`${styles.card} mb-3 ${styles.mb3}`}>
        <div className='card-body'>
          <div className='row mb-3'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Nombre completo</h6>
            </div>
            <div className='col-sm-9 text-secondary'>
              <input
                type='text'
                name='nombre_apellido_usuario'
                className='form-control'
                value={input.nombre_apellido_proveedor}
                onChange={(e) => handleChange(e)}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Email</h6>
            </div>
            <div className='col-sm-9 text-secondary'>
              <input type='text' name='email' className='form-control' value={input.email} onChange={(e) => handleChange(e)} />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Fecha de Nacimiento</h6>
            </div>
            <div className='col-sm-9 text-secondary'>
              <input type='text' name='fecha_nacimiento' className='form-control' value={input.fecha_nacimiento} onChange={(e) => handleChange(e)} />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Celular</h6>
            </div>
            <div className='col-sm-9 text-secondary'>
              <input type='text' name='celular' className='form-control' value={input.celular} onChange={(e) => handleChange(e)} />
            </div>
          </div>
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
              <input type='button' className='btn btn-primary px-4' onClick={(e) => handleSubmit(e)} value='Guardar cambios' />
            </div>
          </div>
        </div>
      </div>
      {/* </form> */}
    </>
  )
}

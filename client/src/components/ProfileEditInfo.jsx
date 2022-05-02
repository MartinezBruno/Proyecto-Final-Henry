import React from 'react'
import styles from '../styles/profile.module.css'
import Swal from 'sweetalert2'
import 'animate.css'
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getUser } from '../redux/slices/user';

export default function ProfileEditInfo(props) {
  function handleSave() {
    props.changeForm(false)
  }

  const dispatch = useDispatch();
  const { UniqueUser } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUser(1))
  },[dispatch])


  return (
    <>
      <div className={`${styles.card} mb-3 ${styles.mb3}`}>
        <div className='card-body'>
          <div className='row mb-3'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Nombre completo</h6>
            </div>
            <div className='col-sm-9 text-secondary'>
              <input
                type='text'
                className='form-control'
                value={UniqueUser.nombre_apellido_usuario}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Email</h6>
            </div>
            <div className='col-sm-9 text-secondary'>
              <input
                type='text'
                className='form-control'
                value={UniqueUser.email}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Fecha de Nacimiento</h6>
            </div>
            <div className='col-sm-9 text-secondary'>
              <input
                type='text'
                className='form-control'
                value={UniqueUser.fecha_nacimiento}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Celular</h6>
            </div>
            <div className='col-sm-9 text-secondary'>
              <input
                type='text'
                className='form-control'
                value={UniqueUser.celular}
              />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Dirección</h6>
            </div>
            <div className='col-sm-9 text-secondary'>
              <input
                type='text'
                className='form-control'
                value={UniqueUser.pais + ", " + UniqueUser.provincia + ", " + UniqueUser.ciudad}
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'></div>
            <div classNameName='col-sm-9 text-secondary'>
              {/* <input
                type='button'
                className='btn btn-primary px-4'
                onClick={() => handleSave()}
                value='Guardar cambios'
              /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

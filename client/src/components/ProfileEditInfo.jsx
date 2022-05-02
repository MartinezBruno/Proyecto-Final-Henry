import React from 'react'
import styles from '../styles/profile.module.css'
import Swal from 'sweetalert2'
import 'animate.css'
export default function ProfileEditInfo(props) {
  function handleSave() {
    props.changeForm(false)
  }

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
                value='Antonio Tralice'
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
                value='toni@henry.com'
              />
            </div>
          </div>
          <div className='row mb-3'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Teléfono</h6>
            </div>
            <div className='col-sm-9 text-secondary'>
              <input
                type='text'
                className='form-control'
                value='(123) 123456789'
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
                value='(123) 123456789'
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
                value='Cordoba, Argentina'
              />
            </div>
          </div>
          <div className='row'>
            <div className='col-sm-3'></div>
            <div classNameName='col-sm-9 text-secondary'>
              <input
                type='button'
                className='btn btn-primary px-4'
                onClick={() => handleSave()}
                value='Guardar cambios'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

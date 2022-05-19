import React from 'react'
import styles from '../../styles/cards.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getServiceProvider } from '../../redux/slices/provider'
import Swal from 'sweetalert2'

export default function Card({ nombre, imagen, idProv, idServ, servicio, descripcion, provincia, ciudad, precio, calificacion }) {
  const dispatch = useDispatch()

  const { isLoggedIn } = useSelector((state) => state.auth)

  function handleSubmit(idProv, idServ) {
    dispatch(getServiceProvider(idProv, idServ))
  }

  const handleDetails = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: '<strong>Debes estar <u>Logueado</u> para poder ver mas información</strong>',
        icon: 'warning',
        html:
          '<a href="http://weattend.com.ar/login">Inicia sesión</a> para continuar con su compra. ' +
          '<br/>' +
          'Si no tienes una cuenta, <a href="http://weattend.com.ar/register">Regístrate</a> de forma rápida y sencilla.',
        showCloseButton: true,
        // showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: '<i class="fa fa-thumbs-up"></i> Cerrar',
        confirmButtonAriaLabel: 'Thumbs up, great!',
        cancelButtonText: '<i class="fa fa-thumbs-down"></i>',
        cancelButtonAriaLabel: 'Thumbs down',
      })
    } else {
      handleSubmit(idProv, idServ)
      window.location.href = `/home/${idServ}/${idProv}`
    }
  }

  return (
    <>
      <div className={`${styles.profileCard4} text-center`}>
        {/* <img src={imagen} alt={nombre} onError={(e) => e.target.src=file} className='img img-responsive' /> */}
        <img
          src={`http://localhost:3001/profiles/${imagen}`}
          alt={nombre}
          onError={(e) => (e.target.src = 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20')}
          className='img img-responsiv'
        />

        <div className={styles.profileContent}>
          <div className={styles.profileName}>
            {nombre}
            <p>{servicio}</p>
          </div>
          <div className={styles.profileDescription} style={{ fontSize: '15px', color: 'black' }}>
            {descripcion}
          </div>
          <div className={`row ${styles.profileOverview}`} style={{ marginBottom: '10px' }}>
            {/* <p style={{ fontWeight: "bold" }}>REGIÓN</p> */}
            <p style={{ fontWeight: 'bold', fontSize: '15px', color: 'black' }}>
              {provincia}, {ciudad}
            </p>
          </div>
          <div className='row align items start'>
            <div className='col'>
              <div className={styles.profileOverview}>
                <p>PRECIO</p>
                <h4>{`$ ${precio}`}</h4>
              </div>
            </div>
            <div className='col'>
              <div className={styles.profileOverview}>
                <p>CALIFICACION</p>

                <ul className='list-inline small'>
                  <div>
                    {calificacion === 1 ? (
                      <>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star-o text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star-o text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star-o text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star-o text-success'></i>
                        </li>
                      </>
                    ) : calificacion === 2 ? (
                      <>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star-o text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star-o text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star-o text-success'></i>
                        </li>
                      </>
                    ) : calificacion === 3 ? (
                      <>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star-o text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star-o text-success'></i>
                        </li>
                      </>
                    ) : calificacion === 4 ? (
                      <>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star-o text-success'></i>
                        </li>
                      </>
                    ) : calificacion === 5 ? (
                      <>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                        <li className='list-inline-item m-0'>
                          <i className='fa fa-star text-success'></i>
                        </li>
                      </>
                    ) : (
                      <p style={{ fontWeight: 'bold', color: 'black', fontSize: '13px' }}>Sin Calificaciones</p>
                    )}
                  </div>
                  {/* CIERRA MAPEO CALIFICACION */}
                </ul>
              </div>
            </div>
          </div>
          <div className={`${styles.profileOverview} `}>
            <button type='submit' className='btn btn-success' style={{ width: '90%' }} onClick={() => handleDetails(idProv, idServ)}>
              MAS INFORMACION
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

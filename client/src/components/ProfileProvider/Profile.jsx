import React, { useState } from 'react'
import { useEffect } from 'react'
import styles from '../../styles/profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import ProfileEditInfoProv from './ProfileEditInfo'
import ProfileShowInfoProv from './ProfileShowInfo'
import { getUniqueProvider } from '../../redux/slices/provider'
import AddService from '../Services/AddService'
import DeleteService from '../Services/DeleteService'

function ProfileProveedor() {
  const [isEditing, setEditing] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { uniqueprovider } = useSelector((state) => state.provider)

  useEffect(() => {
    dispatch(getUniqueProvider(user.id))
  }, [dispatch])

  return (
    <>
      <div className='container' style={{ marginTop: '20px' }}>
        <div className={styles.mainBody}>
          <div className={`row gutters-sm ${styles.guttersSm}`}>
            <div className={`col-md-4 mb-3 ${styles.mb3}`}>
              <div className={styles.card}>
                <div className={`card-body ${styles.cardBody}`}>
                  <div className='d-flex flex-column align-items-center text-center'>
                    <img
                      src={`http://localhost:3001/profiles/${uniqueprovider.imagen}`}
                      alt={uniqueprovider.nombre_apellido_usuario}
                      className='rounded-circle'
                      width='150'
                      onError={(e) => (e.target.src = 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20')}
                    />
                    <div className='mt-3'>
                      <h4>{uniqueprovider?.nombre_apellido_proveedor}</h4>
                      <p className='text-muted font-size-sm'>{user.Role}</p>
                      <p className='text-muted font-size-sm'>{uniqueprovider?.pais + ', ' + uniqueprovider?.provincia}</p>
                      <br />
                      <h4>
                        Disponibilidad horaria: <span>{uniqueprovider.hora_inicio === 'Sin definir' ? '08:00' : uniqueprovider.hora_inicio}</span>-
                        <span>{uniqueprovider.hora_final === 'Sin definir' ? '18:00' : uniqueprovider.hora_final}</span>
                      </h4>

                      {/* <button className="btn btn-primary" style={{margin: '7px'}}>Follow</button>
                  <button className="btn btn-outline-primary">Mensaje</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-8'>{isEditing ? <ProfileEditInfoProv changeForm={setEditing} /> : <ProfileShowInfoProv changeForm={setEditing} />}</div>
            <div className={`${styles.cardBody}`}>
              <table className='table table-hover text-center'>
                <thead>
                  <tr style={{ border: 'none' }}>
                    <th scope='col'>NOMBRE</th>
                    <th scope='col'>REMOTO</th>
                    <th scope='col'>COSTO</th>
                    <th scope='col'>DETALLES SERVICIO</th>
                    <th scope='col'> </th>
                  </tr>
                </thead>
                <tbody>
                  {/* MAP DE TODOS LOS SERVICIOS */}

                  {uniqueprovider.servicios?.map((serv) => {
                    if (serv.nombre !== 'Sin servicios disponibles')
                      return (
                        <tr>
                          <td>{serv.nombre}</td>
                          {serv.remote === true ? (
                            <td>
                              <i className='fa fa-check text-success' aria-hidden='true'></i>
                            </td>
                          ) : (
                            <td>
                              <i className='fa fa-times text-danger' aria-hidden='true'></i>
                            </td>
                          )}
                          <td>{'$' + serv.precio}</td>
                          <td>{serv.descripcion}</td>
                        </tr>
                      )
                  })}
                </tbody>
              </table>
              <div className={`d-flex justify-content-center`}>
                <div className='mx-3'>
                  <AddService />
                </div>
                <div className='mx-3'>
                  <DeleteService />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileProveedor

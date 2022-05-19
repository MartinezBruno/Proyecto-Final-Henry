import React, { useState } from 'react'
import { useEffect } from 'react'
import { getUser } from '../../redux/slices/user'
import styles from '../../styles/profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import ProfileEditInfoUser from './ProfileEditInfo'
import ProfileShowInfoUser from './ProfileShowInfo'
import ComprasUsuario from '../Payment/ComprasUsuario'
import ChangePassword from '../ChangePassword'

function ProfileUser() {
  const [isEditing, setEditing] = useState(false)

  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { UniqueUser } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getUser(user.id))
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
                      src={`http://localhost:3001/profiles/${UniqueUser.imagen}`}
                      alt={UniqueUser.nombre_apellido_usuario}
                      className='rounded-circle'
                      width='150'
                      onError={(e) => (e.target.src = 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20')}
                    />
                    <div className='mt-3'>
                      <h4>{UniqueUser.nombre_apellido_usuario}</h4>
                      <p className='text-muted font-size-sm'>{user.Role}</p>
                      <p className='text-muted font-size-sm'>{UniqueUser.pais + ', ' + UniqueUser.provincia}</p>
                      <br />
                      <p>¿Quieres cambiar tu contraseña?</p>
                      <ChangePassword />
                      {/* <button className="btn btn-primary" style={{margin: '7px'}}>Follow</button>
                  <button className="btn btn-outline-primary">Mensaje</button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-md-8'>{isEditing ? <ProfileEditInfoUser changeForm={setEditing} /> : <ProfileShowInfoUser changeForm={setEditing} />}</div>
          </div>
          <ComprasUsuario />
        </div>
      </div>
    </>
  )
}

export default ProfileUser

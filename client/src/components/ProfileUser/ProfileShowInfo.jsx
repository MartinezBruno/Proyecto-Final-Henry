import React from 'react'
import styles from '../../styles/profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { getUser } from '../../redux/slices/user'

export default function ProfileShowInfo(props) {
  function handleSave() {
    props.changeForm(true)
  }

  const dispatch = useDispatch()
  const { UniqueUser } = useSelector((state) => state.user)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getUser(user.id))
  }, [dispatch])

  // console.log(props.changeForm)
  return (
    <>
      <div className={`${styles.card} mb-3 ${styles.mb3}`}>
        <div className={`card-body ${styles.cardBody}`}>
          <div className='row'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Nombre completo</h6>
            </div>
            <div className='col-sm-9 text-secondary'>{UniqueUser.nombre_apellido_usuario}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Email</h6>
            </div>
            <div className='col-sm-9 text-secondary'>{UniqueUser.email}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Fecha de Nacimiento</h6>
            </div>
            <div className='col-sm-9 text-secondary'>{UniqueUser.fecha_nacimiento}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Celular</h6>
            </div>
            <div className='col-sm-9 text-secondary'>{UniqueUser.celular}</div>
          </div>
          <hr />
          {/* <div className='row'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Ubicacion</h6>
            </div>
            <div className='col-sm-9 text-secondary'>{`${UniqueUser.pais}, ${UniqueUser.provincia}, ${UniqueUser.ciudad}`}</div>
          </div> 
          <hr /> */}
          <div className='row'>
            <div className='col-sm-12'>
              <button className='btn btn-dark' onClick={handleSave}>
                EDITAR
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

import React from 'react'
import styles from '../../styles/profile.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import ChangePassword from '../ChangePassword'
import { getUniqueProvider } from '../../redux/slices/provider'
import EditarDisponibilidad from './EditarDisponibilidad'
import EventosProvider from './EventosProvider'

export default function ProfileShowInfo(props) {
  function handleSave() {
    props.changeForm(true)
  }

  const dispatch = useDispatch()
  const { uniqueprovider } = useSelector((state) => state.provider)
  const { user } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getUniqueProvider(user.id))
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
            <div className='col-sm-9 text-secondary'>{uniqueprovider?.nombre_apellido_proveedor}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Email</h6>
            </div>
            <div className='col-sm-9 text-secondary'>{uniqueprovider?.email}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Fecha de Nacimiento</h6>
            </div>
            <div className='col-sm-9 text-secondary'>{uniqueprovider?.fecha_nacimiento}</div>
          </div>
          <hr />
          <div className='row'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Celular</h6>
            </div>
            <div className='col-sm-9 text-secondary'>{uniqueprovider?.celular}</div>
          </div>
          <hr />
          {/* <div className='row'>
            <div className='col-sm-3'>
              <h6 className='mb-0'>Ubicacion</h6>
            </div>
            <div className='col-sm-9 text-secondary'>{`${uniqueprovider?.pais}, ${uniqueprovider?.provincia}, ${uniqueprovider?.ciudad}`}</div>
          </div> 
          <hr /> */}
          <div className='row'>
            <div className='col-sm-12'>
              <button type='submit' className='btn btn-dark' onClick={handleSave}>
                EDITAR
              </button>
              <ChangePassword />
              <EditarDisponibilidad />
              <EventosProvider />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

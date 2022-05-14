import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddEmergency from './AddEmergency'
import styles from '../../styles/emergencies.module.css'
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import api from '../../services/api'
import {chargeUserEmergency} from '../../redux/slices/emergency'
import { Button } from 'react-bootstrap'




export default function UserEmergency(props) {
  let { userEmergency, dbServices } = props
  const { user } = useSelector((state) => state.auth)

  let dispatch = useDispatch();
  function handleDelete(idUser) {
    Swal.fire({
      title: '¿Estás segur@?',
      text: 'Tu emergencia se eliminará, pero podrás crear otra nuevamente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        api
          .delete('/emergencia', { data: { UsuarioId: idUser } })
          .then((res) => {
            console.log('entro al then')
            Swal.fire('¡Emergencia eliminada!', 'Se ha eliminado con éxito.', 'success')
            dispatch(chargeUserEmergency({ UsuarioId: user.id }))
          })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `No se ha podido eliminar tu emergencia, intenta nuevamente`,
            })
          })
      }
    })
  }
  return (
    <>
      <div className='container mt-3'>
        <div className='row align-items-center justify-content-center text-center'>
          <h3>Tu emergencia activa</h3>
          <hr />
          <AddEmergency />
          {console.log(userEmergency)}
          {userEmergency?.length > 0 && (
            <>
              <div className={styles.emergencyMainContainer}>
                <h2>{dbServices?.length > 0 && dbServices.filter(obj => obj.id === userEmergency[0].ServicioId)[0]?.nombre}</h2>
                <p>
                  <i>
                    Creada{' '}
                    <Moment fromNow locale='es'>
                      {userEmergency[0].createdAt}
                    </Moment>
                  </i>
                </p>
                <div className='attribute'>
                  <p>
                    <b>Espera máxima:</b>
                  </p>{' '}
                  <p>{userEmergency[0].ESPERA_MAXIMA}</p>
                </div>
                <p>
                  <b>Precio máximo:</b>
                </p>{' '}
                <p>$ {userEmergency[0].PRECIO_MAXIMO}</p>
                <Button
                  variant='danger'
                  style={{ margin: '10px 0px 0px 5px' }}
                  onClick={() => {
                    handleDelete(user.id)
                  }}>
                  ELIMINAR
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddEmergency from './AddEmergency'
import styles from '../../styles/emergencies.module.css'
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import api from '../../services/api'
import {chargeUserEmergency} from '../../redux/slices/emergency'
import { Button } from 'react-bootstrap'




export default function ProvEmergency(props) {
  let { providerEmergency, dbServices } = props
  const { user } = useSelector((state) => state.auth)

  let dispatch = useDispatch();

  function handleTake(idUser, idProv, idServ) {
    Swal.fire({
      title: '¿Estás segur@?',
      text: 'Si tomas la emergencia, no podrás cancelarla. Solo tomala si estas realmente seguro de poder cumplir.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {

        console.log(idUser, idProv, idServ)
        api
          .put('/emergencia', { UsuarioId: idUser, ProveedorId: idProv, ServicioId: idServ } )
          .then((res) => {
             Swal.fire('¡Haz tomado la emergencia!', 'Cuando el cliente termine la compra, podrán contactarse', 'success')
            })
          .catch((err) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: `No has podido tomar la emergencia, tienes otra emergencia en proceso.`,
            })
          })
      }
    })
  }
  return (
    <>
      <div className='container mt-3'>
        <div className='row align-items-center justify-content-center text-center'>
          <h3>Emergencias disponibles para tí</h3>
          <hr />

          <div className={styles.emergenciesContainer}>

            {dbServices?.length>0 && providerEmergency.map(el => {
                return <div className={styles.providerCards}>
                <h2>{dbServices?.filter(obj => obj.id === el.ServicioId)[0]?.nombre}</h2>
                <p><b>ESPERA MÁXIMA:</b></p>
                <p> {el.ESPERA_MAXIMA}</p>
                <p><b>PRECIO MÁXIMO:</b></p>
                    <p>$ {el.PRECIO_MAXIMO}</p>
                    <p><i>Publicado <Moment fromNow locale='es'>
                      {el.createdAt}
                    </Moment>
                    </i>
                    </p>
                    <Button
                  variant='success'
                  style={{ margin: '10px 0px 0px 5px' }}
                  onClick={() => {
                    handleTake(el.UsuarioId, user.id, el.ServicioId)
                  }}>
                  TOMAR EMERGENCIA
                </Button>
                </div>
            })}

            </div>


        </div>
      </div>
    </>
  )
}

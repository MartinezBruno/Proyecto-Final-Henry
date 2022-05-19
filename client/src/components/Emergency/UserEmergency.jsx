import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import AddEmergency from './AddEmergency'
import styles from '../../styles/emergencies.module.css'
import Moment from 'react-moment'
import Swal from 'sweetalert2'
import api from '../../services/api'
import { chargeUserEmergency } from '../../redux/slices/emergency'
import { payServices, addToCart, clearCart } from '../../redux/slices/shoppingCart'
import { Button } from 'react-bootstrap'

export default function UserEmergency(props) {
  let { userEmergency, dbServices, allProviders } = props
  const { user } = useSelector((state) => state.auth)
  const { services } = useSelector((state) => state.auth)
  let dispatch = useDispatch()

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
            Swal.fire('¡Emergencia eliminada!', 'Se ha eliminado con éxito.', 'success')
            dispatch(chargeUserEmergency(user.id))
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

  function handleDone(idUser) {
    Swal.fire({
      title: '¿Estás segur@?',
      text: 'Solo realiza esta acción si el servicio ha terminado.',
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
            Swal.fire('¡Emergencia terminada!', 'Esperamos que haya sido de tu agrado.', 'success')
            dispatch(chargeUserEmergency(user.id))
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
  const handlePay = async (objService) => {
    dispatch(clearCart())
    dispatch(addToCart(objService))
    let url = await dispatch(payServices([objService]))
    window.location.href = `${url.init_point}`
  }

  return (
    <>
      <div className='container mt-3'>
        <div className='row align-items-center justify-content-center text-center'>
          <h3>Tu emergencia activa</h3>
          <hr />
          <AddEmergency />
          {userEmergency?.length > 0 && (
            <>
              <div className={styles.emergencyMainContainer}>
                <h2 style={{ marginBottom: '0px' }}>
                  {dbServices?.length > 0 && dbServices.filter((obj) => obj.id === userEmergency[0].ServicioId)[0]?.nombre}
                </h2>
                <p>
                  <i>
                    Creada{' '}
                    <Moment fromNow locale='es'>
                      {userEmergency[0].createdAt}
                    </Moment>
                  </i>
                </p>
                <div className='attribute'>
                  <p style={{ marginBottom: '0px' }}>
                    <b>Espera máxima:</b>
                  </p>{' '}
                  <p>{userEmergency[0].ESPERA_MAXIMA}</p>
                </div>
                {userEmergency[0].ProveedorId === null && (
                  <>
                    <p style={{ marginBottom: '0px' }}>
                      <b>Precio máximo:</b>
                    </p>{' '}
                    <p>$ {userEmergency[0].PRECIO_MAXIMO}</p>
                  </>
                )}

                {userEmergency[0].ProveedorId !== null && (
                  <>
                    <p style={{ marginBottom: '0px' }}>
                      <b>Precio del servicio actual:</b>
                    </p>{' '}
                    <p>
                      ${' '}
                      {
                        allProviders.filter((el) => el.id === userEmergency[0].ProveedorId && el.servicio.id === userEmergency[0].ServicioId)[0]?.servicio
                          .precio
                      }
                    </p>
                    <p>
                      <span>
                        <b>Nombre proveedor: </b>
                        {
                          allProviders.filter((el) => el.id === userEmergency[0].ProveedorId && el.servicio.id === userEmergency[0].ServicioId)[0]
                            ?.nombre_apellido_proveedor
                        }
                      </span>{' '}
                      <br />
                      <b>Ciudad: </b>
                      <span>
                        {' ' +
                          allProviders.filter((el) => el.id === userEmergency[0].ProveedorId && el.servicio.id === userEmergency[0].ServicioId)[0]?.provincia +
                          ', '}{' '}
                      </span>
                      <span>
                        {allProviders.filter((el) => el.id === userEmergency[0].ProveedorId && el.servicio.id === userEmergency[0].ServicioId)[0]?.ciudad +
                          ', '}{' '}
                      </span>
                      <span>
                        {allProviders.filter((el) => el.id === userEmergency[0].ProveedorId && el.servicio.id === userEmergency[0].ServicioId)[0]?.pais}
                      </span>
                    </p>
                  </>
                )}
                {userEmergency[0].ProveedorId !== null && (
                  <p className='text-success' style={{ margin: '5px 15px 0px 15px', fontSize: '12px' }}>
                    Un proveedor ha tomado tu emergencia, podrás contactarlo al finalizar tu pago.
                  </p>
                )}
                {userEmergency[0].ProveedorId === null && (
                  <Button
                    variant='danger'
                    style={{ margin: '10px 0px 0px 5px' }}
                    onClick={() => {
                      handleDelete(user.id)
                    }}>
                    ELIMINAR
                  </Button>
                )}
                {userEmergency[0].ProveedorId !== null && userEmergency[0].COMPRA_SUCCES == 'No' && (
                  <Button
                    variant='success'
                    style={{ margin: '10px 0px 0px 5px' }}
                    onClick={() => {
                      handlePay({
                        id: dbServices?.length > 0 && dbServices.filter((obj) => obj.id === userEmergency[0].ServicioId)[0]?.id,
                        nombre: dbServices?.length > 0 && dbServices.filter((obj) => obj.id === userEmergency[0].ServicioId)[0]?.nombre,
                        precio: allProviders.filter((el) => el.id === userEmergency[0].ProveedorId && el.servicio.id === userEmergency[0].ServicioId)[0]
                          ?.servicio.precio,
                        descripcion: allProviders.filter((el) => el.id === userEmergency[0].ProveedorId && el.servicio.id === userEmergency[0].ServicioId)[0]
                          ?.servicio.descripcion,
                        provID: userEmergency[0].ProveedorId,
                      })
                    }}>
                    PAGAR EMERGENCIA
                  </Button>
                )}
                {userEmergency[0].ProveedorId !== null && userEmergency[0].COMPRA_SUCCES == 'Si' && (
                  <>
                    <Button
                      variant='success'
                      style={{ margin: '10px 0px 0px 5px' }}
                      onClick={() => {
                        window.location.href = './purchases'
                      }}>
                      IR A MIS COMPRAS
                    </Button>

                    <Button
                      variant='danger'
                      style={{ margin: '10px 0px 0px 5px' }}
                      onClick={() => {
                        handleDone(user.id)
                      }}>
                      Finalizar emergencia
                    </Button>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  )
}

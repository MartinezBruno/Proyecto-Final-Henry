import React from 'react'
import Button from 'react-bootstrap/Button'
import Swal from 'sweetalert2'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearCart, payServices } from '../../redux/slices/shoppingCart'
import { addEvent } from '../../redux/slices/events'
import CartServices from './CartServices'
import styles from '../../styles/shopping.module.css'

export default function Shopping() {
  let { services, acumServices } = useSelector((state) => state.shoppingCart)
  let { eventosAgendados, agendados } = useSelector((state) => state.events)
  let { user } = useSelector((state) => state.auth)
  if (user.Role === 'USUARIO') {
    var userId = user.id
  }

  let dispatch = useDispatch()

  const handleOnClick = async (services) => {
    localStorage.setItem('events', JSON.stringify(eventosAgendados))
    let url = await dispatch(payServices(services))
    window.location.href = `${url.init_point}`
  }

  return (
    <>
      <div className='container' style={{ marginTop: '2rem' }}>
        <div className='row align-items-center justify-content-center text-center'>
          <div>
            <h3>Ya casi terminamos...</h3>
            <br />
            <table className='table' style={{maxWidth:'300px!important'}}>
              <thead className='table-dark'>
                <tr style={{ border: 'none' }}>
                  <th scope='col'>AGENDAR</th>
                  <th scope='col'>SERVICIO</th>
                  <th scope='col' className={styles.hideOnSmall}>COSTO</th>
                  <th scope='col' className={styles.hideOnSmall}>CANTIDAD</th>
                  <th scope='col'>TOTAL</th>
                  <th scope='col'> </th>
                </tr>
              </thead>
              <tbody>
                {/* MAP DE TODOS LOS SERVICIOS */}

                {acumServices?.map((serv) => {
                  return (
                    <CartServices
                      key={serv.id}
                      servicio={serv}
                      id={serv.id}
                      provName={serv.provName}
                      provID={serv.provID}
                      nombreServ={serv.nombre}
                      precio={serv.precio}
                      count={serv.count}
                      remote={serv.remote}
                    />
                  )
                })}
              </tbody>
            </table>
            <div className='container text-center'>
              <div className='container text-center'>
                {acumServices?.length > 0 ? (
                  <Button variant='outline-danger' onClick={() => dispatch(clearCart())}>
                    Limpiar carrito
                  </Button>
                ) : (
                  <p>AUN NO AGREGAS NADA A TU CARRITO</p>
                )}
              </div>
            </div>

            <div>
              <span style={{ fontSize: '1.5rem' }}>
                <b>TOTAL: </b> $ {services?.reduce((acumulador, actual) => acumulador + actual.precio, 0)}
              </span>
            </div>

            <Link to='/home'>
              <Button variant='secondary' style={{ margin: '.8rem' }}>
                Seguir buscando
              </Button>
            </Link>
            {agendados ? null : services?.length === eventosAgendados?.length && services.length > 0 ? (
              <Button variant='success' onClick={(e) => handleOnClick(services)}>
                <i className='fa fa-lock' aria-hidden='true'></i> Pagar Ahora
              </Button>
            ) : (
              <h3>Aun faltan agendar {services?.length - eventosAgendados?.length} servicios</h3>
            )}

            {/* {acumServices.length > 0 ? (
              <Button variant='success' onClick={() => handleOnClick({ services: services })}>
                <i className='fa fa-lock' aria-hidden='true'></i> PAGAR AHORA
              </Button>
            ) : null} */}
          </div>
        </div>
      </div>
    </>
  )
}

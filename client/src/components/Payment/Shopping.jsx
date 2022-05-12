import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from '../../styles/FloatCartButton.module.css'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { deleteService, payServices, deleteAllOfOneService, addToCart, clearCart } from '../../redux/slices/shoppingCart'
import ButtonGroup from 'react-bootstrap/ButtonGroup'

export default function Shopping() {
  let { services, acumServices } = useSelector((state) => state.shoppingCart)
  let dispatch = useDispatch()

  const handleOnClick = async (services) => {
    let url = await dispatch(payServices(services))
    window.location.href = `${url.init_point}`
  }

  return (
    <>
      <div className='container' style={{ marginTop: '2rem' }}>
        <div className='row align-items-center justify-content-center text-center'>
          <div className='col-6'>
            <h3>Ya casi terminamos...</h3>
            <br />
            <table className='table'>
              <thead className='table-dark'>
                <tr style={{ border: 'none' }}>
                  <th scope='col'>SERVICIO</th>
                  <th scope='col'>COSTO</th>
                  <th scope='col'>CANTIDAD</th>
                  <th scope='col'>TOTAL</th>
                  <th scope='col'> </th>
                </tr>
              </thead>
              <tbody>
                {/* MAP DE TODOS LOS SERVICIOS */}

                {acumServices?.map((serv) => {
                  return (
                    <tr>
                      <td>
                        <div style={{ marginTop: '1%' }}>
                          <span className={styles.servName}>{serv.nombre}</span>

                          <p className={styles.provName}>{serv.provName}</p>
                          {serv.remote ? <Badge bg='secondary'>Remoto</Badge> : <Badge bg='secondary'>Presencial</Badge>}
                        </div>
                      </td>

                      <td>
                        <p style={{ marginTop: '40%' }}>{'$' + serv.precio}</p>
                      </td>

                      <td>
                        <p style={{ marginTop: '25%' }}>{serv.count}</p>
                      </td>

                      <td>
                        <p style={{ marginTop: '40%' }}>{'$' + serv.count * serv.precio}</p>
                      </td>
                      <td className={styles.flexTd}>
                        <ButtonGroup size='sm' style={{ marginTop: '20%' }}>
                          <Button
                            variant='secondary'
                            style={{ fontSize: '0.8rem' }}
                            onClick={() => {
                              dispatch(addToCart(serv))
                            }}>
                            <i className='fa fa-plus-circle' aria-hidden='true'></i>
                          </Button>
                          <Button
                            variant='secondary'
                            style={{ fontSize: '0.8rem' }}
                            onClick={() => {
                              dispatch(deleteService(services, serv.id, serv.provID))
                            }}>
                            {' '}
                            <i className='fa fa-minus-circle' aria-hidden='true'></i>
                          </Button>
                          <Button
                            variant='danger'
                            onClick={() => {
                              dispatch(deleteAllOfOneService(services, serv.id, serv.provID))
                            }}>
                            <i className='fa fa-trash' aria-hidden='true'></i>
                          </Button>
                        </ButtonGroup>
                        {/* <button
                          className='btn btn-danger'
                          style={{ padding: '5px', margin: '1rem 0px' }}
                          onClick={() => {
                            dispatch(deleteService(serv.id))
                            // localStorage.setItem('cartList', JSON.stringify([...services ]))
                            localStorage.setItem('cartList', JSON.stringify(services.slice(0, services.length - 1)))
                          }}>
                          {' '}
                          <i className='fa fa-trash' aria-hidden='true'></i>
                          <span> Quitar</span>
                        </button> */}
                      </td>
                    </tr>
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
            {acumServices.length > 0 ? (
              <Button variant='success' onClick={() => handleOnClick({ services: services })}>
                <i className='fa fa-lock' aria-hidden='true'></i> PAGAR AHORA
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </>
  )
}

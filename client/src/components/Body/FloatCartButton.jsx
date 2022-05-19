import React, { useState, useEffect } from 'react'
import styles from '../../styles/FloatCartButton.module.css'
import { useSelector, useDispatch } from 'react-redux'
import 'animate.css'
import Offcanvas from 'react-bootstrap/Offcanvas'
import { deleteService, deleteAllOfOneService, addToCart, updateStateFromStorage, setAcumServices, clearCart } from '../../redux/slices/shoppingCart'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Swal from 'sweetalert2'

export default function FloatCartButton() {
  const { services, acumServices } = useSelector((state) => state.shoppingCart)
  const { isLoggedIn } = useSelector((state) => state.auth)
  let dispatch = useDispatch()

  let servicesToMap = [...services]

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('cartList'))?.length > 0) {
      dispatch(updateStateFromStorage(JSON.parse(localStorage.getItem('cartList'))))
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(setAcumServices(services))
  }, [services])

  //Control del overlay del carrito:
  const [show, setShow] = useState(false)
  const handleShow = () => setShow(true)
  const handleClose = () => setShow(false)
  const handleFinish = () => {
    if (!isLoggedIn) {
      Swal.fire({
        title: '<strong>Debes estar <u>Logueado</u> para poder comprar</strong>',
        icon: 'warning',
        html:
          '<a href="http://weattend.com.ar/login">Inicia sesión</a> para continuar con su compra. ' +
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
      window.location.href = '/shopping'
    }
  }
  //Objeto del carrito acumulativo

  // let individualServices = {}

  // services?.forEach(el=>{

  //   if(individualServices[[`${el.id}_${el.provID}`]]){
  //     individualServices[`${el.id}_${el.provID}`].count++
  //   } else {
  //     individualServices[`${el.id}_${el.provID}`] = {id: el.id, nombre: el.nombre, remote: el.remote, precio: el.precio, descripcion:el.descripcion, provID:el.provID, provName: el.provName, count:1 }
  //   }
  // })

  // let acumServices = function(){
  //   let servicesArr=[];
  //   for (let prop in individualServices){
  //     servicesArr.push(individualServices[prop])
  //   }
  //   return servicesArr
  // }()
  // console.log(individualServices)
  // console.log(acumServices)

  if (services?.length > 0) {
    return (
      <>
        <div className={`animate__animated animate__bounceIn ${styles.floatingContainer}`}>
          <div className={`${styles.floatingButton}`} onClick={handleShow}>
            <i className='fa fa-shopping-cart' aria-hidden='true' style={{ margin: '5px' }}></i> Ver carrito ({services.length})
          </div>
        </div>

        <Offcanvas show={show} onHide={handleClose} placement={'end'}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Lista de servicios</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <table className='table table-hover text-center'>
              <thead>
                <tr style={{ border: 'none' }}>
                  <th scope='col'>SERVICIO</th>
                  <th scope='col'>PRECIO</th>
                  <th scope='col'></th>
                </tr>
              </thead>
              <tbody>
                {/* MAP DE TODOS LOS SERVICIOS */}

                {acumServices?.map((serv) => {
                  return (
                    <tr>
                      <td>
                        <div style={{ marginTop: '1%' }}>
                          <span className={styles.servName}>
                            {serv.nombre} <b>x{serv.count}</b>
                          </span>

                          <p className={styles.provName}>{serv.provName}</p>
                          {serv.remote ? <Badge bg='secondary'>Remoto</Badge> : <Badge bg='secondary'>Presencial</Badge>}
                        </div>
                      </td>

                      <td>
                        <p style={{ marginTop: '30%' }}>{'$' + serv.precio * serv.count}</p>
                      </td>
                      <td className={styles.flexTd}>
                        <ButtonGroup size='sm' style={{ marginTop: '20%' }}>
                          <Button
                            variant='secondary'
                            style={{ fontSize: '0.8rem' }}
                            onClick={() => {
                              dispatch(deleteService(services, serv.id, serv.provID))
                            }}>
                            {' '}
                            <i class='fa fa-minus-circle' aria-hidden='true'></i>
                          </Button>
                          <Button
                            variant='secondary'
                            style={{ fontSize: '0.8rem' }}
                            onClick={() => {
                              dispatch(addToCart(serv))
                            }}>
                            <i class='fa fa-plus-circle' aria-hidden='true'></i>
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
                            dispatch(deleteService(services, serv.id, serv.provID))
                          }}>
                          {' '}
                          <i className='fa fa-trash' aria-hidden='true'></i>
                        </button> */}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            <div className='container text-center'>
              <Button variant='outline-danger' onClick={() => dispatch(clearCart())}>
                Limpiar carrito
              </Button>
            </div>

            <div className={`${styles.buttonsFlex}`}>
              <div>
                <span style={{ fontSize: '1.2rem' }}>
                  <b>TOTAL:</b> $ {servicesToMap.reduce((acumulador, actual) => acumulador + actual.precio, 0)}
                </span>
              </div>
              <div>
                <Button variant='success' style={{ width: '100%' }} onClick={handleFinish}>
                  <i className='fa fa-lock' aria-hidden='true'></i> Terminar compra
                </Button>
              </div>
            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
  } else return null
}

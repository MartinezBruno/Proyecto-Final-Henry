import React, { useState, useEffect } from 'react';
import styles from '../styles/FloatCartButton.module.css';
import { useSelector, useDispatch } from 'react-redux';
import 'animate.css';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { deleteService, updateStateFromStorage } from '../redux/slices/shoppingCart';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';

export default function FloatCartButton() {
    const { services  } = useSelector((state) => state.shoppingCart);

    let dispatch = useDispatch()



 
  let servicesToMap = [...services]
  

  useEffect(() => {
    if(JSON.parse(localStorage.getItem('cartList'))?.length > 0){
        dispatch(updateStateFromStorage(JSON.parse(localStorage.getItem('cartList'))))
    }
  }, [dispatch])

  //Control de la info del carrito:
  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  if (services?.length > 0) {
    return (
      <>
        <div
          className={`animate__animated animate__bounceIn ${styles.floatingContainer}`}>
          <div className={`${styles.floatingButton}`} onClick={handleShow}>
            <i
              className='fa fa-shopping-cart'
              aria-hidden='true'
              style={{ margin: '5px' }}></i>{' '}
            Ver carrito
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
                  <th scope='col'> </th>
                </tr>
              </thead>
              <tbody>
                {/* MAP DE TODOS LOS SERVICIOS */}

                {servicesToMap?.map((serv) => {
                  return (
                    <tr>
                      <td>
                          <div style={{marginTop:'1%'}}>
                          <span className={styles.servName}>{serv.nombre}</span>
                          
                          <p className={styles.provName}>{serv.provName}</p>
                          {serv.remote ? (
                            <Badge bg="secondary">Remoto</Badge>
                             
                          ) : (
                            <Badge bg="secondary">Presencial</Badge>
                          )}
                      </div>
                      </td>

                      <td><p style={{marginTop: '40%'}}>{'$' + serv.precio}</p></td>
                      <td className={styles.flexTd}>
                        <button
                          className='btn btn-danger'
                          style={{ padding: '5px', margin: '1rem 0px'  }}
                          onClick={() => {
                            dispatch(deleteService(serv.id));
                            // localStorage.setItem('cartList', JSON.stringify([...services ]))
                            localStorage.setItem('cartList', JSON.stringify(services.slice(0, services.length-1)))
                            
                            
                          }}>
                          {' '}
                          <i className="fa fa-trash" aria-hidden="true"></i>
                          <span>  Quitar</span>
                        </button>
                      </td>
                    </tr>

                    
                  )
                })}
              </tbody>
            </table>

            <div className={`${styles.buttonsFlex}`}>

                     <Button variant="success" style={{width:'100%'}}><i className="fa fa-lock" aria-hidden="true"></i> Terminar compra</Button>

            </div>
          </Offcanvas.Body>
        </Offcanvas>
      </>
    )
  } else return null
}

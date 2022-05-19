import React, { useState } from 'react'
import styles from '../../styles/FloatCartButton.module.css'
import stylesRes from '../../styles/shopping.module.css'
import { Modal } from 'react-bootstrap'
import Badge from 'react-bootstrap/Badge'
import { useDispatch, useSelector } from 'react-redux'
import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import { addToCart, deleteAllOfOneService, deleteService, payServices } from '../../redux/slices/shoppingCart'
import Calendar from '../Calendar/Calendar'
import { getUniqueProvider } from '../../redux/slices/provider'
import moment from 'moment'

function CartServices({ id, provName, provID, nombreServ, precio, count, remote, servicio }) {
  const dispatch = useDispatch()
  let { services } = useSelector((state) => state.shoppingCart)
  const { uniqueprovider } = useSelector((state) => state.provider)
  const [showCalendar, setShowCalendar] = useState(false)
  const [fullscreen, setFullscreen] = useState(true)

  const handleCloseCalendar = () => setShowCalendar(false)
  const handleShowCalendar = (e) => {
    // console.log(moment().hour(18).minutes(0).format('HH:mm'))
    // console.log(moment().hour(9).minutes(0).format('HH:mm'))
    dispatch(getUniqueProvider(provID))
    // console.log(uniqueprovider)

    setShowCalendar(true)
    setFullscreen(true)
  }

  return (
    <>
      <tr>
        <td>
          <div className='mt-4'>
            <button onClick={handleShowCalendar} className='btn btn-primary' style={{ fontSize: '.7rem' }}>
              Agregar Evento
            </button>
            <Modal show={showCalendar} onHide={handleCloseCalendar} fullscreen={fullscreen}>
              <Modal.Header closeButton>
                <Modal.Title>
                  <h5>Agendar evento</h5>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body className='d-flex justify-content-center align-items-center flex-row'>
                <Calendar isModal={true} provID={provID} service={servicio} horaInicio={uniqueprovider.hora_inicio} horaFinal={uniqueprovider.hora_final} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant='primary' onClick={handleCloseCalendar}>
                  Confirmar
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </td>
        <td>
          <div style={{ marginTop: '1%' }}>
            <span className={styles.servName}>{nombreServ}</span>

            <p className={styles.provName}>{provName}</p>
            {remote ? <Badge bg='secondary'>Remoto</Badge> : <Badge bg='secondary'>Presencial</Badge>}
          </div>
        </td>

        <td className={stylesRes.hideOnSmall}>
          <p style={{ marginTop: '40%' }}>{'$' + precio}</p>
        </td>

        <td className={stylesRes.hideOnSmall}>
          <p style={{ marginTop: '25%' }}>{count}</p>
        </td>
        <td>
          <p style={{ marginTop: '40%' }}>{'$' + count * precio}</p>
        </td>

        <td className={styles.flexTd}>
          <ButtonGroup size='sm' style={{ marginTop: '20%' }}>
            <Button
              variant='secondary'
              style={{ fontSize: '0.8rem' }}
              onClick={() => {
                dispatch(deleteService(services, id, provID))
              }}>
              {' '}
              <i className='fa fa-minus-circle' aria-hidden='true'></i>
            </Button>
            <Button
              variant='secondary'
              style={{ fontSize: '0.8rem' }}
              onClick={() => {
                dispatch(addToCart(servicio))
              }}>
              <i className='fa fa-plus-circle' aria-hidden='true'></i>
            </Button>
            <Button
              variant='danger'
              onClick={() => {
                dispatch(deleteAllOfOneService(services, id, provID))
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
    </>
  )
}

export default CartServices

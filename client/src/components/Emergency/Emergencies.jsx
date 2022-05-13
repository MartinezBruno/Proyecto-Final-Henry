import React from 'react'

export default function Emergency() {
  return (<>
  
  <div className='container mt-3'>
          <div className='row align-items-center justify-content-center text-center'>
            <div className='col-6'>
              <h3>Listado de tus emergencias.</h3>
              <hr />
              <table className='table'>
                <thead className='table-dark'>
                  <tr style={{ border: 'none' }}>
                    <th scope='col'>SERVICIO</th>
                    <th scope='col'>COSTO</th>
                    <th scope='col'>FECHA</th>
                    <th scope='col'> </th>
                  </tr>
                </thead>
                <tbody>
                  {purchases?.map((el, index) => {
                    return (
                      <tr key={el.idServicio}>
                        <td>
                          <div>
                            <span>
                              <b>{el.servicio}</b>
                            </span>
                            <p>{el.proveedor}</p>
                          </div>
                        </td>

                        <td>
                          <p>$ {el.precio}</p>
                        </td>

                        <td>
                          <p>
                            <Moment format='DD/MM/YYYY'>{el.fecha}</Moment>
                          </p>
                        </td>

                        <td>
                          {/* <Button variant="secondary" onClick={()=>calificarProveedor(usuarioId, 'ProviderID', 'Servicio')}>Calificar y comentar</Button> */}
                          <Button
                            key={index}
                            variant='secondary'
                            onClick={() => {
                              dispatch(getServiceProvider(el.idProveedor, el.idServicio))
                              handleShow()
                            }}>
                            Califica tu servicio
                          </Button>
                          <NavLink to={"/home/chat"}>
                            <Button
                              key={index}
                              variant='primary'
                              style={{ marginLeft: '10px' }}
                              onClick={() => {
                                newChat(el.idProveedor)
                              }}>
                              Ir al Chat
                            </Button>
                          </NavLink>

                          <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                              <Modal.Title>Califica tu servicio</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                              <Form>
                                <Form.Group className='mb-3' controlId='formBasicEmail'>
                                  <Form.Label>¿Cuántas estrellas darías a tu servicio?</Form.Label>
                                  <Form.Select aria-label='Default select example' name='calificacion' onChange={(e) => handleChange(e)}>
                                    <option>Selecciona la calificacion</option>
                                    <option value='1'>⭐</option>
                                    <option value='2'>⭐⭐</option>
                                    <option value='3'>⭐⭐⭐</option>
                                    <option value='4'>⭐⭐⭐⭐</option>
                                    <option value='5'>⭐⭐⭐⭐⭐</option>
                                  </Form.Select>
                                </Form.Group>

                                <Form.Group className='mb-3' controlId='formBasicPassword'>
                                  <Form.Label>Comentario del servicio:</Form.Label>
                                  <Form.Control
                                    as='textarea'
                                    maxLength='200'
                                    placeholder='Ingresa un comentario'
                                    name='comentario'
                                    value={input.comentario}
                                    onChange={(e) => handleChange(e)}
                                  />
                                </Form.Group>
                              </Form>
                            </Modal.Body>
                            <Modal.Footer>
                              <Button variant='secondary' onClick={handleClose}>
                                Cerrar
                              </Button>
                              <Button variant='primary' onClick={() => handleSubmit()}>
                                Calificar
                              </Button>
                            </Modal.Footer>
                          </Modal>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
  
  </>)
}

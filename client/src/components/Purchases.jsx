import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chargePurchases } from '../redux/slices/purchases'
import Button from 'react-bootstrap/Button'
import Moment from 'react-moment'
import api from '../services/api'



export default function Purchases() {
  let dispatch = useDispatch()
  let { isLoggedIn } = useSelector((state) => state.auth) //PARA VERIFICAR SI EL USUARIO ESTA INICIADO SESION
  let { purchases } = useSelector((state) => state.purchases)
  let usuarioId;


function calificarProveedor(idUsuario, idProveedor){
    api.get(`/usuario/compraSuccess/misCompras?idUsuario=09a8fd07-5972-4666-8250-7c43ea071c8e`)
    
}


  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem('user'))
    usuarioId=user.id
    dispatch(chargePurchases(user.id))
  }, [dispatch])

  ///RENDERIZADO SI EL USUARIO ESTA LOGGEADO SOLO
  if (isLoggedIn) {
    return (
      <>
        <div className='container mt-3'>
          <div className='row align-items-center justify-content-center text-center'>
            <div className='col-6'>
              <h3>Listado de tus compras.</h3>
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
                  {purchases?.map((el) => {
                    return (
                      <tr>
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
                          <Button variant="secondary" onClick={()=>calificarProveedor(usuarioId)}>Calificar y comentar</Button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </>
    )
  }

  //////////////////////////////////////////////////////////////////////////////
}

import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chargePurchases } from '../redux/slices/purchases'
import Badge from 'react-bootstrap/Badge'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'




export default function Purchases() {
  let dispatch = useDispatch()
  let { isLoggedIn } = useSelector((state) => state.auth) //PARA VERIFICAR SI EL USUARIO ESTA INICIADO SESION
  let { purchases } = useSelector((state) => state.purchases) 

  useEffect(() => {
      let user = JSON.parse(sessionStorage.getItem('user'))
      console.log(user.id)
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
          <hr/>
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
               


              {
    purchases?.map(el =>{
        return (<tr>
        <td>
          <div>
            <span>{el.servicio}</span>
      
            <p>{el.proveedor}</p>
            <Badge bg="secondary">Remoto</Badge>
          </div>
        </td>
      
        <td>
          <p>Servicio</p>
        </td>
      
        <td>
          <p>Cantidad</p>
        </td>
      
        <td>
          <p>$21312312</p>
        </td>
        <td>
          <ButtonGroup size="sm">
            <Button variant="secondary">
              <i className="fa fa-plus-circle" aria-hidden="true"></i>
            </Button>
            <Button variant="secondary">
              <i className="fa fa-minus-circle" aria-hidden="true"></i>
            </Button>
            <Button variant="danger">
              <i className="fa fa-trash" aria-hidden="true"></i>
            </Button>
          </ButtonGroup>
        </td>
      </tr>)
    })
}

                  
               
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

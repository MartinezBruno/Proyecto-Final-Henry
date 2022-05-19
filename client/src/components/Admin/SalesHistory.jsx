import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import api from '../../services/api'
import { setAllBuys } from '../../redux/slices/admin'
import AdminError from './AdminError'

export default function () {
  const dispatch = useDispatch()
  const { allBuys } = useSelector((state) => state.admin)
  const { user } = useSelector((state) => state.auth)
  if (user) {
    var role = user.Role
  }

  useEffect(() => {
    dispatch(setAllBuys())
  }, [])

  if (role === 'ADMIN') {
    return (
      <div className='col-md-10' style={{ margin: 'auto' }}>
        <table className='table table-hover text-center'>
          <thead>
            <tr style={{ border: 'none' }}>
              <th scope='col'>NRO COMPRA</th>
              <th scope='col'>IMAGEN PROVEEDOR</th>
              <th scope='col'>NOMBRE PROVEEDOR</th>
              <th scope='col'>EMAIL PROVEEDOR</th>
              <th scope='col'>IMAGEN USUARIO</th>
              <th scope='col'>NOMBRE USUARIO</th>
              <th scope='col'>EMAIL USUARIO</th>
              <th scope='col'>PAGAR</th>
            </tr>
          </thead>
          <tbody>
            {/* MAP DE TODOS LOS USUARIOS */}
            {allBuys?.map((sell) => {
              // if (serv.nombre !== 'Sin servicios disponibles')
              return (
                <tr style={{ margin: 'auto' }} key={sell.id}>
                  <td> {sell.id} </td>
                  <td>
                    <img
                      src={`http://localhost:3001/profiles/${sell.imagenProveedor}`}
                      style={{ width: '40px', height: '40px', borderRadius: '50px' }}
                      alt={sell.nombreProveedor}
                      onError={(e) => (e.target.src = 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20')}
                    />
                  </td>
                  {sell.nombreProveedor ? <td>{sell.nombreProveedor}</td> : <td>{sell.proveedor}</td>}
                  {sell.emailProveedor ? <td>{sell.emailProveedor}</td> : <td>{sell.proveedor}</td>}
                  <td>
                    <img src={sell.imagenUsuario} style={{ width: '40px', height: '40px', borderRadius: '50px' }} />
                  </td>
                  {sell.nombreUsuario ? <td>{sell.nombreUsuario}</td> : <td>{sell.usuario}</td>}
                  {sell.emailUsuario ? <td>{sell.emailUsuario}</td> : <td>{sell.usuario}</td>}
                  <td>
                    <a href='https://www.mercadopago.com.ar/money-transfer' target="_blank" className='btn' style={{ padding: '5px', backgroundColor: 'green', color: 'white' }}>
                      PAGAR AL PROVEEDOR
                    </a>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  } else {
    return <AdminError />
  }
}

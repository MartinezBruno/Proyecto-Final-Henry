import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import api from '../../services/api'
import { setAllBuys } from '../../redux/slices/admin'

export default function () {
  const dispatch = useDispatch()
  const { allBuys } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(setAllBuys())
  }, [])

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
          </tr>
        </thead>
        <tbody>
          {/* MAP DE TODOS LOS USUARIOS */}
          {allBuys?.map((sell) => {
            // if (serv.nombre !== 'Sin servicios disponibles')
            return (
              <tr style={{ margin: 'auto' }} key={sell.id}>
                <td> {sell.id} </td>
                <td> {sell.id} </td>
                <td>
                  <img src={sell.imagenProveedor} style={{ width: '40px', height: '40px', borderRadius: '50px' }} />
                </td>
                <td>{sell.nombreProveedor}</td>
                <td> {sell.emailProveedor} </td>

                <td>
                  <img src={sell.imagenUsuario} style={{ width: '40px', height: '40px', borderRadius: '50px' }} />
                </td>
                <td>{sell.nombreUsuario}</td>
                <td> {sell.emailUsuario} </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

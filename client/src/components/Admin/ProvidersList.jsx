import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import api from '../../services/api'
import { setAllProviders } from '../../redux/slices/admin'
import user from '../../redux/slices/user'

export default function ProvidersList() {
  const dispatch = useDispatch()
  const { allProviders } = useSelector((state) => state.admin)

  useEffect(() => {
    dispatch(setAllProviders())
  }, [])

  //   const handleGetUser = (id) => {
  //     dispatch(getUser(id))
  //   }

  const GiveAdmin = (e) => {
    console.log(e.target.value)
    api
      .post('/admin/setAdmin', { ProveedorId: e.target.value })
      .then(() => Swal.fire('Proveedor ascendido a Administrador correctamente', '', 'success').then(() => window.location.reload()))
  }

  return (
    <div className='col-md-10' style={{ margin: 'auto' }}>
      <table className='table table-hover text-center'>
        <thead>
          <tr style={{ border: 'none' }}>
            <th scope='col'>IMAGEN</th>
            <th scope='col'>ID</th>
            <th scope='col'>NOMBRE</th>
            <th scope='col'>EMAIL</th>
            <th scope='col'>DAR ADMIN</th>
            <th scope='col'>BANEADO</th>
          </tr>
        </thead>
        <tbody>
          {/* MAP DE TODOS LOS USUARIOS */}
          {allProviders?.map((prov) => {
            // if (serv.nombre !== 'Sin servicios disponibles')
            return (
              <tr style={{ margin: 'auto' }} key={prov.id}>
                <td>
                  {/* <img src={`http://localhost:3001/profiles/${prov.IMAGEN}`} style={{ width: '40px', height: '40px', borderRadius: '50px' }} /> */}
                  <img src={prov.IMAGEN} style={{ width: '40px', height: '40px', borderRadius: '50px' }} />
                </td>
                <td> {prov.id} </td>
                <td>{prov.NOMBRE_APELLIDO_PROVEEDOR}</td>
                <td> {prov.EMAIL} </td>
                <td>
                  <button value={prov.id} onClick={(e) => GiveAdmin(e)} className='btn' style={{ padding: '5px', backgroundColor: 'green', color: 'white' }}>
                    {' '}
                    <i className='fa fa-info-circle' aria-hidden='true'></i> Give Admin
                  </button>
                </td>
                { prov.BANNED === 'No' ? (
                  <td>
                    <button value={prov.id} onClick={(e) => GiveAdmin(e)} className='btn' style={{ padding: '5px', backgroundColor: 'red', color: 'white' }}>
                      {' '}
                      <i className='fa fa-info-circle' aria-hidden='true'></i> Banear
                    </button>
                  </td>
                ) :  (
                  <td>
                    <button value={prov.id} onClick={(e) => GiveAdmin(e)} className='btn' style={{ padding: '5px', backgroundColor: 'gray', color: 'white' }}>
                      {' '}
                      <i className='fa fa-info-circle' aria-hidden='true'></i> Quitar Ban
                    </button>
                  </td>
                )}
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

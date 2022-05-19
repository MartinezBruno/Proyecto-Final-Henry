import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import api from '../../services/api'
import { setAllProviders } from '../../redux/slices/admin'
import user from '../../redux/slices/user'
import AdminError from './AdminError'

export default function ProvidersList() {
  const dispatch = useDispatch()
  const { allProviders } = useSelector((state) => state.admin)
  const { user } = useSelector((state) => state.auth)
  if (user) {
    var role = user.Role
  }

  useEffect(() => {
    dispatch(setAllProviders())
  }, [])

  const giveAdmin = (e) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Este proveedor sera ascendido a Administrador!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Ascender!',
    }).then((result) => {
      if(result.value){
        api.post('/admin/setAdmin', { ProveedorId: e.target.value }).then(() => window.location.reload()).catch((error) => console.log(error))
      }
    })

    // console.log(e.target.value)
    // api
    //   .post('/admin/setAdmin', { ProveedorId: e.target.value })
    //   .then(() => Swal.fire('Proveedor ascendido a Administrador correctamente', '', 'success').then(() => window.location.reload()))
  }

  const giveBan = (e) => {
    console.log(e.target.value)
    api
      .put('/admin/ban', { ProveedorId: e.target.value })
      .then(() => Swal.fire('Proveedor Baneado correctamente', '', 'success').then(() => window.location.reload()))
  }

  const unBan = (e) => {
    console.log(e.target.value)
    api
      .put('/admin/unban', { ProveedorId: e.target.value })
      .then(() => Swal.fire('Proveedor Desbaneado correctamente', '', 'success').then(() => window.location.reload()))
  }

  const ProviderDelete = (e) => {
    console.log(e.target.value)
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡El Proveedor Eliminado ya no se podra recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Borrar!',
    }).then((result) => {
      if(result.value){
        api.delete(`/admin/deleteProvider/${e.target.value}`).then(() => window.location.reload())
      }
    })
  }

  if (role === 'ADMIN') {
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
              <th scope='col'>BORRAR</th>
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
                    {/* <img src={prov.IMAGEN} style={{ width: '40px', height: '40px', borderRadius: '50px' }} /> */}
                    <img
                      src={`http://localhost:3001/profiles/${prov.IMAGEN}`}
                      alt={prov.NOMBRE_APELLIDO_PROVEEDOR}
                      style={{ width: '40px', height: '40px', borderRadius: '50px' }}
                      onError={(e) => (e.target.src = 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20')}
                    />
                  </td>
                  <td> {prov.id} </td>
                  <td>{prov.NOMBRE_APELLIDO_PROVEEDOR}</td>
                  <td> {prov.EMAIL} </td>
                  <td>
                    <button value={prov.id} onClick={(e) => giveAdmin(e)} className='btn' style={{ padding: '5px', backgroundColor: 'green', color: 'white' }}>
                      {' '}
                      <i className='fa fa-info-circle' aria-hidden='true'></i> Give Admin
                    </button>
                  </td>
                  {prov.BANNED === 'No' ? (
                    <td>
                      <button value={prov.id} onClick={(e) => giveBan(e)} className='btn' style={{ padding: '5px', backgroundColor: 'gray', color: 'white' }}>
                        {' '}
                        Dar Ban
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button value={prov.id} onClick={(e) => unBan(e)} className='btn' style={{ padding: '5px', backgroundColor: 'red', color: 'white' }}>
                        {' '}
                        Quitar Ban
                      </button>
                    </td>
                  )}
                  <td>
                    <button
                      value={prov.id}
                      onClick={(e) => ProviderDelete(e)}
                      className='btn'
                      style={{ padding: '5px', backgroundColor: 'red', color: 'white' }}>
                      {' '}
                      Eliminar
                    </button>
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

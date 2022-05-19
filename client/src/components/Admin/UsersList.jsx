import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import Swal from 'sweetalert2'
import api from '../../services/api'
import { setAllUsers } from '../../redux/slices/admin'
import { getUser } from '../../redux/slices/user'
import AdminError from './AdminError'

export default function UsersList() {
  const dispatch = useDispatch()
  const { allUsers } = useSelector((state) => state.admin)
  const { user } = useSelector((state) => state.auth)
  if (user) {
    var role = user.Role
  }

  useEffect(() => {
    dispatch(setAllUsers())
  }, [])

  const handleGetUser = (id) => {
    dispatch(getUser(id))
  }

  const GiveAdmin = (e) => {
    console.log(e.target.value)
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡Tu proveedor sera ascendido a Administrador!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, cambiar!',
    }).then((result) => {
      if (result.value) {
        api.post('/admin/setAdmin', { UsuarioId: e.target.value }).then(() => window.location.reload())
      }
    })
    // api.post('/admin/setAdmin', { UsuarioId: e.target.value }).then(() => Swal.fire('Proveedor ascendido a Administrador correctamente', '', 'success')).then(() => window.location.reload())
  }

  const giveBan = (e) => {
    console.log(e.target.value)
    api
      .put('/admin/ban', { UsuarioId: e.target.value })
      .then(() => Swal.fire('Usuario Baneado correctamente', '', 'success').then(() => window.location.reload()))
  }

  const unBan = (e) => {
    console.log(e.target.value)
    api
      .put('/admin/unban', { UsuarioId: e.target.value })
      .then(() => Swal.fire('Usuario Desbaneado correctamente', '', 'success').then(() => window.location.reload()))
  }

  const UserDelete = (e) => {
    console.log(e.target.value)
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡El usuario Eliminado ya no se podra recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Sí, Borrar!',
    }).then((result) => {
      if(result.value){
        api.delete(`/admin/deleteUser/${e.target.value}`).then(() => window.location.reload())
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
            {allUsers?.map((user) => {
              // if (serv.nombre !== 'Sin servicios disponibles')
              return (
                <tr style={{ margin: 'auto' }} key={user.id}>
                  <td>
                    <img src={`http://localhost:3001/profiles/${user.IMAGEN}`} style={{ width: '40px', height: '40px', borderRadius: '50px' }} />
                  </td>
                  <td> {user.id} </td>
                  <td>{user.NOMBRE_APELLIDO_USUARIO}</td>
                  <td> {user.EMAIL} </td>
                  <td>
                    <button value={user.id} onClick={(e) => GiveAdmin(e)} className='btn' style={{ padding: '5px', backgroundColor: 'green', color: 'white' }}>
                      {' '}
                      <i className='fa fa-info-circle' aria-hidden='true'></i> Give Admin
                    </button>
                  </td>
                  {user.BANNED === 'No' ? (
                    <td>
                      <button value={user.id} onClick={(e) => giveBan(e)} className='btn' style={{ padding: '5px', backgroundColor: 'gray', color: 'white' }}>
                        {' '}
                        Dar Ban
                      </button>
                    </td>
                  ) : (
                    <td>
                      <button value={user.id} onClick={(e) => unBan(e)} className='btn' style={{ padding: '5px', backgroundColor: 'red', color: 'white' }}>
                        {' '}
                        Quitar Ban
                      </button>
                    </td>
                  )}
                  <td>
                    <button value={user.id} onClick={(e) => UserDelete(e)} className='btn' style={{ padding: '5px', backgroundColor: 'red', color: 'white' }}>
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

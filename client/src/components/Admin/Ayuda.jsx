import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import { getAyudas } from '../../redux/slices/admin'
import api from '../../services/api'
import AdminError from './AdminError'

export default function Ayuda() {
  const dispatch = useDispatch()
  const { ayudas } = useSelector((state) => state.admin)
  const { user } = useSelector((state) => state.auth)
  if (user) {
    var role = user.Role
  }

  useEffect(() => {
    dispatch(getAyudas())
  }, [])

  const handleDeleteAyuda = (e) => {
    console.log(e.target.value)
    api.delete(`/admin/ayuda/${e.target.value}`).then(() => Swal.fire('Caso Cerrado', '', 'success').then(() => window.location.reload()))
  }

  if (role === 'ADMIN') {
    return (
      <div className='col-md-10' style={{ margin: 'auto' }}>
        <table className='table table-hover text-center'>
          <thead>
            <tr style={{ border: 'none' }}>
              <th scope='col'>ID AYUDA</th>
              <th scope='col'>ID DEL SOLICITANTE</th>
              <th scope='col'>IMAGEN</th>
              <th scope='col'>NOMBRE DEL SOLICITANTE</th>
              <th scope='col'>EMAIL</th>
              <th scope='col'>ASUNTO</th>
              <th scope='col'>ESTADO</th>
            </tr>
          </thead>
          <tbody>
            {/* MAP DE TODOS LOS USUARIOS */}
            {ayudas?.map((ayuda) => {
              // if (serv.nombre !== 'Sin servicios disponibles')
              return (
                <tr style={{ margin: 'auto' }} key={ayuda.id}>
                  <td> {ayuda.idAyuda} </td>
                  {ayuda.idProveedor ? <td>{ayuda.idProveedor}</td> : <td>{ayuda.idUsuario}</td>}
                  <td>
                    <img
                      src={`http://localhost:3001/profiles/${ayuda.imagen}`}
                      style={{ width: '40px', height: '40px', borderRadius: '50px' }}
                      alt={ayuda.nombre}
                      onError={(e) => (e.target.src = 'https://www.softzone.es/app/uploads-softzone.es/2018/04/guest.png?x=480&quality=20')}
                    />
                  </td>
                  <td>{ayuda.nombre}</td>
                  <td>{ayuda.email}</td>
                  <td>{ayuda.asunto}</td>
                  <td>
                    <button value={ayuda.idAyuda} onClick={(e) => handleDeleteAyuda(e)} className='btn' style={{ padding: '5px', backgroundColor: 'red', color: 'white' }}>
                      FINALIZAR
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

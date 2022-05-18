import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminError() {

  return (
    <>
      <div>
        <div style={{ textAlign: 'center', marginTop: '200px' }}>
        <img
              src='https://w7.pngwing.com/pngs/436/575/png-transparent-computer-icons-error-checklist-trademark-area-warning.png'
              style={{ borderRadius: '2000px', width: '7rem', margin: '20px' }}
            />
          <h2>
            Debes ser Administrador para poder acceder a esta pagina!            
          </h2>
          <NavLink to={'/home'}>
            <button type='button' class='btn btn-success' style={{marginTop:"30px"}}>
              Volver al Inicio
            </button>
          </NavLink>
        </div>
      </div>
    </>
  )
}

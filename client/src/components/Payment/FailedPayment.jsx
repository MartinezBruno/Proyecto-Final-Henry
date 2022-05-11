import React from 'react'
import { NavLink } from 'react-router-dom'

export default function SuccessfulPayment() {

  return (
    <>
      <div>
        <div style={{ textAlign: 'center', marginTop: '200px' }}>

        <img
              src='https://w7.pngwing.com/pngs/436/575/png-transparent-computer-icons-error-checklist-trademark-area-warning.png'
              style={{ borderRadius: '2000px', width: '7rem', margin: '20px' }}
            />
          <h2>
            ¡Oh! Ha surgido un error, Por favor inténtelo de nuevo en unos Minutos. 
            <br/><br/>Tenga en cuenta que si el problema persiste puede ser un problema de
            Mercadopago y no nuestro. <br/><br/> ¡Muchas Gracias!
            
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

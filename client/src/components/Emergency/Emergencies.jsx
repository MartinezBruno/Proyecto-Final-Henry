import React from 'react'
import AddEmergency from './AddEmergency'

export default function Emergency() {
  return (<>
  
  <div className='container mt-3'>
          <div className='row align-items-center justify-content-center text-center'>
            <div className='col-6'>
              <h3>Listado de tus emergencias.</h3>
              <hr />
              <AddEmergency />
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
                
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
  
  </>)
}

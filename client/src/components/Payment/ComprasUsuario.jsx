import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styles from '../../styles/profile.module.css'
import { chargePurchases } from '../../redux/slices/purchases'

function ComprasUsuario() {
  let moment = require('moment')
  const { user } = useSelector((state) => state.auth)
  let userID = user.id
  let dispatch = useDispatch()
  let { purchases } = useSelector((state) => state.purchases)

  useEffect(() => {
    dispatch(chargePurchases(userID))
  }, [dispatch])
  return (
    <div className={`${styles.cardBody}`}>
      <h4>Historial de compras:</h4>
      <table className='table table-hover text-center'>
        <thead>
          <tr style={{ border: 'none' }}>
            <th scope='col'>Proveedor</th>
            <th scope='col'>Servicio</th>
            <th scope='col'>Costo</th>
            <th></th>
            <th scope='col'>Fecha</th>
          </tr>
        </thead>
        <tbody>
          {purchases &&
            purchases.map((purchase, index) => {
              return (
                <tr key={index}>
                  <td>{purchase.proveedor}</td>
                  <td>{purchase.servicio}</td>
                  <td>{'$' + purchase.precio}</td>
                  <td>{purchase.description}</td>
                  <td>{moment(purchase.fecha, 'YYYY-MM-DD').fromNow()}</td>
                </tr>
              )
            })}
        </tbody>
      </table>
    </div>
  )
}

export default ComprasUsuario

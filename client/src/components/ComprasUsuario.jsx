import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chargePurchases } from '../redux/slices/purchases'

function ComprasUsuario() {
  const { user } = useSelector((state) => state.auth)
  let userID = user.id
  let dispatch = useDispatch()
  let { purchases } = useSelector((state) => state.purchases)

  useEffect(() => {
    dispatch(chargePurchases(userID))
  }, [dispatch])
  return (
    <div>
      {purchases &&
        purchases.map((purchase, index) => {
          return (
            <div key={index}>
              <h3>{purchase.proveedor}</h3>
              <p>{purchase.servicio}</p>
              <p>{purchase.precio}</p>
              <p>{purchase.description}</p>
              <p>{purchase.fecha}</p>
            </div>
          )
        })}
    </div>
  )
}

export default ComprasUsuario

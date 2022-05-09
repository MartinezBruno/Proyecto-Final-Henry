import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { clearServices, paymentSuccess } from '../redux/slices/shoppingCart'
import api from '../services/api'

export default function SuccessfulPayment() {
  // const { services } = useSelector(state => state.shoppingCart)
  const dispatch = useDispatch()

  const paymentSuccess = async (cart, id) => {
    let compra = await api.post('/usuario/compraSuccess', { cart, id })
    return compra
  }

  useEffect(() => {
    let shoppingCart = JSON.parse(localStorage.getItem('cartList'))
    let user = JSON.parse(sessionStorage.getItem('user'))

    let dataParaMandar = shoppingCart.map(el=> {
      return {provID: el.provID, id: el.id}
  })
  
  let dataFormateada={cart: dataParaMandar, id: user.id}

    paymentSuccess(dataFormateada)
    localStorage.clear()
    dispatch(clearServices())
  }, [dispatch])

  return (
    <>
      <div>
        <div style={{ textAlign: 'center', marginTop: '200px' }}>
          <h2>
            El pago se ha realizo de forma correcta
            <img
              src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffqbjrQvFYKQMEL7UxUWIdKB_EKjvyUNmvzliNJt4GrvDUV9z4rXmDX0qgRxLmeeSjL0&usqp=CAU'
              style={{ borderRadius: '200px', width: '3rem', margin: '20px' }}
            />
          </h2>
          <NavLink to={'/home'}>
            <button type='button' class='btn btn-success'>
              Volver al Inicio
            </button>
          </NavLink>
        </div>
      </div>
    </>
  )
}
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { clearServices } from '../../redux/slices/shoppingCart'
import { addEvent } from '../../redux/slices/events'
import api from '../../services/api'

export default function SuccessfulPayment() {
  // const { services } = useSelector(state => state.shoppingCart)
  const dispatch = useDispatch()
  useEffect(() => {
    let shoppingCart = JSON.parse(localStorage.getItem('cartList'))
    let eventosAgendados = JSON.parse(localStorage.getItem('events'))
    let user = JSON.parse(sessionStorage.getItem('user'))

    let dataParaMandar = shoppingCart.map((el) => {
      return { provID: el.provID, id: el.id }
    })

    let dataFormateada = { cart: dataParaMandar, id: user.id }

    // console.log(dataFormateada)

    api.post('/usuario/compraSuccess', dataFormateada)
    dispatch(addEvent(eventosAgendados, user.id))
    localStorage.clear()
    dispatch(clearServices())
  }, [dispatch])

  return (
    <>
      <div>
        <div style={{ textAlign: 'center', marginTop: '200px' }}>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffqbjrQvFYKQMEL7UxUWIdKB_EKjvyUNmvzliNJt4GrvDUV9z4rXmDX0qgRxLmeeSjL0&usqp=CAU'
            style={{ borderRadius: '200px', width: '7rem', margin: '20px' }}
          />
          <h2>
            ¡Listo! El pago se ha realizado correctamente.
            <br /> <br />
            ¡Muchas gracias por su compra!
          </h2>
          <NavLink to={'/purchases'}>
            <button type='button' class='btn btn-success' style={{ marginTop: '30px' }}>
              Ver mis compras
            </button>
          </NavLink>
        </div>
      </div>
    </>
  )
}

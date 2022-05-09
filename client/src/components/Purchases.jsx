import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { chargePurchases } from '../redux/slices/purchases'

export default function Purchases() {
  let dispatch = useDispatch()
  let { isLoggedIn } = useSelector((state) => state.auth) //PARA VERIFICAR SI EL USUARIO ESTA INICIADO SESION

  useEffect(() => {
    dispatch(chargePurchases())
  }, [dispatch])


  ///RENDERIZADO SI EL USUARIO ESTA LOGGEADO SOLO
  if (!isLoggedIn) {
    return (
      <>
        <div className='container mt-3'>
        <div className='row align-items-center justify-content-center text-center'>
          <div className='col-6'>
          <h1>Hola</h1>
        </div>
        </div>
        </div>
      </>
    )
  }

  //////////////////////////////////////////////////////////////////////////////
}

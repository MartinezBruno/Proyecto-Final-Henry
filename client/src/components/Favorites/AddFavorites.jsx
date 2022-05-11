import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorites } from '../../redux/slices/favorites'

function AddFavorites({ provId }) {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  let userId = user.id

  const onClick = () => {
    console.log(provId)
    dispatch(addToFavorites(userId, provId))
    // window.location.reload()
  }
  return (
    <button className='btn btn-primary' onClick={onClick}>
      Añadir a favoritos
    </button>
  )
}

export default AddFavorites

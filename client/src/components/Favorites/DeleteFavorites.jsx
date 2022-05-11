import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromFavorites } from '../../redux/slices/favorites'

function DeleteFavorites({ provId }) {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  let userId = user.id

  const onClick = () => {
    console.log(provId)
    dispatch(deleteFromFavorites(userId, provId))
    // window.location.reload()
  }
  return (
    <button className='btn btn-danger' onClick={onClick}>
      Eliminar de Favoritos
    </button>
  )
}

export default DeleteFavorites

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteFromFavorites } from '../../redux/slices/favorites'

function DeleteFavorites({ provId, userId }) {
  const dispatch = useDispatch()

  const onClick = () => {
    console.log(provId)
    dispatch(deleteFromFavorites(userId, provId))
    // window.location.reload()
  }
  return (
    <button className='btn btn-danger my-3' onClick={onClick} style={{ width: '90%' }}>
      Eliminar de Favoritos
    </button>
  )
}

export default DeleteFavorites

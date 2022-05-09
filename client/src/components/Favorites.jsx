import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFavoritesFromDb } from '../redux/slices/favorites.js'

function Favorites() {
  const { favorites } = useSelector((state) => state.favorites)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavoritesFromDb())
  }, [dispatch])

  return (
    <div>
      {
        favorites?.map((provider) => {
          return <div key={provider.id}>{provider.id}</div>
        })}
    </div>
  )
}

export default Favorites

import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getFavoritesFromDb, getProvidersFromDb } from '../redux/slices/favorites.js'

function Favorites() {
  const { favorites } = useSelector((state) => state.favorites)
  const { providers } = useSelector((state) => state.favorites)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFavoritesFromDb())
    dispatch(getProvidersFromDb(favorites))
  }, [dispatch])

  return (
    <div>
      {providers &&
        providers.map((provider) => {
          return <div key={provider.id}></div>
        })}
    </div>
  )
}

export default Favorites

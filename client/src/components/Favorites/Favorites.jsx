import React, { useEffect } from 'react'
import styles from '../../styles/cards.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { getFavoritesFromDb } from '../../redux/slices/favorites'
import { NavLink } from 'react-router-dom'
import DeleteFavorites from './DeleteFavorites'

function Favorites() {
  const dispatch = useDispatch()

  const { favorites } = useSelector((state) => state.favorites)

  const { user } = useSelector((state) => state.auth)
  let role = user.Role
  let userId = user.id

  useEffect(() => {
    dispatch(getFavoritesFromDb(userId))
  }, [dispatch])
  return (
    <>
      {role === 'USUARIO' && (
        <>
          <h1>Favoritos</h1>
          {favorites.length > 0 ? (
            <div className='d-flex flex-wrap justify-content-center'>
              {favorites.map((favorite) => {
                return (
                  <div key={favorite.idProveedor}>
                    <div className={`${styles.profileCard4} text-center`}>
                      <img
                        src={favorite.imagen}
                        alt={favorite.nombre_apellido_proveedor}
                        onError={(e) => (e.target.src = 'https://www.softzone.es/app/uploads/2018/04/guest.png?x=480&quality=20')}
                        className='img img-responsive'
                      />
                      <div className={styles.profileContent}>
                        <div>
                          {favorite.nombre_apellido_proveedor}
                          <p>{favorite.email}</p>
                          <p>{favorite.celular}</p>
                        </div>
                        <div className={`row ${styles.profileOverview}`} style={{ marginBottom: '10px' }}>
                          {/* <p style={{ fontWeight: "bold" }}>REGIÓN</p> */}
                          <p style={{ fontWeight: 'bold', fontSize: '15px', color: 'black' }}>
                            {favorite.pais}, {favorite.provincia}, {favorite.ciudad}
                          </p>
                        </div>
                      </div>
                      <div className={`${styles.profileOverview}`}>
                        <NavLink to={`/home/${favorite.idProveedor}`}>
                          <button type='submit' className='btn btn-success' style={{ width: '90%' }}>
                            IR AL PERFIL DEL PROVEEDOR
                          </button>
                        </NavLink>
                        <DeleteFavorites provId={favorite.idProveedor} userId={userId} />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <>No hay favoritos</>
          )}
        </>
      )}
    </>
  )
}

export default Favorites

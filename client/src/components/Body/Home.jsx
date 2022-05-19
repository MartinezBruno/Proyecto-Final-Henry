import React from 'react'
import { useEffect, useState } from 'react'
import Card from './Card'
import Filters from './Filters'
import NewFilters from './NewFilters'
import CardNotFound from './CardNotFound'
import Pagination from './Pagination'
import styles from '../../styles/home.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProviders } from '../../redux/slices/provider'
import { getFavoritesFromDb } from '../../redux/slices/favorites'
import Banned from '../Banned'

export default function Home() {
  const dispatch = useDispatch()
  const { currentProviders } = useSelector((state) => state.provider)
  const { isLoggedIn, user } = useSelector((state) => state.auth)
  if (user) {
    var userId = user.id
    var role = user.Role
    var banned = user.banned
  }

  //PAGINATION VARS
  let [currentPage, setCurrentPage] = useState(1)
  let cardsInPage = 6

  const lastIndex = currentPage * cardsInPage
  const firstIndex = lastIndex - cardsInPage
  const cardsShowed = (function () {
    if (currentProviders.length === 0) return currentProviders //Si no hay proveedores para mostrar
    else return currentProviders?.slice(firstIndex, lastIndex) //Dividimos el array original con los proveedores a mostrar
  })()

  const setPagina = (num) => {
    setCurrentPage(num)
  }

  useEffect(() => {
    dispatch(getAllProviders())
    role && dispatch(getFavoritesFromDb(userId))
  }, [dispatch])

  if (banned === 'Si') {
    return <Banned />
  }

  return (
    <>
      <div className={`container-fluid ${styles.backgroundBlack}`}>
        <div className='container'>
          {/* <Filters setCurrentPage={setCurrentPage} /> */}
          <NewFilters setCurrentPage={setCurrentPage} />

          <div className='align-items-start d-flex flex-wrap justify-content-center'>
            {cardsShowed?.length === 0 ? (
              <CardNotFound />
            ) : (
              cardsShowed?.map((provider) => {
                return (
                  <Card
                    nombre={provider.nombre_apellido_proveedor}
                    imagen={provider.imagen}
                    servicio={provider.servicio.nombre}
                    descripcion={provider.servicio.descripcion}
                    calificacion={provider.calificacion}
                    provincia={provider.provincia}
                    ciudad={provider.ciudad}
                    precio={provider.servicio.precio}
                    idProv={provider.id}
                    idServ={provider.servicio.id}
                    key={provider.email + provider.servicio.nombre + provider.servicio.precio}
                  />
                )
              })
            )}
          </div>
          {isLoggedIn ? <Pagination currentPage={currentPage} cardsInPage={cardsInPage} totalCards={currentProviders?.length} setPagina={setPagina} /> : ''}
        </div>
      </div>
    </>
  )
}

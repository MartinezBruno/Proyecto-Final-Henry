import React, { useState } from 'react'
import styles from '../../styles/filters.module.css'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { filterByPrices, filtroSupremo, setCiudades, setProvincias, setServicios } from '../../redux/slices/provider'
import { Alert, Button } from 'bootstrap'

export default function NewFilters({ setCurrentPage }) {
  const [input, setInput] = useState({
    remoto: 'Todos',
    servicio: 'Todos',
    pais: 'Todos',
    provincia: 'Todos',
    ciudad: 'Todos',
    search: '',
  })
  const dispatch = useDispatch()
  const { servicios } = useSelector((state) => state.provider)
  const { ciudades } = useSelector((state) => state.provider)
  const { provincias } = useSelector((state) => state.provider)

  useEffect(() => {
    dispatch(setServicios())
  }, [])

  const ServiciosArray = servicios.map((s) => s.nombre)
  const ServicesList = new Set(ServiciosArray)
  const ServicesLista = Array.from(ServicesList)

  let handleChange = (e) => {
    e.preventDefault()
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    })
    setCurrentPage(1)
  }

  useEffect(() => {
    dispatch(filtroSupremo(input))
    // dispatch(setCiudades(input.provincia))
    // dispatch(setProvincias(input.pais))
  }, [input])

  useEffect(() => {
    dispatch(setProvincias(input.pais))
    setInput({
      ...input,
      provincia: 'Todos',
    })
  }, [input.pais])

  useEffect(() => {
    dispatch(setCiudades(input.provincia))
    setInput({
      ...input,
      ciudad: 'Todos',
    })
  }, [input.provincia])

  let handleFilterByPrice = (e) => {
    e.preventDefault()
    dispatch(filterByPrices(e.target.value))
    setCurrentPage(1)
  }

  return (
    <>
      <div style={{ textAlign: 'center' }}>
        <p>
          <a className='btn btn-primary' data-bs-toggle='collapse' href='#collapseExample' role='button' aria-expanded='false' aria-controls='collapseExample'>
            Filtrar
          </a>
        </p>
      </div>
      <div className='collapse ' id='collapseExample'>
        <div className='card card-body'>
          <div className='d-flex container align-items-center justify-content-center'>
            <section>
              <div className={styles.searchbg}>
                <div className='mask d-flex align-items-center h-100'>
                  <div className='container'>
                    {/* <p className='display-4 font-weight-bold mt-3 mb-3 text-dark'>Indicanos qué es lo que estas buscando</p> */}
                    <div className={`"card" ${styles.searchbg}`}>
                      <div className='card-body'>
                        <div className='row justify-content-center'>
                          <div className='col-md-12 mb-3 mb-md-3' style={{ display: 'flex', justifyContent: 'center' }}>
                            <div id='basic' className='form-outline text-center'>
                              <div style={{ display: 'flex' }}>
                                <input
                                  type='text'
                                  placeholder='Nombre del Proveedor...'
                                  name='search'
                                  value={input.search}
                                  onChange={(e) => handleChange(e)}
                                  // id='form1'
                                  className='form-control form-control-lg'
                                  style={{ width: '500px' }}
                                  autoComplete='off'
                                />
                                {/* <input
                                  className='btn btn-secondary btn-block btn-lg'
                                  style={{ marginLeft: '5px' }}
                                  type='submit'
                                  value='🔍'
                                  //   onClick={(e) => handleOnSubmit(e)}
                                /> */}
                              </div>

                              <label className='form-label' htmlFor='form1'>
                                Busca Proveedores por nombre
                              </label>
                            </div>
                          </div>
                          <div className='col-md-2 mb-3 mb-md-0'>
                            <div id='location' className='form-outline text-center'>
                              <select
                                name='cost'
                                className='form-control form-control-lg'
                                style={{ textAlign: 'center' }}
                                onChange={(e) => handleFilterByPrice(e)}>
                                <option disabled hidden>
                                  Selecciona
                                </option>
                                <option value={'Todos'}>Todos</option>
                                <option value={'MayorMenor'}>Mayor a menor</option>
                                <option value={'MenorMayor'}>Menor a mayor</option>
                              </select>
                              <label className='form-label' htmlFor='form1'>
                                Ordenar por precio
                              </label>
                            </div>
                          </div>

                          {/* INICIA REMOTO CHECK */}
                          <div className='col-md-2 mb-3 mb-md-0'>
                            <div className='d-flex align-items-center justify-content-center form-outline text-center' style={{ flexDirection: 'column' }}>
                              <select name='remoto' className='form-control form-control-lg' onChange={(e) => handleChange(e)} style={{ textAlign: 'center' }}>
                                <option disabled hidden>
                                  Selecciona
                                </option>
                                <option value={'Todos'}>Todos</option>
                                <option value={'Si'}>✓</option>
                                <option value={'No'}>✘</option>
                              </select>

                              <label className='form-label' htmlFor='checkbox' style={{ margin: '0px' }}>
                                ¿Servicio Remoto?
                              </label>
                            </div>
                          </div>
                          <div className='col-md-2 mb-3 mb-md-0'>
                            <div className='d-flex align-items-center justify-content-center form-outline text-center' style={{ flexDirection: 'column' }}>
                              <select
                                name='servicio'
                                className='form-control form-control-lg'
                                onChange={(e) => handleChange(e)}
                                style={{ textAlign: 'center' }}>
                                <option value={'Todos'}>Todos</option>
                                {ServicesLista &&
                                  ServicesLista?.map((s) => (
                                    <option value={s} key={s}>
                                      {s}
                                    </option>
                                  ))}
                              </select>

                              <label className='form-label' style={{ margin: '0px' }}>
                                Servicios disponibles
                              </label>
                            </div>
                          </div>
                          <div className='col-md-2 mb-3 mb-md-0'>
                            <div className='d-flex align-items-center justify-content-center form-outline text-center' style={{ flexDirection: 'column' }}>
                              <select name='pais' className='form-control form-control-lg' onChange={(e) => handleChange(e)} style={{ textAlign: 'center' }}>
                                <option value={'Todos'}>Todos</option>
                                <option value={'Argentina'}>Argentina</option>
                                <option value={'Mexico'}>Mexico</option>
                                <option value={'Uruguay'}>Uruguay</option>
                              </select>
                              <label className='form-label' style={{ margin: '0px' }}>
                                Pais
                              </label>
                            </div>
                          </div>
                          {input.pais !== 'Todos' ? (
                            <div className='col-md-2 mb-3 mb-md-0'>
                              <div className='d-flex align-items-center justify-content-center form-outline text-center' style={{ flexDirection: 'column' }}>
                                <select
                                  name='provincia'
                                  className='form-control form-control-lg'
                                  onChange={(e) => handleChange(e)}
                                  style={{ textAlign: 'center' }}>
                                  <option value={'Todos'}>Todos</option>
                                  {provincias?.map((p) => (
                                    <option key={p.NOMBRE_PROVINCIA} value={p.NOMBRE_PROVINCIA}>
                                      {p.NOMBRE_PROVINCIA}
                                    </option>
                                  ))}
                                </select>
                                <label className='form-label' style={{ margin: '0px' }}>
                                  Provincia
                                </label>
                              </div>
                            </div>
                          ) : (
                            ''
                          )}

                          {input.provincia !== 'Todos' && input.pais !== 'Todos' && input.pais !== 'Uruguay' ? (
                            <div className='col-md-2 mb-3 mb-md-0'>
                              <div className='d-flex align-items-center justify-content-center form-outline text-center' style={{ flexDirection: 'column' }}>
                                <select
                                  name='ciudad'
                                  className='form-control form-control-lg'
                                  onChange={(e) => handleChange(e)}
                                  style={{ textAlign: 'center' }}>
                                  <option value={'Todos'}>Todos</option>
                                  {ciudades?.map((p) => (
                                    <option key={p.NOMBRE_CIUDAD} value={p.NOMBRE_CIUDAD}>
                                      {' '}
                                      {p.NOMBRE_CIUDAD}{' '}
                                    </option>
                                  ))}
                                </select>
                                <label className='form-label' style={{ margin: '0px' }}>
                                  Ciudad
                                </label>
                              </div>
                            </div>
                          ) : (
                            ''
                          )}

                          {/* TERMINA REMOTO CHECK */}
                          {/* <div className="col-md-1">
                            <input
                              className="btn btn-secondary btn-block btn-lg"
                              type="submit"
                              value="🔍"
                            />
                          </div> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  )
}

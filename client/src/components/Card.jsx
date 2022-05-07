import React from 'react'
import styles from '../styles/cards.module.css'
import { NavLink } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getServiceProvider } from '../redux/slices/provider';


const file = "data:image/png;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMDgwIDEwODAiPjxkZWZzPjxzdHlsZT4uYXtmaWxsOiMwNDUzN2Q7fS5ie2ZpbGw6I2Y3ZjdmNzt9PC9zdHlsZT48L2RlZnM-PHJlY3QgY2xhc3M9ImEiIHdpZHRoPSIxMDgwIiBoZWlnaHQ9IjEwODAiLz48cGF0aCBjbGFzcz0iYSIgZD0iTTU0MSw4MjEuNzljLTE1My44NywwLTI3NS40OS0xMjIuNjYtMjc5LjcyLTI3MC4zOUMyNTYuNTUsMzg3LjMzLDM4NS44MywyNjYuMDUsNTMyLDI2Mi4yMSw2OTUuNzYsMjU3LjksODE2LjcxLDM4Ni43Myw4MjAuODEsNTMzLDgyNS40MSw2OTcsNjkzLjM1LDgyMi40OCw1NDEsODIxLjc5WiIvPjxwYXRoIGNsYXNzPSJiIiBkPSJNNTM4LjE1LDU1OS43NWMtNS4zNC4zMy0xMi44Ni4zNi0yMC4yNiwxLjMyLTIxLjI4LDIuNzYtNDEuODEsOC4zNy02MS4wNywxOC00MS41NSwyMC43MS03MS43NSw1Mi4zOC05MSw5NC41OS0xLjM3LDMtMS4yNyw1LjEyLDEuNDMsNy4zMiw3LjU5LDYuMjEsMTQuNywxMywyMi41NSwxOC44OSwzOS4yMiwyOS4xOCw4My4xLDQ1LjgzLDEzMiw0OS41OWEyNDUuODYsMjQ1Ljg2LDAsMCwwLDY5LjMzLTQuNTRjNDYuMzYtOS42Nyw4Ni42NC0zMS4zLDEyMS4yOS02My41NywyLjgtMi42LDMuMjEtNC43NSwxLjY1LTguMTQtMTEuMzQtMjQuOC0yNi44MS00Ni42Ny00Ny4yMS02NC43NEM2MzAuODMsNTc2LjQ5LDU4OC40NSw1NjAuNTMsNTM4LjE1LDU1OS43NVoiLz48cGF0aCBjbGFzcz0iYiIgZD0iTTU0MCwzMjkuODRjLTU1LDAtMTAwLjE5LDQ1LjEtMTAwLjIxLDEwMHM0NS4xLDEwMC4zNyw5OS40NSwxMDAuNDFjNTUuNSwwLDEwMC45NC00NC45LDEwMS05OS44OEM2NDAuMjMsMzc1LjA2LDU5NS4xNiwzMjkuODQsNTQwLDMyOS44NFoiLz48L3N2Zz4";


export default function Card({
  nombre,
  imagen,
  idProv,
  idServ,
  servicio,
  descripcion,
  provincia,
  ciudad,
  precio,
}) {

  const dispatch = useDispatch()

  function handleSubmit(idProv, idServ){
    dispatch(getServiceProvider(idProv, idServ))
  }

  return (
    <>
      <div className={`${styles.profileCard4} text-center`}>
        
        {/* <img src={imagen} alt={nombre} onError={(e) => e.target.src=file} className='img img-responsive' /> */}
        <img src={imagen} alt={nombre} onError={(e) => e.target.src="https://www.softzone.es/app/uploads/2018/04/guest.png?x=480&quality=20"} className='img img-responsive' />


        <div className={styles.profileContent}>
          <div className={styles.profileName}>
            {nombre}
            <p>{servicio}</p>
          </div>
          <div
            className={styles.profileDescription}
            style={{ fontSize: '15px', color: 'black' }}>
            {descripcion}
          </div>
          <div
            className={`row ${styles.profileOverview}`}
            style={{ marginBottom: '10px' }}>
            {/* <p style={{ fontWeight: "bold" }}>REGIÓN</p> */}
            <p style={{ fontWeight: 'bold', fontSize: '15px', color: 'black' }}>
              {provincia}, {ciudad}
            </p>
          </div>
          <div className='row align items start'>
            <div className='col'>
              <div className={styles.profileOverview}>
                <p>PRECIO</p>
                <h4>{`$ ${precio}`}</h4>
              </div>
            </div>
            <div className='col'>
              <div className={styles.profileOverview}>
                <p>CALIFICACION</p>

                <ul className='list-inline small'>
                  <li className='list-inline-item m-0'>
                    <i className='fa fa-star text-success'></i>
                  </li>
                  <li className='list-inline-item m-0'>
                    <i className='fa fa-star text-success'></i>
                  </li>
                  <li className='list-inline-item m-0'>
                    <i className='fa fa-star text-success'></i>
                  </li>
                  <li className='list-inline-item m-0'>
                    <i className='fa fa-star text-success'></i>
                  </li>
                  <li className='list-inline-item m-0'>
                    <i className='fa fa-star-o text-success'></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${styles.profileOverview} `}>
            <NavLink to={`/home/${idServ}/${idProv}`}>
              <button
                type='submit'
                className='btn btn-success'
                style={{ width: '90%' }}
                onClick={() => handleSubmit(idProv, idServ)}
                >
                MAS INFORMACION
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  )
}

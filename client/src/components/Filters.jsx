import React from 'react';
import styles from '../styles/filters.module.css'

export default function Filters(){
    return (
        <>
        <div className="d-flex container align-items-center justify-content-center">

        <section>
  <div className={styles.searchbg}>
    <div className="mask d-flex align-items-center h-100">
      <div className="container">
        <p className="display-4 font-weight-bold mt-3 mb-3 text-dark">Indicanos qué es lo que estas buscando</p>
        <div className={`"card" ${styles.searchbg}`}>
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-6 mb-3 mb-md-0">
                <div id="basic" className="form-outline text-center">
                  <input type="text" id="form1" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form1">¿Qué servicio / profesion buscas?</label>
                </div>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <div id="location" className="form-outline text-center">
                  <input type="text" id="form2" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form2">Localidad</label>
                </div>
              </div>
              <div className="col-md-2">
                <input className="btn btn-secondary btn-block btn-lg" type="submit" value='🔍' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

        

        </div>
    
        </>
    )
}
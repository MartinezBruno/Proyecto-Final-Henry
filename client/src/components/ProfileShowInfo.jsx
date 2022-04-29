import React from 'react';
import styles from '../styles/profile.module.css'

export default function ProfileShowInfo(props){
    console.log(props.changeForm)
    return (
        <>
        
        
        <div className={`${styles.card} mb-3 ${styles.mb3}`}>
                <div className={`card-body ${styles.cardBody}`}>
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Nombre completo</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      Antonio Tralice
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      toni@henry.com
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Teléfono</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      (123) 123456789
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Celular</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                        (123) 123456789
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Dirección</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      Cordoba, Argentina
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <div className="col-sm-12">
                      <button className="btn btn-dark " onClick={()=>props.changeForm(true)}>EDITAR</button>
                    </div>
                  </div>
                </div>
              </div>
        
        
        
        
        </>
    )
}
import React from "react"
import styles from '../styles/cards.module.css'

export default function Card(){

    return (
        <>
       
    <div className={`${styles.profileCard4} text-center`}><img src="http://envato.jayasankarkr.in/code/profile/assets/img/profile-4.jpg" className="img img-responsive" alt='profile'/>
        <div className={styles.profileContent}>
            <div className={styles.profileName}>ANTONIO TRALICE
                <p>INGENIERO</p>
            </div>
            <div className={styles.profileDescription}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor.</div>
            <div className={`row ${styles.profileOverview}`} style={{marginBottom: '10px'}}>
                        <p style={{fontWeight:'bold'}}>REGIÓN</p>
                        <h6>Córdoba, Argentina</h6>
            </div>
            <div className="row align items start">
                <div className="col">
                    <div className={styles.profileOverview}>
                        <p>PRECIO</p>
                        <h4>$1300</h4></div>
                </div>
                <div className="col">
                    <div className={styles.profileOverview}>
                        <p>CALIFICACION</p>

                        <ul className="list-inline small">
            <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
            <li className="list-inline-item m-0"><i className="fa fa-star text-success"></i></li>
            <li className="list-inline-item m-0"><i className="fa fa-star-o text-success"></i></li>
          </ul>
                        
                        </div>

                </div>
            </div>
            <div className={`${styles.profileOverview} `}>
             <button type="button" className="btn btn-success" style={{width: '90%'}}>CONTACTAR</button>

            </div>
        </div>
    </div>

        </>
    )
}
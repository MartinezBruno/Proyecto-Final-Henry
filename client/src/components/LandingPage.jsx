import React from "react";
import styles from "../styles/landingpage.module.css";
import logo from "./img-logo/Logo2_Definitivo.png";
import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
      <>
      
    <div className="container-fluid">

       
      <div className={`container`}>
        <div className={`${styles.searchbarContainer}`} style={{marginBottom: '150px'}}>
        
        <img src={logo} alt="logo" />

        <Link to='/home'> HOME</Link>
        <Link to='/'> ¿QUIENES SOMOS?</Link>
        <Link to='/'> LINK 2</Link>
        <Link to='/'> LINK 3</Link>
  
        <div className='text-center'>
        <button className='btn btn-primary' style={{color: 'white', borderRadius: '20px', width: '180px', fontWeight:'bold'}}>REGISTRATE</button>
        <a href="/login" className='link-success'><p style={{margin: '0px', fontSize:'10px', textDecoration: 'underline'}}>¿Ya estás registrado? Inicia sesión</p></a>
        </div>
        </div>

        <div className="container text-white text-center">
          <div style={{marginBottom: '150px'}}>
          <h1>ENLACES PROFESIONALES DE CALIDAD</h1>
          <h6>OFRECE O CONTRATA SERVICIOS PROFESIONALES</h6>
          <br />
          <br />
          <a class="btn btn-lg btn-success" href="#">
             <span>¡COMIENZA AHORA!</span> </a>
          </div>
          
        <div className={styles.widgetContainer}>

            <div className={styles.landingWidget}>
            <i className="fa fa-users fa-2x text-dark"></i>
            <hr />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </div>
            <div className={styles.landingWidget}>
            <i className="fa fa-trophy fa-2x text-dark"></i>
            <hr />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </div>
            <div className={styles.landingWidget}>
            <i className="fa fa-handshake-o fa-2x text-dark"></i>
           <hr />
              Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            </div>

        </div>

        </div>

      </div>
      <div className={styles.hero}></div>

    </div>
    </>
  );
}

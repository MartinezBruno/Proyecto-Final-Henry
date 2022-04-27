import React from "react";
import styles from "../styles/landingpage.module.css";
import logo from "./img-logo/Logo2_Definitivo.png";
import { Link } from "react-router-dom"

export default function LandingPage() {
  return (
      <>
      
    <div className="container-fluid">

       
      <div className={`container`}>
        <div className={`${styles.searchbarContainer}`}>
        
        <img src={logo} alt="logo" />

        <Link to='/home'> HOME</Link>
        <Link to='/'> ¿QUIENES SOMOS?</Link>
        <Link to='/'> LINK 2</Link>
        <Link to='/'> LINK 3</Link>
  
        <div className='text-center'>
        <button className='btn btn-info font-weight-bold' style={{color: 'white'}}>REGISTRATE</button>
        <a href="/login" className='link-success'><p style={{margin: '0px', fontSize:'10px', textDecoration: 'underline'}}>¿O ya tienes una cuenta?</p></a>
        </div>
        </div>
      </div>
      <div className={styles.hero}></div>

    </div>
    </>
  );
}

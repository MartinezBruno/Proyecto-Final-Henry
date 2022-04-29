import React, {useState} from "react";
import styles from "../styles/landingpage.module.css";
import logo from "./img-logo/Logo2_Definitivo.png";
import { Link } from "react-router-dom";
import {Button, Modal} from 'react-bootstrap'
import Register from "./Register";
import NavBar from "./Navbar";

export default function LandingPage() {

  return (
      <>
      
    <div className="container-fluid">
    <NavBar/>
       
      <div className={`container-fluid`}>

        <div className="container-fluid text-white text-center">
          <div style={{marginBottom: '150px', marginTop: '150px'}}>
          <h1>ENLACES PROFESIONALES DE CALIDAD</h1>
          <h6>OFRECE O CONTRATA SERVICIOS PROFESIONALES</h6>
          <br />
          <br />
          <a className="btn btn-lg btn-success" href="#">
             <span>¡COMIENZA AHORA!</span> </a>
          </div>
          
        <div className={`${styles.widgetContainer}`}>

            <div className={styles.landingWidget}>
            <i className="fa fa-users fa-2x text-"></i>
            <hr />
            Conectar con proveedores nunca fue mas facil. Contrata tus servicios favoritos de forma rapida y segura.
            </div>
            <div className={styles.landingWidget}>
              {/* Logo de Seguridad */}
              <i className="fa fa-shield fa-2x" aria-hidden="true"></i>
            <hr />
            Protegemos a los proveedores y usuarios ofreciendo un ecosistema de Pago Seguro.
            </div>
            <div className={styles.landingWidget}>
            <i className="fa fa-trophy fa-2x text-dark"></i>
            <hr />
            Recompensamos su confianza otorgandole beneficios únicos y exclusivos para vos.
            </div>
            <div className={styles.landingWidget}>
            <i className="fa fa-handshake-o fa-2x text-dark"></i>
            <hr />
            Conviertete en provedor y ayuda a +10.000 usuarios a Resolver sus necesidades.
            </div>

        </div>

        </div>

      </div>
      <div className={styles.hero}></div>

    </div>
    </>
  );
}

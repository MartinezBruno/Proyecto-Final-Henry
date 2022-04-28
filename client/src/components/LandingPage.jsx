import React, {useState} from "react";
import styles from "../styles/landingpage.module.css";
import logo from "./img-logo/Logo2_Definitivo.png";
import { Link } from "react-router-dom";
import {Button, Modal} from 'react-bootstrap'
import Register from "./Register";

export default function LandingPage() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


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
        {/* <button className='btn btn-primary' style={{color: 'white', borderRadius: '20px', width: '180px', fontWeight:'bold'}}>REGISTRATE</button> */}

        <Button variant="primary" onClick={handleShow} className='btn btn-primary' style={{color: 'white', borderRadius: '20px', width: '180px', fontWeight:'bold'}}>
        REGISTRATE
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <h5>¡Registrate gratis!</h5></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Register />
        </Modal.Body>
        {/* <Modal.Footer> */}
          {/* <Button variant="danger" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="success" onClick={handleClose}>
            Registrarse
          </Button> */}
        {/* </Modal.Footer> */}
      </Modal>




        <a href="/login" className='link-success'><p style={{margin: '0px', fontSize:'10px', textDecoration: 'underline'}}>¿Ya estás registrado? Inicia sesión</p></a>
        </div>
        </div>

        <div className="container text-white text-center">
          <div style={{marginBottom: '150px'}}>
          <h1>ENLACES PROFESIONALES DE CALIDAD</h1>
          <h6>OFRECE O CONTRATA SERVICIOS PROFESIONALES</h6>
          <br />
          <br />
          <a className="btn btn-lg btn-success" href="#">
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

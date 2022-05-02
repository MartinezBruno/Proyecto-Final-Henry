import React from "react";
import styles from "../styles/navbar.module.css";
import logo from "./img-logo/Logo2_Definitivo.png";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Register from "./Register";

export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={`d-flex container justify-content-center`} style={{backgroundColor: 'transparent'}}>
    <div
      className={`${styles.searchbarContainer} `}
      >


      <NavLink to="/">
        <img src={logo} alt="logo" />
      </NavLink>

      <div className="d-flex container justify-content-center">
      <NavLink to="/home" className={isActive =>
    "nav-link" + (!isActive ? " unselected" : "")
  } >
          
          INICIO
        </NavLink>
        <NavLink to="/about" className={isActive =>
    "nav-link" + (!isActive ? " unselected" : "")
  }>
          ¿QUIENES SOMOS?
        </NavLink>
        <NavLink to="/profile" className={isActive =>
    "nav-link" + (!isActive ? " unselected" : "")
  }>
          MI PERFIL
        </NavLink>
      </div>


      {/* <div className="d-flex align-items-center justify-content-center text-center" style={{flexDirection:'column'}}>
        <Button
          variant="primary"
          onClick={handleShow}
          className="btn btn-primary"
          style={{
            color: "white",
            borderRadius: "20px",
            // width: "180px",
            width: '12rem',
            fontWeight: "bold",
          }}
        >
          REGISTRATE
        </Button>
        <a href="/login" className="link-success">
          <p
            style={{
              margin: "0px",
              fontSize: "0.6rem",
              textDecoration: "underline",
            }}
            >
            ¿Ya estás registrado? Inicia sesión
          </p>
        </a>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              {" "}
              <h5>¡Registrate gratis!</h5>
            </Modal.Title>
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
          {/* </Modal.Footer> 
        </Modal>
      </div>*/}
    </div>
            </div>
  );
}

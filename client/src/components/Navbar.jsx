import React from "react";
import styles from "../styles/landingpage.module.css";
import logo from "./img-logo/Logo2_Definitivo.png";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Register from "./Register";

export default function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className={`container`}>
    <div
      className={`${styles.searchbarContainer} `}
      style={{ marginBottom: "150px" }}
      >
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div>
        <Link to="/home" style={{ fontSize: "14px" }}>
          {" "}
          HOME
        </Link>
        <Link to="/about" style={{ fontSize: "14px", padding: "80px" }}>
          {" "}
          ¿QUIENES SOMOS?
        </Link>
      </div>

      <div className="text-center">
        {/* <button className='btn btn-primary' style={{color: 'white', borderRadius: '20px', width: '180px', fontWeight:'bold'}}>REGISTRATE</button> */}

        <Button
          variant="primary"
          onClick={handleShow}
          className="btn btn-primary"
          style={{
            color: "white",
            borderRadius: "20px",
            width: "180px",
            fontWeight: "bold",
          }}
        >
          REGISTRATE
        </Button>

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
          {/* </Modal.Footer> */}
        </Modal>

        <a href="/login" className="link-success">
          <p
            style={{
              margin: "0px",
              fontSize: "10px",
              textDecoration: "underline",
            }}
            >
            ¿Ya estás registrado? Inicia sesión
          </p>
        </a>
      </div>
    </div>
            </div>
  );
}

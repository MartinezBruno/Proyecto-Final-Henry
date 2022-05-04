import React, {useState} from "react";
import styles from "../styles/register.module.css";
import {Modal, Button} from 'react-bootstrap'

export default function Register() {



  return (
    <>
<div className="container ">
    <div className="row d-flex align-items-center justify-content-center" style={{margin:'0px -220px 0px -220px'}}>
        <div className="col-md-6">
            <div className={`${styles.card}`}> <span className={styles.circle}><i className="fa fa-check"></i></span>
                <h5 className="mt-3 ">Unete a la comunidad profesional<br /> más completa de la red.</h5> <small className="mt-2 text-muted">Conecta con miles de profesionistas de calidad o encuentra a tus potenciales clientes. </small>
                <div className="text-center mt-3">
                    <div className={styles.formInput}> <i className="fa fa-envelope"></i> <input type="text" className={styles.formControl} placeholder="Correo electrónico" /> </div>
                    <div className={styles.formInput}> <i className="fa fa-user"></i> <input type="text" className={styles.formControl} placeholder="Nombre y apellido"/> </div>
                    <div className={styles.formInput}> <i className="fa fa-lock"></i> <input type="text" className={styles.formControl} placeholder="Contraseña"/> </div>
                    <div className={styles.formInput}> 
                    
                    

                    <label htmlFor="role" className='text-muted'>¿Que deseas hacer?</label> <br /> 

                        <select className={styles.selectArea}name="role" id="role">
                        <option value="hire">Contratar servicios</option>
                        <option value="offer">Vender mis servicios</option>
                        </select>
                    
                    
                    </div>
                    <div className="form-check d-flex justify-content-center"> <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" /> <label className={styles.formCheckLabel} htmlFor="flexCheckChecked"> Acepto todas las condiciones </label> </div> 
                    <button className={`btn btn-success mt-4 ${styles.signup}`}>Confirmar registro</button>
                </div>

                <div className="text-center mt-3"> <span>O registrate usando:</span> </div>
                <div className="d-flex justify-content-center mt-4"> <span className={styles.social}><i className="fa fa-google"></i></span> <span className={styles.social}><i className="fa fa-facebook"></i></span> <span className={styles.social}><i className="fa fa-linkedin"></i></span> </div>
                <div className="text-center mt-4"> <span>¿Ya estás registrado?</span> <a href="#" className="text-decoration-none">Inicia sesión</a> </div>
            </div>
        </div>
    </div>
</div>
    </>
  );
}

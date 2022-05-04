import React from 'react'
import styles from '../styles/login.module.css'

export default function Login(props){ 

    console.log(props)

    if(props.isModal){ //Si se inicia sesión desde un modal 
        return (
            <>
            <div className="container ">
                <div className="row d-flex align-items-center justify-content-center" style={{margin:'0px -220px 0px -220px'}}>
                    <div className="col-md-6">
                        <div className={`${styles.card}`}>
                            <h5 className="mt-3 text-center">Iniciar sesión</h5> 
                            <div className="text-center mt-3">
                                <div className={styles.formInput}> <i className="fa fa-envelope"></i> <input type="text" className={styles.formControl} placeholder="Correo electrónico" /> </div>
                                <div className={styles.formInput}> <i className="fa fa-lock"></i> <input type="text" className={styles.formControl} placeholder="Contraseña"/> </div>
                                <div className={styles.formInput}> 
                                
                                
                                
                                
                                </div>
                                
                                <button className={`btn btn-success mt-4 ${styles.signup}`}>Iniciar sesión</button>
                            </div>

                            <div className="text-center mt-3"> <span>O inicia sesión usando:</span> </div>
                            <div className="d-flex justify-content-center mt-4"> <span className={styles.social}><i className="fa fa-google"></i></span> <span className={styles.social}><i className="fa fa-facebook"></i></span> <span className={styles.social}><i className="fa fa-linkedin"></i></span> </div>
                            <div className="text-center mt-4"> <span>¿No estás registrado?</span> <a href="#" className="text-decoration-none">¡Registrate ahora!</a> </div>
                        </div>
                    </div>
                </div>
            </div>
            </>
        )
    }
    
}
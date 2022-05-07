import React from "react";
import { NavLink } from "react-router-dom";

export default function successfulPayment() {
    return(
        <>
        <div >
            <div style={{textAlign:"center", marginTop:"200px"}}>
                <h2>El pago se ha realizo de forma correcta<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSffqbjrQvFYKQMEL7UxUWIdKB_EKjvyUNmvzliNJt4GrvDUV9z4rXmDX0qgRxLmeeSjL0&usqp=CAU" style={{borderRadius:"200px", width:"3rem", margin:"20px"}}/></h2>
                <NavLink to={"/home"}>
                <button type="button" class="btn btn-success">Volver al Inicio</button>
                </NavLink>
            </div>
        </div>
        </>
    )
}
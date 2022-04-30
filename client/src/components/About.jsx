import React from "react";
import styles from "../styles/about.module.css";
import logo from "./img-logo/Logo2_Definitivo.png";

export default function About() {
  return (
    <>
    <div className={`${styles.body} container-fluid`}>
      <div
        className={`card mb-3`}
        style={{
          backgroundColor: "aliceBlue",
          margin: "auto",
          marginTop: "0px",
          width: "1000px",
          height: "300px",
          textAlign: "center",
          justifyContent: "center",
        }}
      >
        <div className="row g-0">
          <div className="col-md-4">
            <img 
              src={logo}
              className="img-fluid rounded-start"
              style={{ width: "300px", backgroundColor: "" }}
              alt="..."
              />
          </div>
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title">¿ Como nacio ATTEND ?</h5>
              <p className="card-text">
                La idea surgio en base a la necesidad de una plataforma, la cual
                simplifique una tarea habitual, como lo es la búsqueda de proveedores de
                servicios
              </p>
              {/* <p className="card-text">
                <small className="text-muted"></small>
              </p> */}
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex",marginTop:"70px", justifyContent:"center"}}>
        <div
          className={`card mb-3`}
          style={{
            // backgroundColor: "aliceBlue",
            width: "350px",
            height: "400px",
            textAlign: "center",
            justifyContent: "center",
          }}
          >
          <img
            src="https://www.bicicletas.fun/blog/wp-content/uploads/2020/04/Como-elegir-la-mejor-bicicleta-para-ni%C3%B1os.jpg"
            style={{ height: "200px", }}
            className="card-img-top"
            alt="..."
            />
          <div className="card-body">
              <h5>Se trata del Tiempo <i className="fa fa-clock-o" aria-hidden="true"></i></h5>
            <p className="card-text">
            El tiempo es nuestro recurso más preciado, y no renovable. Al ayudar a las personas a Conectar de manera rapida con 
            una Solucion a su problema, les estamos dando tiempo.
            </p>
          </div>
        </div>

        <div
          className={`card mb-3`}
          style={{
            // backgroundColor: "aliceBlue",
            marginLeft: "40px",
            width: "350px",
            height: "400px",
            textAlign: "center",
            justifyContent: "center",
          }}
          >
          <img
          src="https://www.intellisource.com/wp-content/uploads/2019/09/helping-people.jpg"
          style={{ height: "200px" }}
          className="card-img-top"
          alt="..."
          />
          <div className="card-body">
          <h5>Se trata de Ayuda <i className="fa fa-handshake-o" aria-hidden="true"></i></h5>
            <p className="card-text">
            {/* Todos necesitamos ayuda para resolver nuestros problemas o necesidades,  */}
            Todos necesitamos una mano, ya sea para estudiar, o porque algun elemento de la casa se descompuso. 
            Estamos haciendo que la ayuda de confianza, sea accesible para más personas.
            </p>
          </div>
        </div>
        <div
          className={`card mb-3`}
          style={{
            // backgroundColor: "al+iceBlue",
            marginLeft: "40px",
            width: "350px",
            height: "400px",
            textAlign: "center",
            justifyContent: "center",
          }}
          >
          <img
            src="https://3rionoticias.com/download/multimedia.normal.a1d0474a2ba7d377.4d616e6f7320556e696461735f6e6f726d616c2e6a7067.jpg"
            style={{ height: "200px" }}
            className="card-img-top"
            alt="..."
            />
          <div className="card-body">
          <h5>Se trata de Conectividad <i className="fa fa-users" aria-hidden="true"></i></h5>
            <p className="card-text">
              Buscamos ser una plataforma en la cual, siempre tengas a disposicion a una persona que este para ayudarte
              y brindarte su servicio, de la mejor manera posible.
            </p>
          </div>
        </div>
      </div>

      {/* <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQlXoiuPHQUnWUFKhrNJdtvNxL61UKGxb1SFW5LE4OtyanZTYiVRTHbw3i4-Qk0Wlt-g-w&usqp=CAU" className="img-fluid d-block" alt="..."/> */}
    </div>
    </>
  );
}

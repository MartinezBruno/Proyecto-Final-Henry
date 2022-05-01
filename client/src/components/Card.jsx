import React from "react";
import styles from "../styles/cards.module.css";
import { NavLink } from "react-router-dom";

export default function Card({
  nombre,
  imagen,
  id,
  servicio,
  descripcion,
  provincia,
  ciudad,
  precio,
}) {
  return (
    <>
      <div className={`${styles.profileCard4} text-center`}>
        <img src={imagen} className="img img-responsive" alt="profile" />
        <div className={styles.profileContent}>
          <div className={styles.profileName}>
            {nombre}
            <p>{servicio}</p>
          </div>
          <div className={styles.profileDescription}>{descripcion}</div>
          <div
            className={`row ${styles.profileOverview}`}
            style={{ marginBottom: "10px" }}
          >
            <p style={{ fontWeight: "bold" }}>REGIÓN</p>
            <h6>
              {provincia}, {ciudad}
            </h6>
          </div>
          <div className="row align items start">
            <div className="col">
              <div className={styles.profileOverview}>
                <p>PRECIO</p>
                <h4>{precio}</h4>
              </div>
            </div>
            <div className="col">
              <div className={styles.profileOverview}>
                <p>CALIFICACION</p>

                <ul className="list-inline small">
                  <li className="list-inline-item m-0">
                    <i className="fa fa-star text-success"></i>
                  </li>
                  <li className="list-inline-item m-0">
                    <i className="fa fa-star text-success"></i>
                  </li>
                  <li className="list-inline-item m-0">
                    <i className="fa fa-star text-success"></i>
                  </li>
                  <li className="list-inline-item m-0">
                    <i className="fa fa-star text-success"></i>
                  </li>
                  <li className="list-inline-item m-0">
                    <i className="fa fa-star-o text-success"></i>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className={`${styles.profileOverview} `}>
            <NavLink to={`/home/${id}`}>
              <button
                type="submit"
                className="btn btn-success"
                style={{ width: "90%" }}
              >
                MAS INFORMACION
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

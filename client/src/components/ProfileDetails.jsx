import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUniqueProvider } from "../redux/slices/provider";
import styles from "../styles/profile.module.css";
import { NavLink } from "react-router-dom";

export default function ProfileDetails() {
  let { ProviderID } = useParams();
  console.log(ProviderID);

  const dispatch = useDispatch();
  const { uniqueprovider } = useSelector((state) => state.provider);

  useEffect(() => {
    dispatch(getUniqueProvider(ProviderID));
  }, [dispatch]);

  return (
    <div className="container" style={{ marginTop: "20px" }}>
      <div className={styles.mainBody}>
        <div className={`row gutters-sm ${styles.guttersSm}`}>
          <div className={`col-md-4 mb-3 ${styles.mb3}`}>
            <div className={styles.card}>
              <div className={`card-body ${styles.cardBody}`}>
                <div className="d-flex flex-column align-items-center text-center">
                  {/* MAPEO FOTO PERFIL: imagen predeterminada - "https://bootdey.com/img/Content/avatar/avatar7.png"  */}
                  <NavLink to="/home">
                    <button type="submit" class="btn-close" aria-label="Close" style={{marginLeft:"-350px"}}></button>
                  </NavLink>
                  <img
                    src={"https://bootdey.com/img/Content/avatar/avatar7.png"}
                    alt="Admin"
                    className="rounded-circle"
                    width="150"
                    height="150"
                    />
                  <div className="mt-3">
                    {/* MAPEO nombre:*/}
                    <h4>{uniqueprovider.nombre_apellido_proveedor}</h4>
                    {/* MAPEO STATUS (PROOVEDOR U OTRO) */}
                    <p className="text-secondary mb-1">
                      Proveedor de servicio.
                    </p>
                    {/* MAPEO CIUDAD */}
                    <p className="text-muted font-size-sm">
                      {uniqueprovider.ciudad + ", " + uniqueprovider.provincia}
                    </p>
                    <button
                      className="btn btn-primary"
                      style={{ margin: "7px" }}
                    >
                      Contratar
                    </button>
                    <button className="btn btn-outline-primary">Mensaje</button>
                  </div>
                </div>
              </div>
            </div>

            {/* SECCION DE CALIFICACION / DATOS EXTRAS */}

            <div className={`${styles.card} mt-3`}>
              <ul className="list-group list-group-flush">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <i class="fa fa-angle-right" aria-hidden="true"></i>{" "}
                    Calificación:{" "}
                  </h6>
                  <ul className="list-inline small">
                    {/* INICIA MAPEO CALIFICACION */}
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
                    {/* CIERRA MAPEO CALIFICACION */}
                  </ul>
                </li>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                  <h6 className="mb-0">
                    <i class="fa fa-angle-right" aria-hidden="true"></i>{" "}
                    Antiguedad:
                  </h6>
                  {/* INICIA MAPEO DE FECHA DE REGISTRO */}
                  <span className="text-secondary">hace un mes.</span>
                  {/* CIERRA MAPEO DE FECHA DE REGISTRO */}
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-8">
            {/* SERVICIOS DEL PROVEEDOR */}

            <div className={`${styles.card} mb-3 ${styles.mb3}`}>
              <div className={`card-body ${styles.cardBody}`}>
                <div className="row">
                  <div className="col">
                    <h5 className="mb-0 text-center text-secondary">
                      <i class="fa fa-list-alt" aria-hidden="true"></i>{" "}
                      SERVICIOS ACTIVOS{" "}
                    </h5>
                  </div>
                </div>
                <hr />

                <table class="table table-hover text-center">
                  <thead>
                    <tr style={{ border: "none" }}>
                      <th scope="col">NOMBRE</th>
                      <th scope="col">REMOTO</th>
                      <th scope="col">COSTO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* MAP DE TODOS LOS SERVICIOS */}

                    {uniqueprovider.servicios?.map((serv) => {
                      return (
                        <tr>
                          <td>{serv.nombre}</td>
                          {serv.remote === true ? (
                            <td>
                              <i
                                class="fa fa-check text-success"
                                aria-hidden="true"
                              ></i>
                            </td>
                          ) : (
                            <td>
                              <i
                                class="fa fa-times text-danger"
                                aria-hidden="true"
                              ></i>
                            </td>
                          )}
                          <td>{"$" + serv.precio}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* <div className="row">
                    <div className="col-sm-12">
                      <button className="btn btn-dark">EDITAR</button>
                    </div>
                  </div> */}
              </div>
            </div>

            {/* ZONA DE COMENTARIOS */}

            <div className={`${styles.card} mb-3 ${styles.mb3}`}>
              <div className={`card-body ${styles.cardBody}`}>
                <div className="row">
                  <div className="col">
                    <h5 className="mb-0 text-center text-secondary">
                      <i class="fa fa-commenting-o" aria-hidden="true"></i>{" "}
                      COMENTARIOS
                    </h5>
                  </div>
                </div>
                <hr />

                <div class="list-group">
                  {/* {MAPEO DE CADA SERVICIO DEL PROVEDOR } */}
                  <span class="list-group-item list-group-item-action list-group-item-light">
                    <b>Usuario1:</b> <br /> Me encanto el proveedor, recomendado
                  </span>
                  <span class="list-group-item list-group-item-action list-group-item-light">
                    <b>Usuario2:</b>
                    <br /> Servicio rapido, el precio es excelente, lo
                    recomiendo
                  </span>
                  <span class="list-group-item list-group-item-action list-group-item-light">
                    <b>Usuario3:</b> <br /> Llego 20 minutos tarde y se fue puntual, Un desastre.
                  </span>
                </div>
                {/* <div className="row">
                    <div className="col-sm-12">
                      <button className="btn btn-dark">EDITAR</button>
                    </div>
                  </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

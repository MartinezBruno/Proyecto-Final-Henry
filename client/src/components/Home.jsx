import React from "react";
import { useEffect } from "react";
import Card from "./Card";
import Filters from "./Filters";
import styles from "../styles/home.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getAllProviders } from "../redux/slices/provider";

export default function Home() {
  const dispatch = useDispatch();
  const { allProviders } = useSelector((state) => state.provider);

  useEffect(() => {
    dispatch(getAllProviders())
  },[dispatch])

  return (
    <>
      <div className={`container-fluid ${styles.backgroundBlack}`}>
        <div className="container">
          <Filters />
          <div className="align-items-start d-flex flex-wrap justify-content-center">
            {allProviders?.map((provider) => {
              return(
                <Card
                nombre={provider.nombre_apellido_proveedor}
                imagen={provider.imagen}
                servicio={provider.servicio.nombre}
                descripcion={provider.servicio.descripcion}
                provincia={provider.provincia}
                ciudad={provider.ciudad}
                precio={provider.servicio.precio}
                id={provider.id}
                key={provider.email + provider.servicio.nombre}
                />
                )
              })}
          </div>
        </div>
      </div>
    </>
  );
}

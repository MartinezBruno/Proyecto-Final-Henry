import React from "react";
import { Alert, Button } from "react-bootstrap"
import { useState } from "react";
import Card from './Card'
import Filters from './Filters'
import styles from '../styles/home.module.css'

export default function Home(){

    // const [show, setShow] = useState(true);

    return (
        <>
      <div className={`container-fluid ${styles.backgroundBlack}`}>
          <div className="container">
            <Filters />
            <div className="align-items-start d-flex flex-wrap justify-content-center">
              
              <Card />
              
              
              <Card />
             
              <Card />

              <Card />
     
              <Card />

              <Card />
              </div>
            </div>
            </div>
        
        </>
    )
}
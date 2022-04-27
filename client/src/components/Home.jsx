import React from "react";
import { Alert, Button } from "react-bootstrap"
import { useState } from "react";
import Card from './Card'
import Filters from './Filters'

export default function Home(){

    // const [show, setShow] = useState(true);

    return (
        <>
          {/* <Alert show={show} variant="success">
            <Alert.Heading>How's it going?!</Alert.Heading>
            <p>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget
              lacinia odio sem nec elit. Cras mattis consectetur purus sit amet
              fermentum.
            </p>
            <hr />
            <div className="d-flex justify-content-end">
              <Button onClick={() => setShow(false)} variant="outline-success">
                Close me y'all!
              </Button>
            </div>
          </Alert>
    
          {!show && <Button onClick={() => setShow(true)}>Show Alert</Button>} */}
      <div className="container-fluid bg-secondary">
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
import React from "react";
import { Navbar, Container, Nav, Button, Stack } from "react-bootstrap";
import Logo from "./img-logo/Logo2_Definitivo.png";

export default function NavBar() {
  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={Logo}
              width="250"
              height="60"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Stack direction="horizontal" gap={3} >
            <Button variant="primary" active>
               Mi perfil
            </Button>{" "}
            <Button variant="secondary" active>
              Cerrar sesión
            </Button>
          </Stack>
        </Container>
      </Navbar>
    </React.Fragment>
  );
}

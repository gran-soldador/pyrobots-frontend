import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';


const NavBar_2 = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='/home'>PyRobots</Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link href='/subir-bot'>Subir Robot</Nav.Link>
              <Nav.Link href='/crear-simulacion'>Crear Simulación</Nav.Link>
              <Nav.Link href='/crear-partida'>Crear Partida</Nav.Link>
              <Nav.Link href='/listar-partidas'>Listar Partidas</Nav.Link> 
              <Nav.Link href='/listar-robots'>Listar Robots</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar_2;
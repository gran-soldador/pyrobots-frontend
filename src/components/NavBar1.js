import React from "react";
import { Container, Navbar, Nav } from 'react-bootstrap';


const NavBar1 = () => {
  return (
    <>
      <Navbar bg='dark' variant='dark' style={{ 'minWidth': '800px'}}>
        <Container>
          <Navbar.Brand href='/'>PyRobots</Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link href='/login'>Login</Nav.Link>
              <Nav.Link href='/registrarse'>Registrarme</Nav.Link>
            </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar1;
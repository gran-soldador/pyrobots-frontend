import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Sidebar } from 'primereact/sidebar';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { BASE_URL, API_ENDPOINT_USER_DATA } from './ApiTypes';
import axios from 'axios';


const NavBar_2 = () => {
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [userData, setUserData] = useState([]);

  //Actualizar lista
  useEffect(() => {
    const firstCall = setTimeout(handleGames, 0);
    return () => clearTimeout(firstCall);
  }, [])

  //Leer datos de robots
  const handleGames = () => {
    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      axios.get(BASE_URL + API_ENDPOINT_USER_DATA, {
        headers: { 'Authorization': `Bearer ${tokenValue}` }
      })
      .then((res) => {
        console.log(res.data)
        setUserData(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }

  const removeStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
  }

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
              <Button onClick={() => setVisibleLeft(true) }> Ver perfil </Button>
            </Nav>
        </Container>
      </Navbar>
      <div>
        <div className="card">
          <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}> 
            <center>
              <img
                style={{ width: 220, height: 220, marginBottom: 25 }}
                src={userData.avatar}
                alt="Avatar"
              />
              <h2>
                {userData.username}
              </h2>
              <p>
                {userData.mail}
              </p>
              <Button>
                Cambiar contraseña
              </Button>
              <br /> <br />
              <Button
                onClick={removeStorage}
                href='/'>
                  Cerrar sesión
              </Button>
            </center>
          </Sidebar>
        </div>
      </div>
    </>
  );
}

export default NavBar_2;
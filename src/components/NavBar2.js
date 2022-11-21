import React, { useState, useEffect } from 'react';
import { Container, Navbar, Nav, Button, Modal, Form } from 'react-bootstrap';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import { BiLogOut } from 'react-icons/bi';
import { Sidebar } from 'primereact/sidebar';
import { BASE_URL, API_ENDPOINT_USER_DATA, API_ENDPOINT_CHANGE_AVATAR } from './ApiTypes';
import axios from 'axios';
import './css/NavBar_2.css'

const NavBar2 = () => {
  const [visibleLeft, setVisibleLeft] = useState(false);
  const [userData, setUserData] = useState([]);
  const [newAvatar, setNewAvatar] = useState(null);

  //Actualizar lista
  useEffect(() => {
    const firstCall = setTimeout(handleGames, 0);
    return () => clearTimeout(firstCall);
  }, [])

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErrorShow(false);
  }

  //error handling
  const [errorShow, setErrorShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [message, setMessage] = useState(false);

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

  //new avatar
  async function submitAvatar(event) {
    event.preventDefault()
    let formData = new FormData();
    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      formData.append('new_profile', newAvatar);
      try {
        const response = await axios.post(BASE_URL + API_ENDPOINT_CHANGE_AVATAR, formData, {
          headers: { 'Authorization': `Bearer ${tokenValue}` }
        });
        console.log(response)
        if (response.data.detail === 'Profile picture succesfully changed.') {
          setErrorShow(true);
          setMessage(true);
          setErrorMsg('La imagen de perfil ha sido cambiada con éxito.');
        }
      } catch (e) {
        console.log(e)
        setErrorMsg('');
        if (e.response.data.detail === 'File is not an image.') {
          setErrorShow(true);
          setMessage(false);
          setErrorMsg('Solo se permiten archivos con extensión png, jpg, jpeg, tiff, bmp');
        }
      }
    }
  }


  const removeStorage = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('username');
  }

  return (
    <>
      <Navbar bg='dark' variant='dark' style={{ 'minWidth': '800px'}}>
        <Container>
          <Navbar.Brand href='/home'>PyRobots</Navbar.Brand>
            <Nav className='me-auto'>
              <Nav.Link href='/subir-bot'>Subir Robot</Nav.Link>
              <Nav.Link href='/crear-simulacion'>Crear Simulación</Nav.Link>
              <Nav.Link href='/crear-partida'>Crear Partida</Nav.Link>
              <Nav.Link href='/listar-partidas'>Listar Partidas</Nav.Link> 
              <Button onClick={() => setVisibleLeft(true) }> Ver perfil </Button>
            </Nav>
        </Container>
      </Navbar>
      <div>
        <div className="card">
          <Sidebar visible={visibleLeft} onHide={() => setVisibleLeft(false)}> 
              <center>
                <img
                  className="circular--square"
                  style={{ width: 220, height: 220, marginBottom: 25 }}
                  src={userData.avatar}
                  alt='Avatar'
                />
                <h2>
                  {userData.username}
                </h2>
                <p>
                  {userData.mail}
                </p>
                <Button href='/cambiar-contrasena'>
                  Cambiar contraseña
                </Button>
                <br /> <br />
                <Button
                  onClick={() => { setShow(true)}}
                >
                    Cambiar avatar
                </Button>
                <br /> <br />
                <Button href='/listar-robots'>
                Mis robots
                </Button>
                <br /> <br />
                <Button
                  style={{marginTop: 250}}
                  onClick={removeStorage}
                  href='/'>
                    Cerrar sesión <BiLogOut/>
                </Button>
              </center>
          </Sidebar>
           <Modal
              className='modal-joinGame'
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}>
                <Modal.Header closeButton>
                  <Form.Text>
                    <h1>Subir Nuevo Avatar</h1>
                  </Form.Text>
                </Modal.Header>
                <Modal.Body>
                {/* Form modal */}
                <Form onSubmit={submitAvatar}>
                  <Form.Group className='mb-3'>
                    <Form.Label> Cambiar Avatar: </Form.Label>
                    <Form.Control
                        type='file'
                        className='form-control'
                        required
                        name='avatar'
                        onChange={ (e) => {setNewAvatar(e.target.files[0]) }}
                        data-testid='test-file-py' />
                  </Form.Group>
                  <br/>
                  <Form.Group className='mb-3'>
                    <Button
                      variant='success'
                      type='submit'
                      size='lg'
                      disabled={!newAvatar}
                      data-testid='test-file-py'
                      onClick={handleClose}
                      >
                      Aceptar
                    </Button>
                    &nbsp;
                    <Button
                      variant='secondary'
                      type='reset'
                      size='lg'
                      onClick={handleClose}>
                      Cancelar
                    </Button>
                  </Form.Group>
                </Form>
              </Modal.Body>
            </Modal>
            {/* erros modal */}
            <Modal
              className='modal-errorForm'
              show={errorShow}
              onHide={handleClose}
              backdrop='static'
              keyboard={false}>
              <Modal.Header closeButton>
                <Modal.Title> {message ? 'Subir Nuevo Avatar:' : 'Ha ocurrido un error'} </Modal.Title>
              </Modal.Header>
              <Modal.Body>
              {message ? <span> {errorMsg} </span> : <span style={{ color: "red" }}> {errorMsg} </span>}
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant='primary'
                  href='/home'
                  onClick={handleClose}
                  className='buttonModal'>
                  Aceptar
                </Button>
              </Modal.Footer>
            </Modal>
        </div>
      </div>
    </>
  );
}

export default NavBar2;
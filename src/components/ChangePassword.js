import React, { useState } from 'react'
import { Form, Button, Modal, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import logo from '../media/azul.svg';
import './css/ChangePassword.css';
import axios from "axios";
import NavBar_2 from './NavBar_2';


// Función Formulario de Login.
const ChangePassword = () => {
  const [confpassword, setConfPassword] = useState('');
  const [password, setPassword] = useState('');
  const [successLogin, setSuccessLogin] = useState(false);

  //handle del modal
  const handleCloseModal1 = () => setSuccessLogin(false);
  // Mostar Modal de error, si no logro loguearse correctamente.
  const [validForm, setValidForm] = useState(false);
  const hideErrorForm = () => setValidForm(false);

  // Mensajes de entradas no validas.
  // const [passwordErr, setPasswordErr] = useState("");

  async function handleSubmit(e){
    ///coneccion api
  };

  return (
    <>
      <NavBar_2 />
      <br/>
      <Form className='form_change_password' onSubmit={handleSubmit}>
        <Modal
          className='modal-success-login'
          show={successLogin}
          onHide={handleCloseModal1}
          backdrop="static"
          keyboard={false}>
          <Modal.Header>
          <Modal.Title>
            La contraseña de modifico correctamente <Image src={logo}></Image>
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <span style={{ color: "green" }}>Bienvenido/a</span>
          </Modal.Body>
          <Modal.Footer>
              <a href='/home'>
                  <Button 
                      variant="primary" 
                      onClick={handleCloseModal1}
                      className='buttonModal'>
                          Aceptar
                  </Button>
              </a>
          </Modal.Footer>
        </Modal>

        <Modal
          className='modal-unsuccess-login'
          show={validForm}
          onHide={hideErrorForm}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
          <Modal.Title>mensaje de error</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              Vuelve a introducir nuevamente los datos.
          </Modal.Body>
          <Modal.Footer>
            <Button 
                variant="primary" 
                onClick={hideErrorForm}
                className='buttonModal'>
                    Aceptar
            </Button>
          </Modal.Footer>
        </Modal>

        <img src={logo} className="" alt="logo" />
        <Image src={logo}></Image>
        <Image src={logo}></Image>
        <Form.Text>
          <h1>PyRobots</h1>
          <h2>Cambiar Contraseña</h2>
        </Form.Text>
        <hr></hr>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>
            Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese una contraseña"
            minLength={8} 
            maxLength={32}
            required onChange={e => setPassword(e.target.value)} />
        </Form.Group>
        <Form.Group className="mb-3"controlId="formBasicPassword">
          <Form.Label>
            Confirmación de Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmación de contraseña"
            minLength={8} 
            maxLength={32}
            required onChange={e => setConfPassword(e.target.value)} />
        </Form.Group>
          <br/>
        <Form.Group className='mb-3'>
          <Button
            variant='success'
            type='submit'
            size='lg'>
            Aceptar
          </Button>
          &nbsp;
          <Button
            variant='secondary'
            type='reset'
            href='/home'
            size='lg'>
              Cancelar
          </Button>
      </Form.Group>
      </Form>
      </>
  );
}

export default ChangePassword;

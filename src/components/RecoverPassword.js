import React, { useState, useEffect } from 'react'
import {Form, Button, Image, Row , Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import logo from '../media/azul.svg';
import './css/RecoverPassword.css';
import NavBar from './NavBar_1';
import axios from "axios";
import { API_ENDPOINT_PASSWORD_RECOVER, BASE_URL } from './ApiTypes';


// Función Formulario de ResetPassword.
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [successResetPassword, setSuccessResetPassword] = useState(false);
  const [invalidForm, setInvalidForm] = useState(false);

  const [token, setToken] = useState(false);
  const [invalidToken, setInvalidToken] = useState(false);

  //handle del modal
  const handleCloseModal = () => {
    setSuccessResetPassword(false);
    setInvalidForm(false);
  }

  // Mensajes de entradas no validas.
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordConfErr, setPasswordConfErr] = useState("");

  const handleValidation = () => {
    let formIsValid = true;
    setPasswordErr("");
    setPasswordConfErr("");
    //Contraseña
    if (!password
        .match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-])/)) {
        formIsValid = false;
        setPasswordErr(
            "Debe contener minimo 1 Mayúscula, 1 Minúscula, 1 Número y 1 Caracter especial de los siguientes: !@#$%^&*-");
   }

    //Confirmar contraseña
    if (password !== passwordConf) {
        formIsValid = false;
        setPasswordConfErr(
            "Las contraseñas ingresadas deben ser iguales.");
    }
    return formIsValid;
  }  

  async function handleSubmit(e){
    e.preventDefault();
    if (handleValidation()) {
      let formData = new FormData();
      formData.append('password', password);
      try {
        const response = await axios.post(BASE_URL + API_ENDPOINT_PASSWORD_RECOVER + `/${token}`, formData);
        if (response?.data) {
          setSuccessResetPassword(true);
        }
      } catch(error) {
        setInvalidToken(true);
      }
    } else {
      setInvalidForm(true);
    }
  };

  useEffect(() => {
    const url = window.location.pathname.split("/");
    setToken(url[2]);
  }, []);

  return (
    <>
      <NavBar />
      <br/>
      <Form className='form_pyrobots_recover_password' onSubmit={handleSubmit}>
        <Modal
          className='modal-success-reset-password'
          show={successResetPassword}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}>
          <Modal.Header>
          <Modal.Title>
            El cambio de la contraseña fue exitosa! <Image src={logo}></Image>
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Puede redirigirse al login.
          </Modal.Body>
          <Modal.Footer>
            <a href='/login'>
              <Button 
                variant="primary"
                className='buttonModal'>
                  Aceptar
              </Button>
            </a>
          </Modal.Footer>
        </Modal>

        <Modal
          show={invalidForm}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
          <Modal.Title>Algo salió mal</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Revise los datos e intente denuevo.
          </Modal.Body>
          <Modal.Footer>
            <Button 
                variant="primary" 
                onClick={handleCloseModal}
                className='buttonModal'>
                    Aceptar
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={invalidToken}
          backdrop="static"
          keyboard={false}>
          <Modal.Header>
          <Modal.Title>Token inválido</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <a href='/login'>
              <Button 
                variant="primary"
                className='buttonModal'>
                  Aceptar
              </Button>
            </a>
          </Modal.Footer>
        </Modal>

        <img src={logo} className="" alt="logo" />
        <Image src={logo}></Image>
        <Image src={logo}></Image>
        <Form.Text>
          <h1>PyRobots</h1>
        </Form.Text>
        <Form.Text>
          Formulario para restablecer la contraseña
        </Form.Text>
        <hr></hr>
        <Form.Group className="mb-3" controlId="formBasicPasswordUno">
          <Form.Label>Contraseña </Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Ingrese una nueva contraseña" 
            minLength={8}
            required onChange={ev => setPassword(ev.target.value)}/>
          <span style={{ color: "red" }}> {passwordErr} </span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordDos">
          <Form.Label>Repetir contraseña </Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Ingrese de nuevo la contraseña" 
            minLength={8}
            required
            onChange={ev => setPasswordConf(ev.target.value)}/>
          <span style={{ color: "red" }}> {passwordConfErr} </span>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasic">
            <Button 
              disabled={!password ||!passwordConf }
              data-testid="test-button-recover"
              type="submit">
                Cambiar Contraseña
            </Button>
        </Form.Group>
      </Form>
      </>
  );
}

export default ResetPassword;

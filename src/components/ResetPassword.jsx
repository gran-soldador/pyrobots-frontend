import React, { useState } from 'react'
import {Form, Button, Image, Row , Modal} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import logo from '../media/azul.svg';
import './css/ResetPassword.css';
import NavBar from './NavBar_1';
import axios from "axios";
import { API_ENDPOINT_PASSWORD_RESET, BASE_URL } from './ApiTypes';


// Función Formulario de ResetPassword.
const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [passwordConf, setPasswordConf] = useState('');
  const [successResetPassword, setSuccessResetPassword] = useState(false);

  //handle del modal
  const handleCloseModal = () => setSuccessReset(false);

  // Mensajes de entradas no validas.
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordConfErr, setPasswordConfErr] = useState("");

//   const handleValidation = () => {
//     let formIsValid = true;
//     //Contraseña
//     if (!password
//         .match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-])/)) {
//         formIsValid = false;
//         setPasswordErr(
//             "Debe contener minimo 1 Mayúscula, 1 Minúscula, 1 Número y 1 Caracter especial de los siguientes: !@#$%^&*-");
//     }

//     //Confirmar contraseña
//     if (password !== passwordConf) {
//         formIsValid = false;
//         setPasswordConfErr(
//             "Las contraseñas que ingresaste deben ser iguales ");
//     }
//   }  

  async  function handleSubmit(e){
    setPasswordErr("");
    setPasswordConfErr("");
    e.preventDefault();
    let formData = new FormData();
    formData.append('password', password);
    try {
      const response = await axios.post(BASE_URL + API_ENDPOINT_PASSWORD_RESET, formData)
      setSuccessResetPassword(true);
      console.log(response?.data);
    } catch(error) {
      console.log("Error:", error);
    }
  };

  return (
    <>
      <NavBar />
      <br/>
      <Form className='form_pyrobots_reset_password' onSubmit={handleSubmit}>
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
          <Modal.Footer>
              <a href='/login'>
                  <Button 
                      variant="primary" 
                      onClick={handleCloseModal}
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
          <Form.Label column sm={2}>Contraseña </Form.Label>
          <Form.Control type="password" placeholder="Ingrese una contraseña" minLength={8} 
            maxLength={32} required onChange={ev => setPassword(ev.target.value)}/>
          <span style={{ color: "red" }}> {passwordErr} </span>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPasswordDos">
          <Form.Label column sm={2}>Repetir contraseña </Form.Label>
          <Form.Control type="password" placeholder="Ingrese de nuevo la contraseña" minLength={8} 
            maxLength={32} required onChange={ev => setPasswordConf(ev.target.value)}/>
          <span style={{ color: "red" }}> {passwordConfErr} </span>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasic">
            <Button disabled={!password ||!passwordConf } type="submit">Crear Nueva Contraseña</Button>
        </Form.Group>
      </Form>
      </>
  );
}

export default ResetPassword;

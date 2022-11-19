import React, { useState } from 'react'
import { Form, Button, Modal, Image } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css'
import logo from '../media/azul.svg';
import './css/ChangePassword.css';
import NavBar2 from './NavBar2';

import axios from "axios";
import { API_ENDPOINT_CHANGE_PASSWORD, BASE_URL } from './ApiTypes';

// Función Formulario de Login.
const ChangePassword = () => {
  const [password, setPassword] = useState('');
  const [new_password, setNewPassword] = useState('');
  const [conf_newpass, setConfNewPass] = useState('');
  const [successLogin, setSuccessLogin] = useState(false);

  //handle del modal
  const handleCloseModal1 = () => setSuccessLogin(false);

  // mensaje de error si las nuevas contraseñas no coinciden.
  const [currentPassNotValid, setCurrentPassNoValid] = useState("");
  const [passNotValid, setPassNotValid] = useState("");
  const [newPassNoValid, setNewPassNotValid] = useState("");

  // Mostar Modal de error, si no logro loguearse correctamente.
  const [validForm, setValidForm] = useState(false);
  const hideErrorForm = () => setValidForm(false);

  function checkEqualPassword(){
    if(new_password !== conf_newpass){
      setNewPassNotValid("La confirmación no coincide con la nueva contraseña.")
      return false;
    }
    if(!new_password.match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-])/)) {
      setPassNotValid("Debe contener minimo 1 Mayúscula, 1 Minúscula, 1 Número y 1 Caracter especial de los siguientes: !@#$%^&*-");
      return false;
    }
    return true;
  }

async function handleSubmit(event){

  event.preventDefault();
  setCurrentPassNoValid("");
  setPassNotValid("");
  setNewPassNotValid("");

  if(checkEqualPassword()){
    const tokenDict = localStorage.getItem('user');
    var tokenValue;

    if(tokenDict != null){
      tokenValue = (JSON.parse(tokenDict)).accessToken;
    }
    
    let formData = new FormData();
    formData.append('old_password', password);
    formData.append('new_password', new_password);
    try{

      const response = await axios.post(BASE_URL + API_ENDPOINT_CHANGE_PASSWORD, formData, {
        headers: {"Authorization" : `Bearer ${tokenValue}`}
      })
      if(response?.status === 200) {
        setSuccessLogin(true);
      }
    }
    catch(error){
      // console.log(error)
      const error_axios = error.response.data.detail;
      if(error_axios === "contraseña incorrecta"){
        setCurrentPassNoValid("La contraseña ingresada es incorrecta.")
      }
      else if(error_axios === "La contraseña debe ser distinta"){
        setPassNotValid("Por favor ingrese una contraseña distinta a la actual.")
      }
      else if(error_axios === "Password too Short."){
        setPassNotValid("Contraseña muy corta.");
      }
      else if(error_axios === "Password inválido, el password requiere al menos una mayuscula, una minusucula y un numero."){
        setPassNotValid("Debe contener minimo 1 Mayúscula, 1 Minúscula, 1 Número y 1 Caracter especial de los siguientes: !@#$%^&*-");
      }
      else{
        // console.log(error)
      }
    }
  }
  else{
    // console.log("No se pudo modficar la contraseña.")
  }
}

  return (
    <>
      <NavBar2 />
      <br/>
      <Form className='form_change_password' onSubmit={handleSubmit}>
        <Modal
          className='modal-success-login'
          show={successLogin}
          onHide={handleCloseModal1}
          backdrop="static"
          keyboard={false}>
          <Modal.Header>
            Modificación de contraseña satisfactoria!
          </Modal.Header>
          <Modal.Body>
              <span>
                La contraseña se ha modificado correctamente. 
              </span> 
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
        <Form.Group className="mb-3">
          <Form.Label>
            Contraseña actual
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese una contraseña"
            minLength={8} 
            maxLength={32}
            required onChange={e => setPassword(e.target.value)} />
            <span style={{ color: "red" }}> {currentPassNotValid} </span>

        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Nueva contraseña
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese la nueva contraseña"
            minLength={8} 
            maxLength={32}
            required onChange={e => setNewPassword(e.target.value)} />
            <span style={{ color: "red" }}> {passNotValid} </span>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            Confirmar nueva contraseña
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirmación de contraseña"
            minLength={8} 
            maxLength={32}
            required onChange={e => setConfNewPass(e.target.value)} />
            <span style={{ color: "red" }}> {newPassNoValid} </span>
        </Form.Group>
          <br/>
        <Form.Group className='mb-3'>
          <Button
            variant='success'
            type='submit'
            data-testid="accept-button"
            size='lg'>
            Aceptar
          </Button>
          &nbsp;
          <Button
            variant='secondary'
            type='reset'
            href='/home'
            data-testid="cancel-button"

            size='lg'>
              Cancelar
          </Button>
      </Form.Group>
      </Form>
      </>
  );
}

export default ChangePassword;

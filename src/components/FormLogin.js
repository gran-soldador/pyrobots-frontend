import React, { useState } from 'react'
import { Form, Button, Image, Modal } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import logo from '../media/azul.svg';
import './css/FormLogin.css';
import NavBar from './NavBar1';
import { API_ENDPOINT_LOGIN, API_ENDPOINT_SEND_RECOVER_EMAIL , BASE_URL } from './ApiTypes';
import './css/FormLogin.css';
import axios from 'axios';


const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successLogin, setSuccessLogin] = useState(false);
  const [userNotVerified, setUserNotVerified] = useState(false);
  const [emailReq, setEmailReq] = useState('');

  //handle modal
  const handleCloseModal1 = () => setSuccessLogin(false);
  const handleCloseModal2 = () => setUserNotVerified(false);
  // Show Error Modal, if I can't log in correctly.
  const [validForm, setValidForm] = useState(false);
  const hideErrorForm = () => setValidForm(false);

  // Invalid input messages.
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // Modal recover password
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErrorShow(false);
  }
  // Modal error recover password
  const [errorShow, setErrorShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [message, setMessage] = useState(false);

  // Submit email, recover password
  async function handleSubmitEmail(event) {
    event.preventDefault()
    let formData = new FormData();
    formData.append('email', emailReq);
    try {
      const response = await axios.post(BASE_URL + API_ENDPOINT_SEND_RECOVER_EMAIL , formData);
      console.log(response)
      if (response?.data?.detail === 'Checkout your email for password recover.') {
        setErrorShow(true);
        setMessage(true);
        setErrorMsg('Revisa tu correo para recuperar tu contraseña.');
      }
    } catch (e) {
      console.log(e)
      setErrorMsg('');
      if (e.response?.data?.detail === "Email doesn't exist in database") {
        setErrorShow(true);
        setMessage(true);
        setErrorMsg('El email ingresado no se encuentra registrado.');
      }
    }
  }

  // Submit login
  async function handleSubmit(e){
    setUsernameErr("");
    setPasswordErr("");
    e.preventDefault();
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    try {
      const response = await axios.post(BASE_URL + API_ENDPOINT_LOGIN, formData)
      if (response?.data?.accessToken) {
        setSuccessLogin(true);
        localStorage.setItem("user", JSON.stringify(response.data));
        localStorage.setItem("username", username);
        console.log(response.data);
      }
      return response;
    } catch(error) {
      if (error?.response?.status === 400) {
        console.log("detail error:", error?.response?.data?.detail);
        setUsernameErr("El usuario no existe");
      }
      else if (error?.response?.status === 401) {
        if (error?.response?.data?.detail === "Wrong Password.") {
          setPasswordErr("Contraseña Incorrecta");
        } else if (error?.response?.data?.detail === "User isn't verified yet. Please verify your account."){
          setUserNotVerified(true);
        }
      } 
      else {
        console.log(error);
        setValidForm(true);
      }
    }
  };

  return (
    <>
      <NavBar />
      <br/>
      <Form className='form_pyrobots_login' onSubmit={handleSubmit}>
        <Modal
          className='modal-success-login'
          show={successLogin}
          onHide={handleCloseModal1}
          backdrop="static"
          keyboard={false}>
          <Modal.Header>
          <Modal.Title>
            Login correcto! <Image src={logo}></Image>
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ color: "green" }}>Bienvenido/a {username}.</span>
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
          <Modal.Title>Login incorrecto 😔</Modal.Title>
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
        <Modal
          className='modal-unsuccess-login'
          show={userNotVerified}
          onHide={handleCloseModal2}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>
              El usuario no está verificado 😔
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Por favor revise su correo para proceder a la confirmación de la cuenta y 
            luego intente loguearse de nuevo.
          </Modal.Body>
          <Modal.Footer>
            <Button 
              variant="primary" 
              onClick={handleCloseModal2}
              className='buttonModal'>
                Aceptar
            </Button>
          </Modal.Footer>
        </Modal>

        <Image src={logo}></Image>
        <Image src={logo}></Image>
        <Form.Text>
          <h1>PyRobots</h1>
          <h4> Formulario de Login </h4>
        </Form.Text>
        <hr></hr>
        <Form.Group
          className="mb-3"
          controlId="formBasicUsuario">
          <Form.Label>
            Usuario
          </Form.Label>
          <Form.Control
            type="text"
            placeholder="Ingrese nombre de usuario" 
            value={username}
            minLength={1}
            maxLength={32}
            required
            onChange={ev => setUsername(ev.target.value)} />
          <span style={{ color: "red" }}> {usernameErr} </span>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasicPassword">
          <Form.Label>
            Contraseña
          </Form.Label>
          <Form.Control
            type="password"
            placeholder="Ingrese una contraseña"
            minLength={8}
            required onChange={ev => setPassword(ev.target.value)} />
          <span style={{ color: "red" }}> {passwordErr} </span>
        </Form.Group>
        <Form.Group
          className="mb-3"
          controlId="formBasic">
          <center>
          <Button
            disabled={!password || !username}
            type="submit">
            Iniciar sesion
          </Button>
          </center>
          </Form.Group>
          </Form>
          <Button
            variant='link'
            onClick={() => { setShow(true) }}>
            ¿Olvidaste tu contraseña?
          </Button> <br/><br/> 
          <Button
            href='/registrarse'
            variant="link"
            className='crear-account'>
            Crear cuenta nueva
          </Button>

          <Modal
            className='modal-joinGame'
            show={show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}>
            <Modal.Header closeButton>
              <Form.Text>
                <h1>Recuperar contraseña</h1>
              </Form.Text>
            </Modal.Header>
            <Modal.Body>
            <Form onSubmit={handleSubmitEmail}>
              <Form.Group className='mb-3'>
                <Form.Label> Ingresa tu email: </Form.Label>
                <Form.Control
                  className='form-control'
                  id='inputemail'
                  required
                  type='email'
                  placeholder='Ingrese su email'
                  onChange={ (e) => {setEmailReq(e.target.value) }}
                  />
              </Form.Group>
              <br/>
              <Form.Group className='mb-3'>
                <Button
                  variant='success'
                  type='submit'
                  size='lg'
                  disabled={!emailReq}
                  data-testid='modal-unirme'
                  onClick={handleClose}>
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
          <Modal
            className='modal-errorForm'
            show={errorShow}
            onHide={handleClose}
            backdrop='static'
            keyboard={false}>
            <Modal.Header closeButton>
              <Modal.Title> {message ? 'Recuperar contraseña' : 'Ha ocurrido un error'} </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {errorMsg}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant='primary'
                onClick={handleClose}
                className='buttonModal'>
                Aceptar
              </Button>
            </Modal.Footer>
          </Modal>
      </>
  );
}

export default FormLogin;

import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css'
import logo from './logo.png';
import './css/FormLogin.css';
import NavBar from './NavBar_1';
import Modal from 'react-bootstrap/Modal';


import axios from "axios";
  const baseURL = "http://127.0.0.1:8000/login";


// Función Formulario de Login.
const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successLogin, setSuccessLogin] = useState(false);
  const [userNotVerified, setUserNotVerified] = useState(false);

  //handle del modal
  const handleCloseModal1 = () => setSuccessLogin(false);
  const handleCloseModal2 = () => setUserNotVerified(false);
  // Mostar Modal de error, si no logro loguearse correctamente.
  const [validForm, setValidForm] = useState(false);
  const hideErrorForm = () => setValidForm(false);

  // Mensajes de entradas no validas.
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  async  function handleSubmit(e){
    setUsernameErr("");
    setPasswordErr("");
    e.preventDefault();
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);
    try {
      const response = await axios.post(baseURL, formData)
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
          console.log("detail error:", error?.response?.data?.detail);
          setPasswordErr("Contraseña Incorrecta");
        } else if (error?.response?.data?.detail === "User isn't verified yet. Please verify your account."){
          console.log("detail error:", error?.response?.data?.detail);
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
          <Modal.Title>El usuario no está verificado 😔</Modal.Title>
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

        <img src={logo} className="" alt="logo" />
        <Image src={logo}></Image>
        <Image src={logo}></Image>
        <Form.Text>
          <h1>PyRobots</h1>
        </Form.Text>
        <Form.Text>
          Formulario de Login
        </Form.Text>
        <hr></hr>
        <Form.Group as={Row} className="mb-3" controlId="formBasicUsuario">
          <Form.Label column sm={2}>Usuario</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Ingrese nombre de usuario" 
              value={username} minLength={1} maxLength={32}
              required onChange={ev => setUsername(ev.target.value)}/>
          <span style={{ color: "red" }}> {usernameErr} </span>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
          <Form.Label column sm={2}>Contraseña </Form.Label>
          <Col sm={10}>
          <Form.Control type="password" placeholder="Ingrese una contraseña" minLength={8} 
            maxLength={32} required onChange={ev => setPassword(ev.target.value)}/>
          <span style={{ color: "red" }}> {passwordErr} </span>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasic">
          <Button disabled={!password ||!username } type="submit">Iniciar sesion</Button>
          {/* <Button > ¿ Olvidaste tu contraseña ?</Button> */}
        </Form.Group>
      </Form>
      <a href='/registrarse'>
        <Button variant="link" className='crear-account'>Crear cuenta nueva</Button>
      </a>
      </>
  );
}

export default FormLogin;

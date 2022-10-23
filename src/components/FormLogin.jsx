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

import axios from "axios";
  const baseURL = "http://127.0.0.1:8000/login";

// Función Formulario de Login.
const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // const navigate = useNavigate();

  async  function handleSubmit(e){
    e.preventDefault();
    let formData = new FormData();
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios.post(baseURL, formData)
      if (response?.data?.accessToken) {
        alert("Login Correcto!")
        localStorage.setItem("user", JSON.stringify(response.data));
        console.log(response.data);
      }
      return response;
    } catch(error) {
      if (error?.response?.status === 400)
        alert("El usuario no existe");
      if (error?.response?.status === 401)
        alert('Contraseña Incorrecta');
        console.log(error);
      }
  };

  return (
    <>
      <NavBar />
      <br/>
      <Form className='form_pyrobots_login' onSubmit={handleSubmit}>
        <img src={logo} className="" alt="logo" />
        <Image src={logo}></Image>
        <Image src={logo}></Image>
        <Form.Text>
          <h1>Pyrobots</h1>
        </Form.Text>
        <Form.Text>
          Formulario de Login
        </Form.Text>
        <hr></hr>
        <Form.Group as={Row} className="mb-3" controlId="formBasicUsuario">
          <Form.Label column sm={2}>Usuario</Form.Label>
          <Col sm={10}>
            <Form.Control type="text" placeholder="Ingrese nombre de usuario" value={username} minLength={1} maxLength={32}
              required onChange={ev => setUsername(ev.target.value)}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
          <Form.Label column sm={2}>Contraseña </Form.Label>
          <Col sm={10}>
          <Form.Control type="password" placeholder="Ingrese una contraseña" minLength={8} maxLength={32}
            required onChange={ev => setPassword(ev.target.value)}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasic">
          <Button disabled={!password ||!username } type="submit">Iniciar sesion</Button>
          {/* <Button > ¿ Olvidaste tu contraseña ?</Button> */}
          <Button variant="link">Crear cuenta nueva</Button>
        </Form.Group>
      </Form>
      </>
  );
}

export default FormLogin;

import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.css'
import logo from './logo.png';

import axios from "axios";
  // const baseURL = "http://127.0.0.1:8000/files";
  const baseURL = "http://127.0.0.1:8000/login";


// Función Formulario de Login.
const FormLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  // const [validated, setValidated] = useState(false);

  // Valido el logueo del usuario, para que entre al juego de PyRobots.
  // const validated_login = (username, password) => {
  //   if (username === 'vero2022@desarrolladora.com' &&  password === 'test')  {
  //     alert('Login correcto');
  //   } else 
  //     alert('Login incorrecto');
  // };

//Envío datos a la API.
// const handleSubmit = (event) => {
//   event.preventDefault()
//   const form = event.currentTarget;
//   if (form.checkValidity() === false) {
//     event.preventDefault();
//     event.stopPropagation();
//   }

//   let formData = new FormData();
//   formData.append('username', username);
//   formData.append('password', password);  
  
//   console.log(username, password)
//   setValidated(true);

//   axios.post(baseURL, formData)
//         .then((res) => { console.log(res) }) 
//         .catch((err) => { console.log(err) });

//   validated_login(username, password);
// }

const handleSubmit = (e) => {
  e.preventDefault()
  return axios
    .post(baseURL, {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
      }
      return response.data;
    })
    .catch((error) => {
      console.log('error', error);
    })
};

  return (
    <>
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
          <Form.Control.Feedback type="invalid">
            Por favor, ingrese un nombre de usuario válido.
          </Form.Control.Feedback>
          <Form.Control.Feedback aria-disabled>completado!</Form.Control.Feedback>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
          <Form.Label column sm={2}>Contraseña </Form.Label>
          <Col sm={10}>
          <Form.Control type="password" placeholder="Ingrese una contraseña" value={password} minLength={1} maxLength={8}
            required onChange={ev => setPassword(ev.target.value)}/>
          <Form.Control.Feedback type="invalid">
                Por favor, ingrese una contraseña válida.
          </Form.Control.Feedback>
          <Form.Control.Feedback>completado!</Form.Control.Feedback>
          </Col>
        </Form.Group>        
        <Form.Group as={Row} className="mb-3" controlId="formBasic">
          <Button variant="link" type="submit">Iniciar sesion</Button>
          <Button variant="link"> ¿ Olvidaste tu contraseña ?</Button>
          <Button variant="link">Crear cuenta nueva</Button>
        </Form.Group>
      </Form>
      </>
  );
}

export default FormLogin;




import 'bootstrap/dist/css/bootstrap.css'
import './css/Register.css';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NavBar from './NavBar_1';
import logo from './logo.png';

import React, { useState } from 'react';
import axios from "axios";

export function RegisterForm() {

  const [datos, setDatos] = useState({
    username: "",
    useremail: "",
    useremailconf: "",
    password: "",
    passwordconf: "",
  });

  const [userAvatar, setUserAvatar] = useState(null);

  const [usernameErr, setUsernameErr] = useState("");
  const [useremailErr, setUseremailErr] = useState("");
  const [useremailconfErr, setUseremailconfErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [passwordconfErr, setPasswordconfErr] = useState("");
  const [avatarErr, setAvatarErr] = useState("");

  const [successRegister, setSuccessRegister] = useState(false);
  
  //handle del modal
  const handleClose = () => setSuccessRegister(false);
  // Mostar Modal de error, si no logro registrarse correctamente.
  const [invalidForm, setInvalidForm] = useState(false);
  const [formErrTitle, setFormErrTitle] = useState("");
  const [formErrBody, setFormErrBody] = useState("");
  const hideErrorForm = () => {
    setInvalidForm(false);
    setFormErrTitle("")
    setFormErrBody("");
  }

  const handleValidation = () => {
    let formIsValid = true;
    setUsernameErr("");
    setUseremailErr("");
    setUseremailconfErr("");
    setPasswordErr("");
    setPasswordconfErr("");
    setAvatarErr("");

    //Username
    if (!datos.username.match(/^[a-zA-Z0-9-]+$/)) {
      formIsValid = false;
      setUsernameErr("Solo Mayúsculas, Minúsculas, Números y Guiones");
    }

    //Email
    if (!datos.useremail.match(/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/)) {
      formIsValid = false;
      setUseremailErr("Email no valido");
    }

    //Confirmar email
    if (datos.useremail !== datos.useremailconf) {
      formIsValid = false;
      setUseremailconfErr("Confirmación de email es distinto al email seleccionado");
    }

    //Contraseña
    if (!datos.password
      .match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*-])/)) {
      formIsValid = false;
      setPasswordErr(
        "Debe contener minimo 1 Mayúscula, 1 Minúscula, 1 Número y 1 Caracter especial de los siguientes: !@#$%^&*-");
    }

    //Confirmar contraseña
    if (datos.password !== datos.passwordconf) {
      formIsValid = false;
      setPasswordconfErr(
        "Confirmación de contraseña es distinta a la contraseña seleccionada");
    }

    //Avatar
    if (userAvatar !== null) {
      let ext = userAvatar.name.split('.').pop();
      if (ext !== "jpg" && ext !== "jpeg" &&
        ext !== "jpe" && ext !== "jfif" &&
        ext !== "gif" && ext !== "png") {
        formIsValid = false;
        setAvatarErr(
          "Solo se permiten imagenes con extensiones .jpg .jpeg .jpe .jfif .gif .png");
        setUserAvatar(null);
      }
    }

    return formIsValid;
  };

  const handleUserAvatar = (event) => {
    setUserAvatar(event.target.files[0]);
  }

  const handleChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
  }

  const resetForm = () => {
    setUserAvatar(null);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setFormErrTitle("El formulario de registro contiene errores")
    setFormErrBody("Modifique los datos señalados.");
    if (handleValidation()) {

      let formData = new FormData();
      formData.append('username', datos.username);
      formData.append('useremail', datos.useremail);
      formData.append('password', datos.password);
      if (userAvatar !== null) {
        formData.append('userAvatar', userAvatar);
      }

      const API = 'user/registro_de_usuario/'
      const URL = "http://127.0.0.1:8000/" + API

      try {
        const response = await axios.post(URL, formData, { headers: 
          { 'Content-Type': 'multipart/form-data' } });
        if (response?.data) {
          setSuccessRegister(true);
        }
      } catch (err) {
        if (err?.response?.data?.detail === "User name already exist.") {
          setInvalidForm(true);
          setUsernameErr("Username ya registrado");
        } else if (err?.response?.data?.detail === "Email already registered.") {
          setInvalidForm(true);
          setUseremailErr("Email ya registrado");
        } else {
          setInvalidForm(true);
          setFormErrTitle("Algo salió mal")
          setFormErrBody("Por favor intente más tarde.");
        }
      }
    } else {
      setInvalidForm(true);
    }
  }

  return (
    <>
      <NavBar />
      <br/>
      <form className='registerform' onSubmit={handleSubmit}>
        <Modal
          className='modal-success-register'
          show={successRegister}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}>
            <Modal.Header>
            <Modal.Title>Registro correcto!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <span>Por favor revise su correo para proceder a la confirmación de la cuenta.</span>
            </Modal.Body>
            <Modal.Footer>
            <a href='/login'>
                <Button 
                    variant="primary" 
                    onClick={handleClose}
                    className='buttonModal'>
                        Aceptar
                </Button>
            </a>
          </Modal.Footer>
        </Modal>

        <Modal
          className=''
          show={invalidForm}
          onHide={hideErrorForm}
          backdrop="static"
          keyboard={false}>
          <Modal.Header closeButton>
          <Modal.Title>{formErrTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {formErrBody}
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
          <h1>Bienvenido a PyRobots!</h1>
        </Form.Text>
        <Form.Text>
          Registro
        </Form.Text>
        <hr></hr>

        <Form.Group as={Row} className="mb-3" controlId="formBasicUsuario">
          <Form.Label column sm={12}>Usuario</Form.Label>
          <Col sm={12}>
          <input
            placeholder='Ingresar usuario'
            className="form-control"
            type='text'
            minLength={1}
            maxLength={32}
            name='username'
            onChange={handleChange}
            required
          />
          <span style={{ color: "red" }}>{usernameErr}</span>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
          <Form.Label column sm={12}>Email</Form.Label>
          <Col sm={12}>
          <input
            placeholder='Ingresar Email'
            className="form-control"
            type='email'
            name='useremail'
            onChange={handleChange}
            required
            />
          <span style={{ color: "red" }}>{useremailErr}</span>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicEmailConf">
          <Form.Label column sm={12}>Confirmar Email</Form.Label>
          <Col sm={12}>
          <input
            placeholder='Confirmar Email'
            className="form-control"
            type='email'
            name='useremailconf'
            onChange={handleChange}
            required
            />
          <span style={{ color: "red" }}>{useremailconfErr}</span>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
          <Form.Label column sm={12}>Contraseña</Form.Label>
          <Col sm={12}>
          <input
            placeholder='Ingresar contraseña'
            className="form-control"
            type='password'
            name='password'
            minLength={8}
            onChange={handleChange}
            required
            />
          <span style={{ color: "red" }}>{passwordErr}</span>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicPasswordConf">
          <Form.Label column sm={12}>Confirmar Contraseña</Form.Label>
          <Col sm={12}>
          <input
            placeholder='Confirmar contraseña'
            className="form-control"
            type='password'
            name='passwordconf'
            minLength={8}
            onChange={handleChange}
            required
            />
          <span style={{ color: "red" }}>{passwordconfErr}</span>
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formBasicAvatar">
          <Form.Label column sm={12}>Avatar (Opcional)</Form.Label>
          <Col sm={12}>
          <input
            className="form-control"
            type='file'
            name='avatar'
            onChange={handleUserAvatar}
            />
          <span style={{ color: "red" }}>{avatarErr}</span>
          </Col>
        </Form.Group>

        <button
          type="reset"
          className="btn btn-block mb-4 btn-dark"
          onClick={resetForm}
          >
          Cancelar
        </button>
        &nbsp;
        <button
          type="submit"
          className="btn btn-block mb-4 btn-success"
          >
          Registrarte
        </button>
      </form>
    </>
  )
};

export default RegisterForm;

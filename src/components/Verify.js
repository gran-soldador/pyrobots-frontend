import React, { useEffect, useState } from "react";
import { Form, Image, Button, Modal } from 'react-bootstrap';
import './css/Verify.css';
import logo from '../media/azul.svg';
import axios from "axios";
import { API_ENDPOINT_VERIFY, BASE_URL } from "./ApiTypes";

const Verify = () => {
  const [showModal, setShowModal] = useState(false);
  const [showError, setShowError] = useState(false);

  function verify_user(token) {
    axios.get(BASE_URL + API_ENDPOINT_VERIFY + `${token}`)
      .then((res) => {
        console.log(res);
        setShowModal(true);
      })
      .catch((err) => {
        console.log(err)
        setShowError(true);
      });
  }

  useEffect(() => {
    const url = window.location.pathname.split("/");
    verify_user(url[2]);
  }, []);

  return (
    <>
    <br/>
      <Form.Group className='form_pyrobots_verify'>
        <Modal
          className='modal-success'
          show={showModal}
          backdrop="static"
          keyboard={false}>
            <Modal.Header>
            <Modal.Title>Email Verificado!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Puede proceder a iniciar sesión.
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
            className='modal-error'
            show={showError}
            backdrop="static"
            keyboard={false}>
            <Modal.Header>
            <Modal.Title>No pudimos verificarte</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Vuelve a intentarlo más tarde.
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

        <img src={logo} className="" alt="logo" />
        <Image src={logo}></Image>
        <Image src={logo}></Image>
        <Form.Text>
          <h1>PyRobots</h1>
        </Form.Text>
        <Form.Text>
          <h3>Estamos verificando su email.</h3>
          <h5>Aguarde un momento...</h5>
        </Form.Text>
        <hr></hr>
      </Form.Group>
      </>
  );
}

export default Verify;
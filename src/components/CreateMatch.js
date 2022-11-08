import React, { useEffect, useRef, useState } from 'react';
import { Form, Image, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import axios from 'axios';
import './css/CreatePartida.css';
import NavBar from './NavBar_2';
import { API_ENDPOINT_CREATE_GAME, API_ENDPOINT_LIST_ROBOTS, BASE_URL } from './ApiTypes';


const CreatePartida = () => {
  //Datos partida
  const [namepartida, setNamePartidas] = useState('');
  const [password, setPassword] = useState('');
  const [numgames, setNumGames] = useState('');
  const [numrondas, setNumRondas] = useState('');
  const [minplayers, setMinPlayers] = useState('');
  const [maxplayers, setMaxPlayers] = useState('');

  // Mostar Modal de error si hay errores en los imputs.
  const [validForm, setValidForm] = useState(false);
  const hideErrorForm = () => setValidForm(false);
  const [validplayers, setValidPlayers] = useState('');
  const [passwordErr, setPasswordErr] = useState("");
  const [nameErr, setNameErr] = useState("");

  // Referencias a los inputField.
  const namepartidaRef = useRef();
  const passwordRef = useRef();
  const numgamesRef = useRef();
  const numrondasRef = useRef();
  const minplayersRef = useRef();
  const maxplayersRef = useRef();
  const idrobotRef = useRef();

  const handleValidation = () => {
    let valid = true;
    if (minplayers > maxplayers) {
      valid = false;
      setValidPlayers('El número de jugadores mínimo no puede ser mayor que el número de jugadores máximo');
    }
    if (valid) {
      setValidPlayers('');
    }
    return valid;
  }
  // Modal:
  const [successUpload, setSuccessUpload] = useState(false);
  // setear todos los campos
  const handleCloseModal = () => {
    setSuccessUpload(false);
    namepartidaRef.current.value = '';
    passwordRef.current.value = '';
    numgamesRef.current.value = '';
    numrondasRef.current.value = '';
    minplayersRef.current.value = '';
    maxplayersRef.current.value = '';
    idrobotRef.current.value = '';
  }

  //Datos de API robot
  const [idrobot, setIdRobot] = useState(0);
  const [datosRobot, setDatosRobot] = useState([]);

  //Leer datos de robots
  useEffect(function () {
    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      axios.get(BASE_URL + API_ENDPOINT_LIST_ROBOTS, {
        headers: { 'Authorization': `Bearer ${tokenValue}` }
      })
      .then((res) => {
        console.log(res)
        setDatosRobot(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
    }
    }, []);

  //Enviar datos a la API
  async function handleSubmit(event) {
    event.preventDefault()
    if (handleValidation()) {
      console.log('Enviando datos al servidor');
      const API = BASE_URL + API_ENDPOINT_CREATE_GAME;
      let formData = new FormData();

      const tokenDict = localStorage.getItem('user');
      if (tokenDict !== null) {
        const tokenValue = (JSON.parse(tokenDict)).accessToken;
        formData.append('name', namepartida);
        formData.append('password', password);
        formData.append('numgames', numgames);
        formData.append('numrounds', numrondas);
        formData.append('minplayers', minplayers);
        formData.append('maxplayers', maxplayers);
        formData.append('robot_id', idrobot);
      
        try {
          const response = await axios.post(API, formData, {
            headers: { 'Authorization': `Bearer ${tokenValue}` }
          });
          console.log(response);
          setSuccessUpload(true);
        } catch (e) {
          console.log(e);
          console.log('error')
          if (e?.response?.data.detail === 'password invalida') {
            setValidForm(true);
            setPasswordErr('Debe tener menos de 10 caracteres, y acepta - o _');
          }
          if (e?.response?.data.detail === 'namepartida invalido') {
            setValidForm(true);
            setNameErr('El nombre de la partida no acepta espacios ni caracteres especiales');
          }
        }
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  return (
    <>
    <NavBar />
    <br/>
    <Form className='form_create_pardida' onSubmit={handleSubmit}>
      <Modal
        className='modal-upload'
        show={successUpload}
        onHide={handleCloseModal}
        backdrop="static"
        keyboard={false}>
          <Modal.Header closeButton>
            <Modal.Title>Tu partida se creo correctamente! </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span>{namepartida}</span> se añadió a la lista de partidas.
          </Modal.Body>
          <Modal.Footer>
            <a href='/home'>
              <Button 
                variant="primary" 
                onClick={handleCloseModal}
                className='buttonModal'>
                  Aceptar
              </Button>
            </a>
          </Modal.Footer>
      </Modal>
      <Modal
        className='modal-errorForm'
        show={validForm}
        onHide={hideErrorForm}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>No se pudo crear tu partida 😔</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Revisa los datos del formulario e intenta nuevamente.
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

      <Image src={logo}></Image>

      <Form.Text>
        <h1>PyRobots</h1>
      </Form.Text>
      <Form.Text>
        <h1>Crear Partida</h1>
      </Form.Text>

      <hr></hr>
      <Form.Group className='form-group'>
        <Form.Label>
          Nombre de la partida:
        </Form.Label>
        <Form.Control
          type='text'
          placeholder='Ingrese el nombre de la partida'
          required
          ref={namepartidaRef}
          minLength={4}
          maxLength={16}
          onChange={event => setNamePartidas(event.target.value)} />
          <span style={{ color: "red" }}>{nameErr}</span>
      </Form.Group>

      <Form.Group className='form-group'>
        <Form.Label>
         Cantidad de jugadores:
        </Form.Label>
        <Form.Control
          type='number'
          placeholder='Cantidad mínima de jugadores'
          required
          min={2}
          ref={minplayersRef}
          max={4}
          onChange={event => setMinPlayers(event.target.value)} />
         <Form.Control
          type='number'
          placeholder='Cantidad máxima de jugadores'
          required
          ref={maxplayersRef}
          min={2}
          max={4}
          onChange={event => setMaxPlayers(event.target.value)} />
        <span style={{ color: 'red' }}>{validplayers}</span>
      </Form.Group>

      <Form.Group className='form-group'>
        <Form.Label>
         Cantidad de juegos:
        </Form.Label>
        <Form.Control
          type='number'
          placeholder='Ingrese la cantidad de juegos'
          required
          ref={numgamesRef}
          min={1}
          max={200}
          onChange={event => setNumGames(event.target.value)} />
      </Form.Group>

      <Form.Group className='form-group'>
        <Form.Label>
         Cantidad de Rondas:
        </Form.Label>
        <Form.Control
          type='number'
          placeholder='Ingrese la cantidad de rondas'
          required
          ref={numrondasRef}
          min={1}
          max={10000}
          onChange={event => setNumRondas(event.target.value)} />
      </Form.Group>

      <Form.Group className='form-group'>
        <Form.Label>
          Contraseña (Opcional)
        </Form.Label>
        <Form.Control
          type='password'
          placeholder='Ingrese contraseña (opcional)' 
          minLength={1}
          maxLength={10}
          ref={passwordRef}
          onChange={event => setPassword(event.target.value)} />
          <span style={{ color: "red" }}>{passwordErr}</span>
      </Form.Group>

      <Form.Group className='form-group'>
        <Form.Label>
          Seleccione un robot:
        </Form.Label>
        <Form.Control
          multiple
          ref={idrobotRef}
          type='select'
          as='select'
          onChange={event => { setIdRobot(event.target.value) }}>
          {
            datosRobot.map((robot) => (
              <option value={robot.id} key={robot.id}>{robot.nombre}</option>
              )
              )
            }
        </Form.Control>
      </Form.Group>
      <br/>
      <Form.Group className='mb-3'>
        <Button
          variant='success'
          type='submit'
          disabled={!namepartida || !numgames || !numrondas || !minplayers || !maxplayers || !idrobot}
          size='lg'>
          Crear
        </Button>
        &nbsp;
        <Button
          variant='secondary'
          type='reset'
          size='lg'>
            Cancelar
        </Button>
      </Form.Group>
    </Form>
    </>
  )
}

export default CreatePartida;
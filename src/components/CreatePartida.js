import React, { useEffect, useRef, useState } from 'react';
import { Form, Image, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import axios from 'axios';
import './css/CreatePartida.css';

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

  // Referencias a los inputField.
  const namepartidaRef = useRef();
  const passwordRef = useRef();
  const numgamesRef = useRef();
  const numrondasRef = useRef();
  const minplayersRef = useRef();
  const maxplayersRef = useRef();
  const idrobotRef = useRef();

  // Modal:
  const [successUpload, setSuccessUpload] = useState(false);

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

  const [username, setUsername] = useState('');
  const [tokenReady, setTokenReady] = useState(false);

  useEffect(function () {
        
    const API_ID = '/login/verify_token'
    const URL_ID = "http://127.0.0.1:8000" + API_ID
    
    const tokenDict = localStorage.getItem('user');
    if(tokenDict !== null){
        const tokenValue = (JSON.parse(tokenDict)).accessToken;
        console.log(tokenValue);

        let TokenData = new FormData();
        TokenData.append('Authorization', tokenValue);
        
        axios.post(URL_ID, TokenData)
        .then((res) => {
            console.log("Token Partida: ", res.data.nombre_usuario)
            setUsername(res.data.nombre_usuario)
            setTokenReady(true)
        }) 
        .catch((err) => {
            console.log(err)
        });
    }

  } , []);

  //Leer datos de robots
  useEffect(function () {
      if(tokenReady){

        let robot_list = new FormData();
        robot_list.append('username', username);
        
        axios.post('http://127.0.0.1:8000/lista-robots', robot_list)
        .then((res) => {
          console.log(res)
          setDatosRobot(res.data)
        }) 
        .catch((err) => {
          console.log(err)
        });
        
        console.log(username);
      }
    }, [tokenReady]);

  //Enviar datos a la API
  async function handleSubmit(event) {
    event.preventDefault()
    console.log('Enviando datos al servidor');
    const API = 'http://127.0.0.1:8000/crear-partida';
    let formData = new FormData();

    formData.append('namepartida', namepartida);
    formData.append('password', password);
    formData.append('numgames', numgames);
    formData.append('numrondas', numrondas);
    formData.append('minplayers', minplayers);
    formData.append('maxplayers', maxplayers);
    formData.append('idrobot', idrobot);

    try {
      const response = await axios.post(API, formData);
      console.log(response);
      setSuccessUpload(true);
    } catch (e) {
      console.log(e);
      console.log('error')
    }
  }

  return (
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
            <span style={{ color: "red" }}>{namepartida}</span> se añadió a la lista de partidas.
          </Modal.Body>
          <Modal.Footer>
            <a href='/post-login'>
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
          <Modal.Title>No se pudo subir tu robot 😔</Modal.Title>
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
          max={3}
          onChange={event => setMinPlayers(event.target.value)} />
         <Form.Control
          type='number'
          placeholder='Cantidad máxima de jugadores'
          required
          ref={maxplayersRef}
          min={3}
          max={4}
          onChange={event => setMaxPlayers(event.target.value)}/>
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
          onChange={event => setNumGames(event.target.value)}
        />
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
          onChange={event => setNumRondas(event.target.value)}/>
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
  )
}

export default CreatePartida;
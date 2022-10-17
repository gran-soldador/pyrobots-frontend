import React, { useEffect, useState } from 'react';
import { Form, Image, Button } from 'react-bootstrap';
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
  const [numplayers, setPlayers] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    const API = 'http://127.0.0.1:8000/crear-partida';
    let formData = new FormData();

    formData.append('namepartida', namepartida);
    formData.append('password', password);
    formData.append('numgames', numgames);
    formData.append('numrondas', numrondas);
    formData.append('numplayers', numplayers);
    formData.append('idrobot', idrobot);

    try {
      const response = await axios.post(API, formData);
      return response;
    } catch (e) {
      console.log('error')
    }
    setLoading(false)
  }

  return (
    <Form className='form_create_pardida' onSubmit={handleSubmit}> 
      <Image src={logo}></Image>

      <Form.Text>
        <h1>PyRobots</h1>
      </Form.Text>
      <Form.Text>
        <h1>Crear Partida</h1>
      </Form.Text>

      <hr></hr>
      <Form.Group className='mb-3'>
        <Form.Label>
          Nombre de la partida:
        </Form.Label>
        <Form.Control
          control
          type='text'
          placeholder='Ingrese el nombre de la partida'
          className='form-control' 
          required
          minLength={4}
          maxLength={16}
          onChange={event => setNamePartidas(event.target.value)}/>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>
         Cantidad de jugadores:
        </Form.Label>
        <Form.Control
          type='number'
          placeholder='Ingrese la cantidad de jugadores'
          className='form-control'
          required
          min={2}
          max={4}
          onChange={event => setPlayers(event.target.value)}/>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>
         Cantidad de juegos:
        </Form.Label>
        <Form.Control
          type='number'
          placeholder='Ingrese la cantidad de juegos'
          className='form-control'
          required
          min={1}
          max={200}
          onChange={event => setNumGames(event.target.value)}
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>
         Cantidad de Rondas:
        </Form.Label>
        <Form.Control
          type='number'
          placeholder='Ingrese la cantidad de rondas'
          className='form-control'
          required
          min={1}
          max={10000}
          onChange={event => setNumRondas(event.target.value)}/>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>
          Contraseña (Opcional)
        </Form.Label>
        <Form.Control
          type='password'
          placeholder='Ingrese contraseña (opcional)' 
          className='form-control'
          min={1}
          maxLength={10}
          onChange={event => setPassword(event.target.value)}/>
      </Form.Group>

      <Form.Group className='form-group'>
        <Form.Label>
          Seleccione un robot:
        </Form.Label>
        <Form.Control
          native
          multiple
          type='select'
          as="select"
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
          disabled={!namepartida || !numgames || !numrondas || !numplayers || !idrobot}
          size='lg'>
          {loading? 'Espere por favor': 'Crear'}
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
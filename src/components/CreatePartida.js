import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Image, Button } from 'react-bootstrap';
import logo from './logo.png';
import axios from 'axios'

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

  //Leer datos de robots
  async function handleDatosRobots() {
    console.log('Leyendo API ROBOTS');
    try {
      const response = await fetch('https://63458450745bd0dbd36aae3e.mockapi.io/listrobots', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      if (response.status === 200) {
        setDatosRobot(await response.json())
      } else {
        setDatosRobot([])
      }
    } catch (error) {
      console.log(error)
    }
  }
  //Cargar la lista de robots
  useEffect(() => {
    const firstCall = setTimeout(handleDatosRobots, 0);
    return () => clearTimeout(firstCall);
  }, [])
  //Actualizar la lista
  useEffect(() => {
    const autoRefresh = setInterval(handleDatosRobots, 10000);
    return () => clearInterval(autoRefresh);
  }, []);
  
  //Enviar datos a la API
  async function handleSubmit() {
    console.log('Enviando datos al servidor');
    setLoading(true);

    const API = 'http://127.0.0.1:8000/files';
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
              <option value={robot.id} key={robot.id}>{robot.name}</option>
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
import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { Form, Image, Button } from 'react-bootstrap';
import logo from './logo.png'
import axios from 'axios';

const CreatePartida = () => {
  //Datos partida
  const [namepartida, setNamePartidas] = useState('');
  const [password, setPassword] = useState('');
  const [numgames, setNumGames] = useState('');
  const [numrondas, setNumRondas] = useState('');
  const [numplayers, setPlayers] = useState('');

  //Datos de API robot
  const [idrobot, setIdRobot] = useState(-1);
  const [datosRobot, setDatosRobot] = useState([]);

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

  //Enviar datos a la API
  const handleSubmit = (event) => {
    event.preventDefault()

    const API = "http://127.0.0.1:8000/files"
    // const API = 'https://63458450745bd0dbd36aae3e.mockapi.io/crear-partida'
    let formData = new FormData();

    formData.append('namepartida', namepartida);
    formData.append('password', password);
    formData.append('numgames', numgames);
    formData.append('numrondas', numrondas);
    formData.append('numplayers', numplayers);
    formData.append('idrobot', idrobot);

    console.log('Enviando',)
    axios.post(API, formData)
    .then((res) => { console.log(res) })
    .catch((err) => { console.log(err) });
  }

  const handsetNamePartidas = (event) => {
    setNamePartidas(event.target.value);
  }
  const handsetPassword = (event) => {
    setPassword(event.target.value);
  }
  const handsetNumGames = (event) => {
    setNumGames(event.target.value);
  }
  const handsetNumRondas = (event) => {
    setNumRondas(event.target.value);
  }
  const handsetPlayers = (event) => {
    setPlayers(event.target.value);
  }
  const handsetIdRobot = (event) => {
    const opcion = event.target.value;
    console.log(opcion);
    setIdRobot(opcion);
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
          onChange={handsetNamePartidas} />
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
          onChange={handsetPlayers}/>
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
          onChange={handsetNumGames}
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
          onChange={handsetNumRondas}/>
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>
          Contraseña
        </Form.Label>
        <Form.Control
          type='password'
          placeholder='Ingrese contraseña (opcional)' 
          className='form-control'
          min={1}
          maxLength={10}
          onChange={handsetPassword}/>
      </Form.Group>

      {/* <Form.Group className='mb-3'>
      <Form.Label>
          Robot
      </Form.Label>
      <FormControl className="form-control" variant="standard">
        <InputLabel disabled value={-1}>Seleccione un robot</InputLabel>
        <Select className='custom-select' required onClick={handsetIdRobot}>
          {datosRobot.map((item, i) => (
            <MenuItem key={'list' + i} value={i}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      </Form.Group> */}

      {/* <div className='form-group'>
        <label htmlFor='idrobot'>Selecione un robot:</label>
        <select onChange={handsetIdRobot} id='idrobot' name='idrobot' className='form-control'>
          <option value=''>Seleccione una opción</option>
          {
            datosRobot.map((item, index) => (
              <option value={index} key={item.id} onClick={() => {settingid(id)}}>{item.name}</option>
              )
            )
          }
        </select>
      </div> */}
      <Form.Group className='mb-3'>
        <div className='form-group'>
          <label>Selecione un robot:</label>
          <select required value={idrobot} name='robot'onChange={handsetIdRobot} className='form-control'>
            <option disabled value={-1}>Seleccione una opción</option>
            {
              datosRobot.map((item, i) => (
                <option key={'robot' + i} value={i}>{item.name} </option>
                )
              )
            }
          </select>
        </div>
      </Form.Group>
      <br/>
      <Form.Group className='mb-3'>
        <Button variant='success'
          type='submit'
          size='lg'>
            Crear
        </Button>{' '}
        <Button variant='secondary'
          type='reset'
          size='lg'>
            Cancelar
        </Button>
      </Form.Group>
      </Form>
  )
}

export default CreatePartida;
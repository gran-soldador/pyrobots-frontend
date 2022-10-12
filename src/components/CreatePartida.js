import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import logo from './logo.png'
import axios from 'axios';

const CreatePartida = () => {
  const [infoPartida, setInfoPartida] = useState({
    namepartida: '',
    password: '',
    numgames: '',
    numrondas: '',
    numplayers: '',
  });

  //Datos de API robot
  const [id, setId] = useState(-1);
  const [nameRobot, setNameRobot] = useState('');
  const [avatarRobot, setAvatarRobot] = useState(null);
  const [codeRobot, setCodeRobot] = useState(null);
  const [datosRobot, setDatosRobot] = useState([]);

  const settingid = (i) => {
    setId(datosRobot[i]['id']);
    setNameRobot(datosRobot[i]['name'])
    setAvatarRobot(datosRobot[i]['vatar'])
    setCodeRobot(datosRobot[i]['code'])
  }

  //cargar la lista de robots
  useEffect(() => {
    const firstCall = setTimeout(handleDatosRobots, 0);  
    return () => clearTimeout(firstCall);
  }, [])
  //actualizar la lista 
  useEffect(() => {
    const autoRefresh = setInterval(handleDatosRobots, 10000);
    return () => clearInterval(autoRefresh);
  }, []);

  //leer datos de robots
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

  const handleChange = (event) => {
    setInfoPartida({
      ...infoPartida,
      [event.target.name]: event.target.value
    })
  }

  //enviar datos a la API
  const handleSubmit = (event) => {
    event.preventDefault()
    let formData = new FormData();
    formData.append('infoPartida', infoPartida);

    console.log('Enviando')
    axios({
      url: 'https://63458450745bd0dbd36aae3e.mockapi.io/crear-partida',
      method: 'post',
      data: formData,
      config: { headers: { 'Content-Type': 'multipart/form-data' } }
    })
    .then((res) => { console.log(res) })
    .catch((err) => { console.log(err) });
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
          name='namepartida'
          value={infoPartida.namepartida}
          minLength={4}
          maxLength={16}
          onChange={handleChange} />
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
          name='numplayers'
          min={2}
          max={4}
          value={infoPartida.numplayers}
          onChange={handleChange}/> 
      </Form.Group>
      
      <Form.Group className='mb-3'>
        <Form.Label> 
         Cantidad de juegos:
        </Form.Label>
        <Form.Control
          type='number'
          placeholder='Ingrese la cantidad de jugadores'
          className='form-control'
          required
          name='numgames'
          min={1}
          max={200}
          value={infoPartida.numgames}
          onChange={handleChange}/>
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
          name='numrondas'
          min={1}
          max={10000}
          value={infoPartida.numrondas}
          onChange={handleChange}/>
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
          name='password'
          maxLength={10}
          value={infoPartida.password}
          onChange={handleChange}/>
      </Form.Group>

      <div className='form-group'>
        <label htmlFor='idrobot'>Selecione un robot:</label>
        <select id='idrobot' name='idrobot' className='form-control'>
          <option value='-1'>Seleccione una opción</option>
          {
            datosRobot.map((item, index) => (
              <option value={index} key={item.id} onClick={() => {settingid(id)}}>{item.name}</option>
              )
            )
          }
        </select>
      </div>
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
import React, { useEffect, useRef, useState } from 'react';
import { Form, Image, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import logo from '../media/azul.svg';
import axios from 'axios';
import NavBar from './NavBar_2';
import './css/SimulationForm.css';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { API_ENDPOINT_LIST_ROBOTS, API_ENDPOINT_SIMULATION, BASE_URL } from './ApiTypes';


const CreateSim = () => {
  //Datos sim
  const [numrondas, setNumRondas] = useState('');

  // Mostar Modal de error si hay errores en los imputs.
  const [invalidForm, setInvalidForm] = useState(false);
  const [errorString, setErrorString] = useState('');
  const hideErrorForm = () => setInvalidForm(false);
  const [invalidAmountR, setInvalidAmountR] = useState(false);

  const roundForm = useRef();
 
  const [isLoading, setLoading] = useState(true);

  // Modal:
  const [successUpload, setSuccessUpload] = useState(false);

  const handleCloseModal = () => {
    roundForm.current.value = "";
    setSuccessUpload(false);
  }

  //Datos de API robot
  const [idrobots, setIdRobots] = useState([]);
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

  const resetForm = () => {
    setIdRobots([]);
    setInvalidAmountR('')
  }

  const handleValidation = () => {
    setErrorString('');
    let valid = true;
    if (idrobots.length < 2 || idrobots.length > 4) {
      valid = false;
      setInvalidAmountR('Debes seleccionar 2 robots como mínimo y 4 como máximo.');
    } else {
      setInvalidAmountR('');
    }
    return valid;
  }

  //Enviar datos a la API
  async function handleSubmit(event) {
    event.preventDefault()
    if (handleValidation()) {
      console.log('Enviando datos al servidor');
      let formData = new FormData();

      const tokenDict = localStorage.getItem('user');
      if (tokenDict !== null) {
        const tokenValue = (JSON.parse(tokenDict)).accessToken;
        formData.append('rounds', numrondas);
        idrobots.forEach(item => {
          formData.append('robot_ids', item);
          });
        console.log(formData);
        setSuccessUpload(true);
      
        try {
          const response = await axios.post(BASE_URL + API_ENDPOINT_SIMULATION, formData, {
            headers: { 'Authorization': `Bearer ${tokenValue}` }
          });
          console.log(response);
          setLoading(false);
          localStorage.setItem("sim", JSON.stringify(response.data));
        } catch (e) {
          setSuccessUpload(false);
          console.log(e);
          setErrorString('Por favor intente de nuevo más tarde.');
          setInvalidForm(true);
        }
      }
    } else {
      setErrorString('Por favor revise los datos del formulario.');
      setInvalidForm(true);
    }
  }

  const handleSelect = event => {
    const robots = [];
    for (let i=0; i<event.target.value.length; i++) {
        robots.push(event.target.value[i]);
    }
    setIdRobots(robots);
  }

return (
  <>
  <NavBar />
  <br/>
  <Form className='form_create_sim' onSubmit={handleSubmit}>
    <Modal
      className='modal'
      show={successUpload}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}>
        <Modal.Header>
          <Modal.Title>Tu simulación ya se esta calculando!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Aguarde un momento mientras se calcula la simulación.
          <br/>
          Cuando la simulación esté lista podrá hacer click abajo.
        </Modal.Body>
        <Modal.Footer>
          <a href='/ver-tablero'>
            <Button 
              variant="primary"
              disabled={isLoading}
              onClick={handleCloseModal}
              className='buttonModal'>
                Ver simulación
            </Button>
          </a>
        </Modal.Footer>
    </Modal>
    <Modal
      className='modal-errorForm'
      show={invalidForm}
      onHide={hideErrorForm}
      backdrop="static"
      keyboard={false}>
      <Modal.Header closeButton>
        <Modal.Title>No se pudo cargar la simulación</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorString}
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
      <h1>Crear Simulación</h1>
    </Form.Text>

    <hr></hr>
    <Form.Group className='form-group'>
      <Form.Label>
       Cantidad de Rondas:
      </Form.Label>
      <Form.Control
        type='number'
        ref={roundForm}
        placeholder='Ingrese la cantidad de rondas'
        required
        min={1}
        max={10000}
        onChange={event => setNumRondas(event.target.value)} />
    </Form.Group>

    <Form.Group className='form-group'>
      <Form.Label id="multiple-robots-label">
        Seleccione sus robots:
      </Form.Label>
      <br/>
      <FormControl sx={{ m: 1, width: 300 }}>
      <Select
        multiple
        labelId="multiple-robots-label"
        value={idrobots}
        onChange={handleSelect}>
          {datosRobot.map((robot) => (
            <MenuItem
              key={robot.id}
              value={robot.id}>
              {robot.name}
            </MenuItem>
          ))}
      </Select>
      </FormControl>
      <br/>
      <span style={{ color: 'red' }}>{invalidAmountR}</span>
    </Form.Group>
    <br/>
    <Form.Group className='mb-3'>
      <Button
        variant='success'
        type='submit'
        size='lg'>
        Crear
      </Button>
      &nbsp;
      <Button
        variant='secondary'
        type='reset'
        onClick={resetForm}
        size='lg'>
          Cancelar
      </Button>
    </Form.Group>
  </Form>
  </>
  )
}

export default CreateSim;
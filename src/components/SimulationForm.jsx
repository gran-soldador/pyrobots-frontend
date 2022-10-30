import React, { useEffect, useState } from 'react';
import { Form, Image, Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import logo from './logo.png';
import axios from 'axios';
import NavBar from './NavBar_2';
import './css/SimulationForm.css';

const CreateSim = () => {
  //Datos sim
  const [numrondas, setNumRondas] = useState('');

  // Mostar Modal de error si hay errores en los imputs.
  const [invalidForm, setInvalidForm] = useState(false);
  const hideErrorForm = () => setInvalidForm(false);
  const [invalidAmountR, setInvalidAmountR] = useState(false);
 
  const [isLoading, setLoading] = useState(true);

  // Modal:
  const [successUpload, setSuccessUpload] = useState(false);

  const handleCloseModal = () => {
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
      axios.get('http://127.0.0.1:8000/lista-robots', {
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
  }

  const handleValidation = () => {
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
      const API = 'http://127.0.0.1:8001/crear-sim'; //CAMBIAR
      let formData = new FormData();

      const tokenDict = localStorage.getItem('user');
      if (tokenDict !== null) {
        const tokenValue = (JSON.parse(tokenDict)).accessToken;
        formData.append('numrondas', numrondas);
        idrobots.forEach(item => {
          formData.append('idrobots', item);
         });
      
        try {
          const response = await axios.post(API, formData, {
            headers: { 'Authorization': `Bearer ${tokenValue}` }
          });
          console.log(response);
          setSuccessUpload(true);
          setLoading(false);
          localStorage.setItem("sim", JSON.stringify(response.data));
        } catch (e) {
          console.log(e);
          setInvalidForm(true);
        }
      }
    } else {
      console.log('Formulario no válido');
    }
  }

  const handleSelect = function(selectedItems) {
    const robots = [];
    for (let i=0; i<selectedItems.length; i++) {
        robots.push(selectedItems[i].value);
    }
    setIdRobots(robots);
  }

return (
  <>
  <NavBar />
  <br/>
  <Form className='form_create_sim' onSubmit={handleSubmit}>
    <Modal
      className='modal-upload'
      show={successUpload}
      onHide={handleCloseModal}
      backdrop="static"
      keyboard={false}>
        <Modal.Header>
          <Modal.Title>Tu simulación ya se esta calculando!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Aguarde un momento mientras se calcula la simulación.
        </Modal.Body>
        <Modal.Footer>
          <a href='/ver-tablero'>
            <Button 
              variant="primary"
              disabled={isLoading}
              onClick={handleCloseModal}
              className='buttonModal'>
                Aceptar
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
        Por favor intente de nuevo más tarde.
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
       Cantidad de Rondas:
      </Form.Label>
      <Form.Control
        type='number'
        placeholder='Ingrese la cantidad de rondas'
        required
        min={1}
        max={10000}
        onChange={event => setNumRondas(event.target.value)} />
    </Form.Group>

    <Form.Group className='form-group'>
      <Form.Label>
        Seleccione sus robots(Utilize "Ctrl + Click"):
      </Form.Label>
      <Form.Control
        multiple
        type='select'
        as='select'
        onChange={e => {handleSelect(e.target.selectedOptions)}}>
        {
          datosRobot.map((robot) => (
            <option value={robot.id} key={robot.id}>{robot.nombre}</option>
            )
            )
          }
      </Form.Control>
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
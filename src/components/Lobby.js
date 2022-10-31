import React, { useEffect, useState, useRef } from "react";
import './css/Lobby.css';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';


const Lobby = () => {
  //datos ws
  const ws = useRef(null)
  const [listPlayers, setListPlayers] = useState([])
  const [isReady, setIsready] = useState(false)
  //api robot
  const [datosRobot, setDatosRobot] = useState([]);
  //datos unirse a partida
  const [password, setPassword] = useState(false)
  const [idrobot, setIdRobot] = useState(0);
  //validaciones
  const [isHost, setIsHost] = useState(false);
  const [isJoined, setIsJoined] = useState(false);

  //errores
  const [errorShow, setErrorShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Modal:
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErrorShow(false);
  }
  
  //Enviar datos para abandonar partida
  async function handleSubmitAbandonar(event) {
    event.preventDefault()
    console.log('Enviando datos al servidor');
    const API = 'http://127.0.0.1:8000/abandonar-partida';
    let formData = new FormData();

    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      const partida_id = localStorage.getItem('id_lobby')
      console.log('partida', partida_id)
      formData.append('partida_id', partida_id);
      try {
        const response = await axios.post(API, formData, {
          headers: { 'Authorization': `Bearer ${tokenValue}` }
        });
        console.log(response);
        setIsJoined(false);
        console.log('estoy saliendo del lobby')
        ws.current.close()
      } catch (e) {
        setErrorMsg('');
        console.log(e.response);
        if (e.response.data.detail === 'no es un participante') {
          setErrorShow(true);
          setErrorMsg('No eres un participante de esta partida.');
        }
        if (e.response.data.detail === 'el creador no puede abandonar') {
          setErrorShow(true);
          setErrorMsg('El creador no puede abandonar la partida.');
        }
        if (e.response.data.detail === 'ya no tiene permitido abandonar') {
          setErrorShow(true);
          setErrorMsg('Ya no se tiene permitido abandonar.');
        }
      }
    }
  }

  //Enviar datos para iniciar partida
  async function handleSubmitIniciar(event) {
    event.preventDefault()
    console.log('Enviando datos al servidor');
    const API = 'http://127.0.0.1:8000/iniciar-partida';
    let formData = new FormData();

    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      const partida_id = localStorage.getItem('id_lobby')
      console.log('partida', partida_id)
      formData.append('partida_id', partida_id);
      try {
        const response = await axios.post(API, formData, {
          headers: { 'Authorization': `Bearer ${tokenValue}` }
        });
        console.log(response);
      } catch (e) {
        setErrorMsg('');
        console.log(e.response);
        if (e.response.data.detail === 'la partida no existe') {
          setErrorShow(true);
          setErrorMsg('La partida no existe.');
        }
        if (e.response.data.detail === 'permiso denegado') {
          setErrorShow(true);
          setErrorMsg('No tienes el permiso para iniciar la partida.');
        }
        if (e.response.data.detail === 'jugadores insuficientes') {
          setErrorShow(true);
          setErrorMsg('Número de jugadores insuficientes.');
        }
        if (e.response.data.detail === 'la partida ya fue iniciada') {
          setErrorShow(true);
          setErrorMsg('La partida ya fue iniciada.');
        }
      }
    }
  }
  
  //Enviar datos para unirme a partida
  async function handleSubmitUnirse(event) {
    event.preventDefault()
    console.log('Enviando datos al servidor');
    const API = 'http://127.0.0.1:8000/unir-partida';
    let formData = new FormData();

    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      const partida_id = localStorage.getItem('id_lobby')
      console.log('partida', partida_id)
      console.log('password', password)
      console.log('id_robot', idrobot)
      formData.append('partida_id', partida_id);
      if (listPlayers.contraseña) {
        formData.append('password', password);
      }
      formData.append('id_robot', idrobot);
      try {
        const response = await axios.post(API, formData, {
          headers: { 'Authorization': `Bearer ${tokenValue}` }
        });
        console.log(response);
        setIsJoined(true);
      } catch (e) {
        setErrorMsg('');
        console.log(e.response);
        if (e.response.data.detail === 'la partida no existe') {
          setErrorShow(true);
          setErrorMsg('La partida no existe.');
        }
        if (e.response.data.detail === 'partida no disponible') {
          setErrorShow(true);
          setErrorMsg('La partida ya alcanzó su máximo de jugadores o ya fue iniciada.');
        }
        if (e.response.data.detail === 'contraseña incorrecta') {
          setErrorShow(true);
          setErrorMsg('Contraseña incorrecta.');
        }
        if (e.response.data.detail === 'no puede unirse a su propia partida') {
          setErrorShow(true);
          setErrorMsg('No puedes unirte a tu propia partida.');
        }
        if (e.response.data.detail === 'usuario ya unido') {
          setErrorShow(true);
          setErrorMsg('Usuario ya unido.');
        }
        if (e.response.data.detail === 'el robot no existe') {
          setErrorShow(true);
          setErrorMsg('El robot no existe.');
        }
        if (e.response.data.detail === 'el robot no pertenece al usuario') {
          setErrorShow(true);
          setErrorMsg('El robot no pertenece al usuario.');
        }
      }
    }
  }

  //Conección con websocket
  useEffect(() => {
    console.log('estoy conectandome al ws')
    ws.current = new WebSocket('ws://localhost:8000/ws/' + localStorage.getItem('id_lobby'))
    ws.current.onmessage = (event) => {
      console.log("data ws: ", event.data)
      setListPlayers(JSON.parse(event.data));
      setIsready(true);
      if(JSON.parse(event.data).creador === localStorage.getItem("username")){
        setIsHost(true);
      }
      // for (let i = 0; i < JSON.parse(event.data).robot.length; i++) { //ARREGLAR
        if(JSON.parse(event.data).creador !== localStorage.getItem("username")){
          setIsJoined(true);
        }
      // }
    };
  }, []);

  //Leer datos de robots
  useEffect(function () {
    console.log("estoy leyendo lista de robots")
    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      axios.get('http://127.0.0.1:8000/lista-robots', {
        headers: { 'Authorization': `Bearer ${tokenValue}` }
      })
      .then((res) => {
        setDatosRobot(res.data)
        console.log(res)
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }, []);

  //printear los jugadores que se van uniendo
  function listLobby(){
    let renderElements = [];
    if(isReady) {
      for (let index = 0; index < listPlayers.robot.length; index++) {
        renderElements.push(
          <tr key={index}>
            <td> {listPlayers.robot[index].usuario} </td>  
            <td> {listPlayers.robot[index].nombre} </td>
          </tr>
      )
    }
  }
  return renderElements;
  };

  //diferenciar boton de host
  function boton_correcto() {
    if (isHost) {
      return (
        <Button variant='primary' onClick={(e) => { handleSubmitIniciar(e)}}> 
            Iniciar partida
        </Button>
      )
    }
    else {
      return (
        <Button variant='primary' onClick={(e) => { setShow(true) }}>
          Unirse
        </Button>
      )
    }
  }

  //diferenciar boton de abandonar
  function show_boton_abandonar() {
    if (isJoined) {
      return (
        <Button variant='secondary' onClick={handleSubmitAbandonar}>
          Abandonar
        </Button>
      )
    }
  }

  return (
    <div>
      <div className="Title">
        <h1>Sala: {localStorage.getItem('id_lobby')}</h1>
        <table className='table table-striped table-hover mt-5 shadow-lg'
          cellSpacing='0'
          cellPadding='0'
          id='key-lobby'>
        <thead className='table-dark'>
            <tr>
              <th>Nombre</th>
              <th>Robot</th>
            </tr>
          </thead>
          <tbody>
            {listLobby()}
          </tbody>
        </table>
        <div className="GameButton-lobby">
          {boton_correcto()}
          <a href='/listar-partidas'>
          <Button variant='secondary'>
            Cancelar
          </Button>
          {show_boton_abandonar()}
          </a>
        </div>
      </div>
      <Modal
        className='modal-joinGame'
        show={show}
        onHide={handleClose}
        backdrop="static">
          <Modal.Header closeButton>
            <Modal.Title> Unirte a la partida <span style={{ color: 'red' }}> gameName </span> </Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form onSubmit={handleSubmitUnirse}>
            <Form.Text>
              <h1>Unirme a Partida</h1>
            </Form.Text>
            <Form.Group className='form-group'>
              <Form.Label>
                Contraseña
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Ingrese contraseña'
                minLength={1}
                maxLength={10}
                disabled={listPlayers.contraseña ? 0 : 1}
                onChange={event => setPassword(event.target.value)} />
            </Form.Group>

            <Form.Group className='form-group'>
              <Form.Label>
                Seleccione un robot:
              </Form.Label>
              <Form.Control
                multiple
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
                size='lg'
                disabled={!idrobot}
                onClick={() => { handleClose() } }>
                Unirme
              </Button>
              &nbsp;
              <Button
                variant='secondary'
                type='reset'
                size='lg'
                onClick={handleClose}>
                  Cancelar
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
      <Modal
        className='modal-errorForm'
        show={errorShow}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>
        <Modal.Header closeButton>
          <Modal.Title>Ha ocurrido un error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {errorMsg}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={handleClose}
            className='buttonModal'>
            Aceptar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Lobby;
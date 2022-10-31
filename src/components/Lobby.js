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
  const [isJoined, setIsJoined] = useState(false)
  const [joinGameForm, setJoinGameForm] = useState(false);
  const [isHost, setIsHost] = useState(false);

  // Modal:
  const passwordRef = useRef();
  const idrobotRef = useRef();
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    passwordRef.current.value = '';
    idrobotRef.current.value = '';
  }
  const handleShow = () => {
    setJoinGameForm(true)
    setShow(true);
  }

  //Enviar datos para unirme a partida
  async function handleSubmit(event) {
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
      } catch (e) {
        console.log(e);
      }
      console.log('Formulario no válido');
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
    if(isHost){
      return "Iniciar"
    }
    else{
      return isJoined ? "Iniciar" : "Unirse"
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
          <Button variant='primary' onClick={handleShow}> 
            { boton_correcto() }
          </Button> &nbsp;
          <Button variant='secondary'>
            Cancelar
          </Button>
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
          <Form onSubmit={handleSubmit}>
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
                ref={passwordRef}
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
                ref={idrobotRef}
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
                onClick={handleClose}>
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
    </div>
  );
}

export default Lobby;
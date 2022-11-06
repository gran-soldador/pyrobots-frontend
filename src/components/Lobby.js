import React, { useEffect, useState, useRef } from "react";
import './css/Lobby.css';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import {
  API_ENDPOINT_LEAVE_GAME, API_ENDPOINT_JOIN_GAME,
  API_ENDPOINT_LIST_GAMES, API_ENDPOINT_START_GAME,
  BASE_URL, BASE_URL_LOBBY
} from "./ApiTypes";


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

  // Estado de la partida
  const [gameState, setGameState] = useState(null);
  const [isFull, setIsFull] = useState(false);

  // Modal de estado de la partida
  const [gameIsFinished, SetGameIsFinished] = useState(false);
  const [gameIsRunning, SetGameIsRunning] = useState(false);
  const [closeFormFinish, setCloseFormFinished] = useState(false);

  // Modal:
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErrorShow(false);
    setIdRobot(0);
  }
  
  //Enviar datos para abandonar partida
  async function handleSubmitAbandonar(event) {

    event.preventDefault()
    let formData = new FormData();

    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      const partida_id = localStorage.getItem('id_lobby')
      formData.append('partida_id', partida_id);
      try {
        await axios.post(BASE_URL + API_ENDPOINT_LEAVE_GAME, formData, {
          headers: { 'Authorization': `Bearer ${tokenValue}` }
        });
        setIsJoined(false);
        setIdRobot(0);
      } catch (e) {
        setErrorMsg('');
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
    let formData = new FormData();

    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      const partida_id = localStorage.getItem('id_lobby')
      formData.append('partida_id', partida_id);
      
      try {
        await axios.post(BASE_URL + API_ENDPOINT_START_GAME, formData, {
          headers: { 'Authorization': `Bearer ${tokenValue}` }
        });
      } catch (e) {
        setErrorMsg('');
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
    setShow(false);
    let formData = new FormData();

    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      const partida_id = localStorage.getItem('id_lobby')
      formData.append('partida_id', partida_id);
      if (listPlayers.contraseña) {
        formData.append('password', password);
      }
      formData.append('id_robot', idrobot);
        await axios.post(BASE_URL + API_ENDPOINT_JOIN_GAME, formData, {
          headers: { 'Authorization': `Bearer ${tokenValue}` }
        })
        .then((res) => {
          console.log(res)
        })
        .catch((e) => {
          console.log(e)
          setErrorMsg('');
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
      });
    }
  }
  
  //Conección con websocket
  useEffect(() => {
    ws.current = new WebSocket(BASE_URL_LOBBY + localStorage.getItem('id_lobby'))
    ws.current.onmessage = (event) => {
      const jsonData = JSON.parse(event.data)
      setListPlayers(jsonData);
      setIsFull(jsonData.robot.length >= localStorage.getItem('max_players') 
                || jsonData.robot.length <= localStorage.getItem('min_players'));

      setGameState(jsonData.event)
      setIsready(true);

      if(jsonData.creador === localStorage.getItem("username")){
        setIsHost(true);
        setIsJoined(true);
      }
      
      for (let i = 0; i < jsonData.robot.length; i++) {
        if(jsonData.robot[i].usuario === localStorage.getItem("username")){
          setIsJoined(true); 
        }
      }
    };
  }, []);

  //Leer datos de robots
  useEffect(function () {
    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      axios.get(BASE_URL + API_ENDPOINT_LIST_GAMES, {
        headers: { 'Authorization': `Bearer ${tokenValue}` }
      })
      .then((res) => {
        setDatosRobot(res.data)
      })
      .catch((err) => {
      });
    }
  }, []);
  
  
  //Leer datos de robots
  useEffect(function () {
    console.log(gameState)
    if(gameState === 'finish'){
      SetGameIsFinished(true);
    }
    if(gameState === 'init'){
      SetGameIsRunning(true);
    }
  }, [gameState]);
  
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
  function boton_correcto(){
    let body = '';
    if(isHost && isJoined){
      body = (
        <div className="button-game">
          <Button variant='primary mr-1' value={"Iniciar"} onClick={(e) => {handleSubmitIniciar(e)}}> 
            Iniciar 
          </Button>
        </div>
      ) 
    }
    else if(!isHost && !isJoined){
      body = (
        <div className="button-game">
          <Button variant='primary mr-1' onClick={() => {setShow(true)}}  
          disabled={isFull}
          data-testid='boton-unirse'> 
            Unirse 
          </Button>
        </div>
      )
    }
    else if(!isHost && isJoined){
      body = (
        <div className="button-game">
          {show_boton_abandonar()}
        </div>
      )
    }
    else{
      return "Algo salió mal"
    }
    
    return body;
  }

  function show_boton_abandonar() {
    if (isJoined) {
      return (
        <Button variant='secondary' 
          onClick={handleSubmitAbandonar}>Abandonar Sala</Button>
      )
    }
  }

  function goWinner(){
    setCloseFormFinished(false)
  }

  function isRunning(){
    if(gameIsRunning){
      return("La partida ya ha comenzado!")
    }
    return " "
  }

   return (
    <div>
      <div className="Title">
        <h1>Sala: {localStorage.getItem('id_lobby')}</h1>
        <h2> 
          <span style={{ color: "red" }}>
            { isRunning()}
          </span>
        </h2>
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
        </div>
      </div>

      <Modal
        className='modal-finished'
        show={gameIsFinished}
        onHide={closeFormFinish}
        backdrop="static"
        keyboard={false}>
        <Modal.Header>
          <Modal.Title>La partida ha finalizado</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <a href="/ganador">
            <Button
              variant="primary"
              onClick={goWinner}
              className='buttonModal'>
                Ver resultado
            </Button>
          </a>
          {" "}
          <a href="/listar-partidas">
            <Button
                variant="primary"
                className="btn btn-dark ">
                  Salir
              </Button>
          </a>
        </Modal.Body>
      </Modal>


      <Modal
        className='modal-joinGame'
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}>

          <Modal.Header closeButton>
            <Form.Text>
              <h1>Unirme a la partida</h1>
            </Form.Text>
          </Modal.Header>
          <Modal.Body>

          <Form onSubmit={handleSubmitUnirse}>
            <Form.Group className='form-group'>
              <Form.Label>
                Contraseña
              </Form.Label>
              <Form.Control
                type='password'
                placeholder='Ingrese contraseña'
                required
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
                data-testid='robot-input'
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
                data-testid='modal-unirme'
                disabled={!idrobot}>
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
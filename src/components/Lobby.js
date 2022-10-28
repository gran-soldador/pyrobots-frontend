import React, { useEffect, useState, useRef } from "react";
import './css/Lobby.css';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';


const Lobby = () => {
  const [listPlayers, setListPlayers] = useState([])
  const ws = useRef(null)

  const handleCloseModal = () => {
    setIsJoined(true)
    setJoinGameForm(false);
  }

  const [isReady, setIsready] = useState(false)
  const [isJoined, setIsJoined] = useState(false)

  const [datosRobot, setDatosRobot] = useState([]);
  const [idrobot, setIDRobot] = useState(0);
  const [joinGameForm, setJoinGameForm] = useState(false);

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

  useEffect(() => {
    const partida_id = localStorage.getItem('id_lobby');
    console.log("El id es: ", partida_id)
    ws.current = new WebSocket('ws://localhost:8000/ws/' + partida_id)
    ws.current.onmessage = (event) => {
      console.log("recibiendo datos lobby");
      setListPlayers(JSON.parse(event.data));
      setIsready(true);
    };
  }, []);

  if(isReady){
    console.log(listPlayers);
  }

  function joinGame (){
    setJoinGameForm(true)
    console.log("enviar: ", idrobot)
    console.log("Work here!")
  }
  
  return (
    <div>
      <div className="Title">
        <h1>Sala: #numero de la sala</h1>
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
            <tr>
              <td>Nombre del jugador</td>
              <td> Robot Elegido</td>
            </tr>
          </tbody>
        </table>
        <div className="GameButton-lobby">
          <Button variant='primary' onClick={() => {joinGame()}}> 
            { isJoined ? "Iniciar" : "Unirse" } 
          </Button> &nbsp;

          <Button variant='secondary'> Salir </Button>
        </div>
      </div>

      <Modal
          className='modal-joinGame'
          show={joinGameForm}
          onHide={handleCloseModal}
          backdrop="static"
          keyboard={false}>
              <Modal.Header closeButton>
              <Modal.Title>Completa los siguientes datos para unirte a la partida <span style={{ color: 'red' }}> gameName </span> </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                
              <Form.Group className='form-group'>
                <Form.Label>
                  Seleccione un robot:
                </Form.Label>
                <Form.Control
                  multiple
                  type='select'
                  as='select'
                  onChange={event => { setIDRobot(event.target.value) }}>
                  {
                    datosRobot.map((robot) => (
                      <option value={robot.id} key={robot.id}>{robot.nombre}</option>
                      )
                    )
                    }
                </Form.Control>
              </Form.Group>


              </Modal.Body>
              <Modal.Footer>
                  <Button 
                      variant="primary" 
                      onClick={handleCloseModal}
                      className='buttonModal'>
                          Aceptar
                  </Button>
          </Modal.Footer>
      </Modal>


    </div>
  );
}
export default Lobby;
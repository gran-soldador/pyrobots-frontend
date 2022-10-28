import React, { useEffect, useState, useRef } from "react";
import './css/Lobby.css';
import { Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const Lobby = () => {

  const [listPlayers, setListPlayers] = useState([])
  const ws = useRef(null)

  const [isReady, setIsready] = useState(false)
  const [isJoined, setIsJoined] = useState(false)

  const [datosRobot, setDatosRobot] = useState([]);
  const [idrobot, setIDRobot] = useState(0);
  const [joinGameForm, setJoinGameForm] = useState(false);
  
  const [isHost, setIsHost] = useState(false);

  function handleCloseModal(event) {
    event.preventDefault()
    console.log(idrobot)
    // Conectar Endpoint

    const baseURL = "http://127.0.0.1:8000/unir-partida";
    
    const tokenDict = localStorage.getItem('user');
    const tokenValue = (JSON.parse(tokenDict)).accessToken;

    let formData = new FormData();
    formData.append('partida_id', localStorage.getItem("partida_id"));
    formData.append('id_robot', idrobot);

    

    axios.post(baseURL, formData, {
      headers: {"Authorization" : `Bearer ${tokenValue}`}
    })
    .then((res) => {
      console.log(res)
    }) 
    .catch((err) => {
      console.log(err)
    })

    setIsJoined(true);
    setJoinGameForm(false);
  }


  //Leer datos de robots
  useEffect(function () {
    console.log("lee datos robots")
    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      axios.get('http://127.0.0.1:8000/lista-robots', {
        headers: { 'Authorization': `Bearer ${tokenValue}` }
      })
      .then((res) => {
        // console.log(res)
        setDatosRobot(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
    }
    }, []);

  useEffect(() => {

    console.log("El id es: ", localStorage.getItem('id_lobby'))
    ws.current = new WebSocket('ws://localhost:8000/ws/' + localStorage.getItem('id_lobby'))
    ws.current.onmessage = (event) => {
      console.log("data: ", event.data)
      setListPlayers(JSON.parse(event.data));
      setIsready(true);

      if(JSON.parse(event.data).creador === localStorage.getItem("username")){
        setIsHost(true);
      }
    
    };


  }, []);

  
  function joinGame (){

    setJoinGameForm(true)

  }


  function listLobby(){
    let renderElements = [];
    if(isReady){

      console.log("lp", listPlayers)
      
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

  function boton_correcto(){
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
          <Button variant='primary' onClick={() => {joinGame()}}> 
            { boton_correcto() } 
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
                
              <Form.Group className='form-group' onSubmit={handleCloseModal}>
                
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

                  <Modal.Footer>
                      <Button 
                          variant="primary" 
                          onClick={handleCloseModal}
                          className='buttonModal'>
                          
                              Aceptar
                      </Button>
                  </Modal.Footer>

                  </Form.Group>
              </Modal.Body>
      </Modal>


    </div>
  );
}
export default Lobby;
import React, { useEffect, useState, useRef } from "react";
import './css/Lobby.css';
import { Button } from 'react-bootstrap';


const Lobby = () => {
  const [listPlayers, setListPlayers] = useState([])
  const ws = useRef(null)
  const [isReady, setIsready] = useState(false)

  useEffect(() => {
    ws.current = new WebSocket('ws://localhost:8000/ws/' + localStorage.getItem('id_lobby'))
    ws.current.onmessage = (event) => {
      console.log("recibiendo datos lobby");
      setListPlayers(JSON.parse(event.data));
      setIsready(true);
    };
  }, []);

  if(isReady){
    console.log(listPlayers);
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
              <td><button> Dropdown</button></td>
            </tr>
          </tbody>
        </table>
        <div className="GameButton-lobby">
          <Button variant='primary'> Iniciar </Button> &nbsp;
          <Button variant='secondary'> Salir </Button>
        </div>
      </div>
    </div>
  );
}
export default Lobby;
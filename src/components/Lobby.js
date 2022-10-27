import React, { useEffect, useState, useRef } from "react";
import './css/Lobby.css';
import { Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";


const Lobby = () => {

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
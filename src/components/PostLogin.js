import React from "react";
import './css/PostLogin.css';

import { useLocation, useNavigate } from "react-router-dom"

const PostLogin = () => {

  let navigate = useNavigate();
  
  const { state } = useLocation();
  const { username } = state;

  function handleUpload(){
    navigate("/subir-bot", { state: {username: username} })
  }
  
  return (
    <div>
      <div className='Box-main-post'>
        <h1 className='title'>Que desea realizar?</h1>
          <a href='/crear-partida'>
            <button className='btn btn-primary btn-lg'>Crear Partida</button>
          </a>
          &nbsp;
          <a href='/listar-partidas'>
            <button className='btn btn-primary btn-lg'>Listar Partida</button>
          </a>
          <br/> <br/>
            <button className='btn btn-primary btn-lg' onClick={handleUpload}>Subir bot</button>
          &nbsp;
          <a href='/ver-tablero'>
            <button className='btn btn-primary btn-lg'>Ver tablero</button>
          </a>
      </div>
    </div>
  );
}

export default PostLogin;
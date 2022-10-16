import React from "react";
import './css/MainPage.css';

const MainPage = () => {
  return (
    <div>
      <div className='Box-main'>
        <h1 className='title'>Bienvenido a PY-Robots</h1>
          <a href='/crear-partida'>
            <button className='btn btn-primary btn-lg'>Crear Partida</button>
          </a>
          &nbsp;
          <a href='/listar-partidas'>
          <button className='btn btn-primary btn-lg'>Unirse a Partida</button>
          </a>
      </div>
    </div>
  );
}

export default MainPage;
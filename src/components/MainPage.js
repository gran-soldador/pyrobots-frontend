import React from "react";
import './css/MainPage.css';

const MainPage = () => {
  return (
        <div className='Box-main'>
          <h1 className='title'>Bienvenido a<br/> PY-Robots</h1>
            <a href='/login'>
              <button className='btn btn-primary btn-lg'>Login</button>
            </a>
            &nbsp;
            <a href='/registrarse'>
            <button className='btn btn-primary btn-lg'>Registro</button>
            </a>
        </div>
  );
}

export default MainPage;
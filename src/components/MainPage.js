import React from "react";
import NavBar from './NavBar_1';
import './css/MainPage.css';

const MainPage = () => {
  return (
    <> 
      <NavBar/>
      <div className='Box-main'>
        <h1 className='title'>Bienvenido a<br/> PY-Robots</h1>
      </div>
    </>
  );
}

export default MainPage;
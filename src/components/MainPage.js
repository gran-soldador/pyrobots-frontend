import React from "react";
import NavBar from './NavBar1';
import './css/MainPage.css';

import redRobotImage from '../media/rojo.svg';
import blueRobotImage from '../media/azul.svg';
import greenRobotImage from '../media/verde.svg';

const MainPage = () => {
  return (
    <> 
      <NavBar/>
      <div className='Box-main'>
        <h1 className='title'>Bienvenido a <span id='titulo'>PY-Robots</span> </h1>
        <div className="image-group">
          <img src={blueRobotImage} alt="PyRobot - Inicio" width="100" height="100"/> 
          <img src={redRobotImage} alt="PyRobot - Inicio" width="100" height="100"/> 
          <img src={greenRobotImage} alt="PyRobot - Inicio" width="100" height="100"/> 
        </div>
        <br/>
      </div>
    </>
  );
}

export default MainPage;
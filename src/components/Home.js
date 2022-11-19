import React from "react";
import './css/Home.css';
import NavBar2 from "./NavBar2";

import redRobotImage from '../media/rojo.svg';
import blueRobotImage from '../media/azul.svg';
import greenRobotImage from '../media/verde.svg';


const PostLogin = () => {
  
  return (
    <>
    <NavBar2 />
    <div className='Box-main'>
        <h1 className='title'> <span id='titulo'>PY-Robots</span> </h1>
        <div className="image-group">
          <img src={blueRobotImage} alt="PyRobot - Inicio" width="100" height="100"/> 
          <img src={redRobotImage} alt="PyRobot - Inicio" width="100" height="100"/> 
          <img src={greenRobotImage} alt="PyRobot - Inicio" width="100" height="100"/> 
        </div>
      </div>
    </>
  );
}

export default PostLogin;
import React, { useEffect, useRef, useState } from 'react'
import NavBar from './NavBar_2';

import './css/GameBoard.css';


import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

import yellowRobotImage from '../media/amarillo.svg';
import redRobotImage from '../media/rojo.svg';
import blueRobotImage from '../media/azul.svg';
import greenRobotImage from '../media/verde.svg';

export function GameBoard() {
    
    // Descomentar para probar juego de 10.000 rondas.
    // const jsonData= require('./out.json'); 

    const canvasRef = useRef();

    const [dataSimulation, setDataSimulation] = useState([]);
    const [isLoading, setLoading] = useState(true);

    const [progressBar, setProgressBar] = useState("");
    var index = 0;
   
    const drawingIncanvas = (dataSimulation) => {
        
        const yellowRobot = new Image();
        yellowRobot.src = yellowRobotImage;
        
        const redRobot = new Image();
        redRobot.src = redRobotImage;
        
        const blueRobot = new Image();
        blueRobot.src = blueRobotImage;
        
        const greenRobot = new Image();
        greenRobot.src = greenRobotImage;
        
        greenRobot.onload = () => {
            render()
        };

        const render = () => {
            
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            
            const width = canvas.width;
            const height = canvas.height;
            const robotSize = 50;

            const robotList = [yellowRobot, redRobot, blueRobot, greenRobot];

            setProgressBar(createDamageBar());
            ctx.clearRect(0, 0, width, height);
            
            for (let i = 0; i < dataSimulation.robotcount; i++) {
                if (dataSimulation.robots[i].damage[index] < 100) {
                    ctx.drawImage(robotList[i], dataSimulation.robots[i].positions[index].x-robotSize/2, 
                        dataSimulation.robots[i].positions[index].y-robotSize/2, robotSize, robotSize);
                }
            }

            if(index < dataSimulation.rounds){
                index++;
            }
            else{
                return;
            }
            
            requestAnimationFrame(render)
        }
    }
    
    useEffect(function () {
        const getDataSimulation = () => {
            const API = "simulacion" 
            const URL = "http://127.0.0.1:8000/" + API;
            
            axios.get(URL)
            .then((response) => {

                // Descomentar para probar juego con 10.000 rondas.
                // setDataSimulation(jsonData);
                
                // Comentar esta linea para probar el juego con 10.000 rondas.
                setDataSimulation(response.data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });
        }

        getDataSimulation();
        
    }, []);
    

    function createDamageBar(){

        let renderElements = [];

        let colorBars = ["amarillo-pbar", "rojo-pbar", "azul-pbar", "verde-pbar"];

        for (let i = 0; i < dataSimulation.robotcount; i++) {
            let currentDamage = 100 - dataSimulation.robots[i].damage[index];
            
            renderElements.push( 
                <div className="col" key={"robot"+i}>
                    <div className='robot-damage'>
                        <p>{dataSimulation.robots[i].name}</p>
                        <div className="progress mb-2" style={{height: '25px'}}>
                            <div className={"progress-bar " + colorBars[i]}
                                role="progressbar" 
                                aria-valuenow="100" 
                                aria-valuemin="0" 
                                aria-valuemax="100" 
                                style={{width: currentDamage.toString()+'%'}}> 
                                    {currentDamage}% 
                            </div>
                        </div>
                    </div> 
                </div>
            )
        }
        return(
            renderElements
        )
    };
    
    function runAnimation (){
        if(!isLoading){
            drawingIncanvas(dataSimulation);                
        }
        else{
            alert("Espera unos segundos e intente de nuevo.")
        }
    }

    return (
        <>
        <NavBar />
        <br/>
        <div className='gameboard-pyrobots'>
                <header className="mb-3">
                    <h1>Simulación de PyRobots</h1>
                    <hr />
                </header>

            <div className="container-progressbar">
                <div className="row">
                        {progressBar}
                </div>
            </div> 

            <canvas id='canvas' width={1000} height={1000} ref={canvasRef}/>
            <br></br>
            <button type="button" className="btn btn-success" onClick={runAnimation}>Simular</button>
        </div>
        </>
    );
};

export default GameBoard;


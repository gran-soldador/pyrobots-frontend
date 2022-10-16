import React, { useEffect, useRef, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

import yellowRobotImage from '../media/amarillo.svg';
import redRobotImage from '../media/rojo.svg';
import blueRobotImage from '../media/azul.svg';
import greenRobotImage from '../media/verde.svg';

export function GameBoard() {
    
    const canvasRef = useRef();
    
    const [dataSimulation, setDataSimulation] = useState([]);
    const [isLoading, setLoading] = useState(true);
    
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
        
        var index = 0;
        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            
            const width = canvas.width;
            const height = canvas.height;
            const robotSize = 50;
            
            ctx.clearRect(0, 0, width, height);
            
            if (dataSimulation.robots[0].damage[index] < 100) {
                ctx.drawImage(yellowRobot, dataSimulation.robots[0].positions[index].x, 
                    dataSimulation.robots[0].positions[index].y, robotSize, robotSize);
            }
            if (dataSimulation.robotcount > 0) {
                if (dataSimulation.robots[1].damage[index] < 100) {
                    ctx.drawImage(redRobot, dataSimulation.robots[1].positions[index].x, 
                        dataSimulation.robots[1].positions[index].y, robotSize, robotSize);
                }
            }
            if (dataSimulation.robotcount > 1) {
                if (dataSimulation.robots[2].damage[index] < 100) {
                    ctx.drawImage(blueRobot, dataSimulation.robots[2].positions[index].x, 
                        dataSimulation.robots[2].positions[index].y, robotSize, robotSize);
                }
            }
            if (dataSimulation.robotcount > 2) {
                if (dataSimulation.robots[3].damage[index] < 100) {
                    ctx.drawImage(greenRobot, dataSimulation.robots[3].positions[index].x, 
                        dataSimulation.robots[3].positions[index].y, robotSize, robotSize);
                }
            }

            if(index < dataSimulation.rounds){
                index++;
            }
            else{
                console.log("Termine con index: ", index);
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
                setDataSimulation(response.data);
                setLoading(false);
            })
            .catch((e) => {
                console.log(e);
            });
        }
        
        getDataSimulation();
        
    }, []);
    

    function runAnimation (){
        if(!isLoading){
            console.log(dataSimulation);
            drawingIncanvas(dataSimulation);
        }
        else{
            alert("Espera unos segundos e intente de nuevo.")
        }
    }
        
    return (
        <div className='gameboard-pyrobots'>

                <header className="mb-3">
                    <h1>Simulación de PyRobots</h1>
                    <hr />
                </header>

                <div className="container-progressbar">
                    <div className="row">
                        <div className="col-12 col-lg-5 offset-lg-1">
                            <p>{/*dataSimulation.robots[0].name*/}</p>
                            <div className="progress mb-2" style={{height: '25px'}}>
                                <div className="progress-bar azul-pbar " role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}>100%</div>
                            </div>

                            <p>{/*dataSimulation.robots[1].name*/}</p>
                            <div className="progress mb-2" style={{height: '25px'}}>
                                <div className="progress-bar verde-pbar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: '75%'}}>75%</div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-5">
                            <p>{/*dataSimulation.robots[2].name*/}</p>
                            <div className="progress mb-2" style={{height: '25px'}}>
                                <div className="progress-bar amarillo-pbar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width: '50%'}}>50%</div>
                            </div>
                            <p>{/*dataSimulation.robots[3].name*/}</p>
                            <div className="progress mb-2" style={{height: '25px'}}>
                                <div className="progress-bar rojo-pbar" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100" style={{width: '25%'}}>25%</div>
                            </div>
                        </div>
                    </div>
                </div>

                <canvas id='canvas' width={1000} height={1000} ref={canvasRef}/>
                <br></br>
                <input id="clickMe" type="button" value="clickme" onClick={runAnimation} />

        </div>
    );
};

// export default GameBoard;

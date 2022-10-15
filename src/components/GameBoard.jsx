import React, { useEffect, useRef, useState } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

import yellowRobotImage from '../media/amarillo.svg';
import redRobotImage from '../media/rojo.svg';
import blueRobotImage from '../media/azul.svg';
import greenRobotImage from '../media/verde.svg';

export function GameBoard() {
    
    const canvasRef = useRef();
    const robotList = ["HK-47", "R2-D2", "MESSI", "C-3PO"];
    
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
            
            ctx.drawImage(yellowRobot, index, 50, robotSize, robotSize);

            ctx.drawImage(redRobot, dataSimulation["B2"].positions[index].x, 
                        dataSimulation["B2"].positions[index].y, robotSize, robotSize);

            ctx.drawImage(blueRobot, dataSimulation["A1"].positions[index].x, 
                        dataSimulation["A1"].positions[index].y, robotSize, robotSize);
            

            ctx.drawImage(greenRobot, 0, 700, robotSize, robotSize);
            
            if(index < dataSimulation["A1"].positions.length-1){
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
                setDataSimulation(response.data.robots);
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
                            <p>{robotList[0]}</p>
                            <div className="progress mb-2" style={{height: '25px'}}>
                                <div className="progress-bar azul-pbar " role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style={{width: '100%'}}>100%</div>
                            </div>

                            <p>{robotList[1]}</p>
                            <div className="progress mb-2" style={{height: '25px'}}>
                                <div className="progress-bar verde-pbar" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{width: '75%'}}>75%</div>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-5">
                            <p>{robotList[2]}</p>
                            <div className="progress mb-2" style={{height: '25px'}}>
                                <div className="progress-bar amarillo-pbar" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100" style={{width: '50%'}}>50%</div>
                            </div>
                            <p>{robotList[3]}</p>
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

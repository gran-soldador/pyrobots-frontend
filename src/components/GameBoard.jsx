import React, { useEffect, useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.css';

import yellowRobotImage from '../media/amarillo.svg';
import redRobotImage from '../media/rojo.svg';
import blueRobotImage from '../media/azul.svg';
import greenRobotImage from '../media/verde.svg';

export function GameBoard() {
    
    const canvasRef = useRef();
    const robotList = ["HK-47", "R2-D2", "MESSI", "C-3PO"]; // Obtener del backend.

    useEffect(function () {

        const render = () => {

            console.log("Drawing...")
            
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            
            const width = canvas.width;
            const height = canvas.height;
            const robotSize = 50;
            
            // Load robots images:
            const yellowRobot = new Image();
            yellowRobot.src = yellowRobotImage;
            
            const redRobot = new Image();
            redRobot.src = redRobotImage;
            
            const blueRobot = new Image();
            blueRobot.src = blueRobotImage;
            
            const greenRobot = new Image();
            greenRobot.src = greenRobotImage;
            
            /*            
            // Ver un onload cuando se carguen todas las imagenes.
            let images = [yellowRobot, redRobot, blueRobot, greenRobot];
            var imageCount = images.length;
            var imagesLoaded = 0;

            for(var i=0; i < imageCount; i++){
                images[i].onload = function(){
                    imagesLoaded++;
                    if(imagesLoaded === imageCount){
                        allLoaded();
                    }
                }
            }

            function allLoaded(){
                drawImages();
            }
            */

            greenRobot.onload = () => {
                ctx.clearRect(0, 0, width, height);
                ctx.drawImage(yellowRobot, 200, 50, robotSize, robotSize);
                ctx.drawImage(redRobot, 450, 450, robotSize, robotSize);
                ctx.drawImage(blueRobot, 750, 800, robotSize, robotSize);
                ctx.drawImage(greenRobot, 100, 700, robotSize, robotSize);
            };
        
        }

        render();
    
    }, []);


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

        </div>
    );
};

export default GameBoard;

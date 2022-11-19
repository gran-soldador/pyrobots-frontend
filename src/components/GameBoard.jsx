import React, { useEffect, useState } from 'react'
import NavBar from './NavBar_2';

import './css/GameBoard.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal } from 'react-bootstrap';

import yellowRobotImage from '../media/amarillo.svg';
import redRobotImage from '../media/rojo.svg';
import blueRobotImage from '../media/azul.svg';
import greenRobotImage from '../media/verde.svg';

import yellowMissileImage from '../media/misilAmarillo.svg';
import redMissileImage from '../media/misilRojo.svg';
import blueMissileImage from '../media/misilAzul.svg';
import greenMissileImage from '../media/misilVerde.svg';
import missileBurstImage from '../media/missileBurst.svg';

export function GameBoard() {


    const [dataSimulation, setDataSimulation] = useState([]);
    const [progressBar, setProgressBar] = useState("");

    const [invalidSim, setInvalidSim] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showError, setShowError] = useState(false);
    
    const [gamePaused, setGamePaused] = useState(false);

    const [index, setIndex] = useState(0);

    const [rounds, setRounds] = useState(1);

    const [showWinner, setShowWinner] = useState(false);
    const [showTied, setShowTied] = useState(false);
    const [showAllLosers, setShowAllLosers] = useState(false);
    const hideModal = () => {
        setShowWinner(false);
        setShowTied(false);
        setShowAllLosers(false);
    }

    const [winners, setWinners] = useState([]);

    
    const [requestID, setRequestID] = useState("");


    // Missiles
    const yellowMissile = new Image();
    yellowMissile.src = yellowMissileImage;
    const redMissile = new Image();
    redMissile.src = redMissileImage;
    const blueMissile = new Image();
    blueMissile.src = blueMissileImage;
    const greenMissile = new Image();
    greenMissile.src = greenMissileImage;

    // Estallido de missil
    const missileBurst = new Image();
    missileBurst.src = missileBurstImage;

    // cargamos las imagenes de los robots.
    const yellowRobot = new Image();
    yellowRobot.src = yellowRobotImage;
    const redRobot = new Image();
    redRobot.src = redRobotImage;
    const blueRobot = new Image();
    blueRobot.src = blueRobotImage;
    const greenRobot = new Image();
    greenRobot.src = greenRobotImage;
    
    // Canvas: 
    const canvas = document.getElementById('canvas')
    const robotSize = 50;
    const missilSize = 40;
    const missileBurstSize = 60;
    
    const robotList = [yellowRobot, redRobot, blueRobot, greenRobot];
    const scannerColor = ["rgba(255, 240, 0, 0.3)", "rgba(255, 99, 71, 0.3)", "rgba(11, 127, 171, 0.3)","rgba(0, 230, 64, 0.3)"]
    
    const missilList = [yellowMissile, redMissile, blueMissile, greenMissile];

    // Funciones
    function createDamageBar(){
        let renderElements = [];
        let colorBars = ["amarillo-pbar", "rojo-pbar", "azul-pbar", "verde-pbar"];
        for (let i = 0; i < dataSimulation.players.length; i++) {
            let currentDamage = 100 - dataSimulation.rounds[index].robots[i].damage;
            renderElements.push( 
                <div className="col" key={"robot"+i}>
                    <div className='robot-damage'>
                        <p>{dataSimulation.players[i].name}</p>
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

    function drawScanner(canvas, color, x_position, y_position, i, robotSize){
        const ctxScanner = canvas.getContext("2d"); //retorna un contexto de dibujo en el lienzo.
        ctxScanner.save(); 
        var angle = -dataSimulation.rounds[index].robots[i].scanner.angle; 
        var amp = dataSimulation.rounds[index].robots[i].scanner.amplitude;
        var x2 = (x_position+robotSize/2) + Math.cos((angle-amp/2)) * 1300;
        var y2 = (y_position+robotSize/2) + Math.sin((angle-amp/2)) * 1300;
        var x3 = (x_position+robotSize/2) + Math.cos((angle+amp/2)) * 1300;
        var y3 = (y_position+robotSize/2) + Math.sin((angle+amp/2)) * 1300;
        ctxScanner.beginPath();
        ctxScanner.fillStyle = color;
        ctxScanner.moveTo(x_position+robotSize/2, y_position+robotSize/2);
        ctxScanner.lineTo(x2, y2);
        ctxScanner.lineTo(x3, y3);
        ctxScanner.fill();
        ctxScanner.closePath();
        ctxScanner.restore(); //Restaura el estado de lienzo más recientemente salvado.
    }
    
    function drawCanvas(){ 
        if(index > rounds){
            return;
        }
        const ctx = canvas.getContext('2d');
        const ctxMisil = canvas.getContext("2d"); //retorna un contexto de dibujo en el lienzo.
    
        const width = canvas.width;
        const height = canvas.height;

        setProgressBar(createDamageBar());
        ctx.clearRect(0, 0, width, height);
        for (let i = 0; i < dataSimulation.players.length; i++) {
            if (dataSimulation.rounds[index].robots[i].damage < 100 ) {
                const x_position = dataSimulation.rounds[index].robots[i].x-robotSize/2;
                const y_position = 1000 - dataSimulation.rounds[index].robots[i].y-robotSize/2;
                if(dataSimulation.rounds[index].robots[i].scanner.used){
                    drawScanner(canvas, scannerColor[i], x_position, y_position, i, robotSize);
                }
            }
        }
        for (let i = 0; i < dataSimulation.players.length; i++) {
            if (dataSimulation.rounds[index].robots[i].damage < 100 ) {                   
                const x_position = dataSimulation.rounds[index].robots[i].x-robotSize/2;
                const y_position = 1000 - dataSimulation.rounds[index].robots[i].y-robotSize/2;                    
                ctx.drawImage(robotList[i], x_position, y_position, robotSize, robotSize);
            }
        }
        //muestra los vuelos de misiles en la simulación.
        for (let j = 0; j < dataSimulation.rounds[index].missiles.length; j++) {
            ctxMisil.save(); //Guarda todo el estado del lienzo.
            var robot = dataSimulation.rounds[index].missiles[j].sender;
            var x = dataSimulation.rounds[index].missiles[j].x;
            var y = 1000 - dataSimulation.rounds[index].missiles[j].y;
            var angle = -dataSimulation.rounds[index].missiles[j].angle;
            ctxMisil.translate(x, y);
            ctxMisil.rotate(angle);// missil rotado
            ctxMisil.translate(-x, -y);
            ctxMisil.drawImage(missilList[robot], x-missilSize/2, y-missilSize/2 , missilSize , missilSize);
            ctxMisil.restore(); //Restaura el estado de lienzo más recientemente salvado.
        }
        //muestra el estallido del missil.
        for (let k = 0; k < dataSimulation.rounds[index].explosions.length; k++) {
            ctxMisil.drawImage(missileBurst, dataSimulation.rounds[index].explosions[k].x-missileBurstSize/2,
                1000 - dataSimulation.rounds[index].explosions[k].y-missileBurstSize/2 , missileBurstSize , missileBurstSize);
        }
    }

    function pauseGame(){

        cancelAnimationFrame(requestID);
        setGamePaused(true);
    }
    
    function resumeGame(){
        if (!invalidSim) {
            setGamePaused(false);
            render();
        } else {
            setShowError(true);
        }
    }
    
    function backStep(){
        if(index > 0){
            setIndex(index-1);
        }
        drawCanvas();
    }
    
    function nextStep(){
        if(index < rounds){
            setIndex(index+1)
        }
        drawCanvas();
    }


    function render(){

        if(dataLoaded && !gamePaused){
            drawCanvas();
            if(index < rounds){
                setIndex(index + 1);
                setRequestID(requestAnimationFrame(drawCanvas));
            }
            else{
                const winnersTemp = [];
                for (let i = 0; i < dataSimulation.winners.length; i++) {
                    winnersTemp.push(dataSimulation.winners[i].name);
                }
                setWinners(winnersTemp);
                if (winnersTemp.length > 1) {
                    setShowTied(true);
                } else if (winnersTemp.length === 1){
                    setShowWinner(true);
                } else {
                    setShowAllLosers(true);
                }
                setIndex(0);
                setGamePaused(true);
                return;
            }            
        }
    }



    // Ejecución:
    useEffect(function () {
        const readyBot = new Image();
        readyBot.src = greenRobotImage;
        
        readyBot.onload = () => {
            render();
        };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, gamePaused]);

    useEffect(function () {
        const getDataSimulation = () => {
            const sim = localStorage.getItem('sim');
            if (sim !== null) {
                const simValue = (JSON.parse(sim));
                setDataSimulation(simValue);
                setDataLoaded(true);
                setRounds(simValue.rounds_played)
                localStorage.removeItem('sim');
            } else {
                if (!dataLoaded) {
                    setInvalidSim(true);
                }
            }
        }
        getDataSimulation();
    }, [dataLoaded]);



    return(
        <>  
            <NavBar />
            <Modal
            className='modal-upload'
            show={showError}
            backdrop="static"
            keyboard={false}>
                <Modal.Header>
                <Modal.Title>No se pudo cargar la simulación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Por favor intente de nuevo más tarde.
                </Modal.Body>
                <Modal.Footer>
                <a href='/crear-simulacion'>
                    <Button 
                    variant="primary"
                    className='buttonModal'>
                        Ok
                    </Button>
                </a>
                </Modal.Footer>
            </Modal>
            <Modal
            className='modal'
            show={showWinner}
            backdrop="static"
            keyboard={false}>
                <Modal.Header>
                <Modal.Title>El robot ganador es:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h4><span style={{ color: 'green' }}>{winners[0]}</span></h4>
                </Modal.Body>
                <Modal.Footer>
                <Button 
                    variant="primary"
                    onClick={hideModal}
                    className='buttonModal'>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal
            className='modal'
            show={showTied}
            backdrop="static"
            keyboard={false}>
                <Modal.Header>
                <Modal.Title>Estos robots empataron:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <h5><span style={{ color: 'green' }}>{winners[0]}</span>
                    <br/>
                    <span style={{ color: 'green' }}>{winners[1]}</span>
                    <br/>
                    <span style={{ color: 'green' }}>{winners[2]}</span>
                    <br/>
                    <span style={{ color: 'green' }}>{winners[3]}</span></h5>
                </Modal.Body>
                <Modal.Footer>
                <Button 
                    variant="primary"
                    onClick={hideModal}
                    className='buttonModal'>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal
            className='modal'
            show={showAllLosers}
            backdrop="static"
            keyboard={false}>
                <Modal.Header>
                <Modal.Title>No hubo ganadores</Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                <Button 
                    variant="primary"
                    onClick={hideModal}
                    className='buttonModal'>
                    Ok
                </Button>
                </Modal.Footer>
            </Modal>
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
                <canvas id='canvas' width={1000} height={1000}/>
                <br></br>

            <Button className="btn-playgame" onClick={ backStep } >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-left-fill" viewBox="0 0 16 16">
                    <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>
                </svg>
            </Button>
            {" "}
  
            <Button className="btn-playgame" onClick={ resumeGame }>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M6.271 5.055a.5.5 0 0 1 .52.038l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 6 10.5v-5a.5.5 0 0 1 .271-.445z"/>
                </svg>  
            </Button>
            {" "}

            <Button className="btn-playgame" onClick={ pauseGame } id='stopAnimating'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pause-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M5 6.25a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5zm3.5 0a1.25 1.25 0 1 1 2.5 0v3.5a1.25 1.25 0 1 1-2.5 0v-3.5z"/>
                </svg>           
            </Button> 
            {" "}

            <Button className="btn-playgame" onClick={ nextStep }  id='stopAnimating'>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-caret-right-fill" viewBox="0 0 16 16">
                    <path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
                </svg>          
            </Button>  
            {correctRange()}
        </div>

        </>
    )
    
    function handleRange(event){
        event.preventDefault();
        const roundrange = parseInt(event.target.value);
        setIndex(roundrange);
        console.log(typeof roundrange)
        drawCanvas();
    }

    function correctRange(){
        if(gamePaused){
            return(
                <>
                    <input type="range" 
                        className="form-range" 
                        min={0}
                        max={rounds} 
                        step={1}
                        onChange={handleRange} 
                        defaultValue={index} />
                    <label htmlFor="customRange" className="form-label">
                        Ronda actual:
                        <span> {index} </span> 
                    </label>
                </>
            )
        }
        else{
            return(
                <>
                    <input type="range" className="form-range" min={0} max={rounds} step={1} value={index} onChange={console.log("Nashe")} />
                    <label htmlFor="customRange" className="form-label">
                        Ronda actual:
                        <span> {index} </span> 
                    </label>
                </>
            )
        }
    }
};

export default GameBoard;


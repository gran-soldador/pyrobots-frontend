import React, { useEffect, useRef, useState } from 'react'
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

    const canvasRef = useRef();

    const [dataSimulation, setDataSimulation] = useState([]);

    const [invalidSim, setInvalidSim] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);
    const [showError, setShowError] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    const [showWinner, setShowWinner] = useState(false);
    const [showTied, setShowTied] = useState(false);
    const [showAllLosers, setShowAllLosers] = useState(false);
    const hideModal = () => {
        setShowWinner(false);
        setShowTied(false);
        setShowAllLosers(false);
    }

    const [winners, setWinners] = useState([]);

    const [progressBar, setProgressBar] = useState("");
    // inicializo el index
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
        
        //inicalizamos la propiedad onload del objeto de la clase Image,
        //esto se ejecuta cuando cuando finaliza la carga de la Imagen en el navegador.
        greenRobot.onload = () => {
            render()
        };

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

        const fps = 30; //velocidad de la simulación

        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const ctxMisil = canvas.getContext("2d"); //retorna un contexto de dibujo en el lienzo.
            
            const width = canvas.width;
            const height = canvas.height;
            const robotSize = 50;
            const missilSize = 40;
            const missileBurstSize = 60;

            const robotList = [yellowRobot, redRobot, blueRobot, greenRobot];

            const missilList = [yellowMissile, redMissile, blueMissile, greenMissile];

            setProgressBar(createDamageBar());
            ctx.clearRect(0, 0, width, height);

            // muestra los robots en la simulación
            for (let i = 0; i < dataSimulation.players.length; i++) {
                if (dataSimulation.rounds[index].robots[i].damage < 100 ) {
                    ctx.drawImage(robotList[i], dataSimulation.rounds[index].robots[i].x-robotSize/2,
                        1000 - dataSimulation.rounds[index].robots[i].y-robotSize/2, robotSize, robotSize);
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

            if(index < dataSimulation.rounds_played){
                index++;
            }
            else {
                const winnersTemp = [];
                for (let i = 0; i < dataSimulation.winners.length; i++) {
                    console.log(dataSimulation.winners[i]);
                    winnersTemp.push(dataSimulation.winners[i].name);
                }
                console.log('winnerstemp', winnersTemp);
                console.log('winnerstemp',dataSimulation.winners);
                setWinners(winnersTemp);
                if (winnersTemp.length > 1) {
                    setShowTied(true);
                } else if (winnersTemp.length === 1){
                    setShowWinner(true);
                } else {
                    setShowAllLosers(true);
                }
                setIsRunning(false);
                return;
            }
            
            setTimeout(() => {
                requestAnimationFrame(render);
            }, 1000/fps)
        }
    }
    
    useEffect(function () {
        const getDataSimulation = () => {
            const sim = localStorage.getItem('sim');
            if (sim !== null) {
                const simValue = (JSON.parse(sim));
                setDataSimulation(simValue);
                setDataLoaded(true);
                localStorage.removeItem('sim');
            } else {
                if (!dataLoaded) {
                    setInvalidSim(true);
                }
            }
        }
        
        getDataSimulation();
        
    }, [dataLoaded]);
    

    function createDamageBar(){

        let renderElements = [];

        let colorBars = ["amarillo-pbar", "rojo-pbar", "azul-pbar", "verde-pbar"];

        for (let i = 0; i < dataSimulation.players.length; i++) {
            let currentDamage = 100 - dataSimulation.rounds[index].robots[i].damage;
            
            renderElements.push( 
                <div className="col" key={"robot"+i}>
                    <div className='robot-damage'>
                        <p>{dataSimulation.players[i].name}</p>
                        {/* <p>{dataSimulation.rounds[index].robots[i].damage}</p> */}
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
        if (!invalidSim) {
            setIsRunning(true);
            drawingIncanvas(dataSimulation);
        } else {
            setShowError(true);
        }
    }

    return (
        <>
        <NavBar />
        <br/>
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
              <a href='/crear-sim'>
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

            <canvas id='canvas' width={1000} height={1000} ref={canvasRef}/>
            <br></br>
            <button
                type="button"
                className="btn btn-success"
                disabled={isRunning}
                onClick={runAnimation}>Simular</button>
        </div>
        </>
    );
};

export default GameBoard;


import React, { useEffect, useRef, useState } from 'react'
import NavBar from './NavBar_2';

import './css/GameBoard.css';
import 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

import yellowRobotImage from '../media/amarillo.svg';
import redRobotImage from '../media/rojo.svg';
import blueRobotImage from '../media/azul.svg';
import greenRobotImage from '../media/verde.svg';

import yellowMisilImage from '../media/misilAmarillo.svg';
import redMisilImage from '../media/misilRojo.svg';
import blueMisilImage from '../media/misilAzul.svg';
import greenMisilImage from '../media/misilVerde.svg';

export function GameBoard() {
    
    const jsonData= require('./misiles.json'); 
    // const listMisiles = JSON.parse(jsonData);
    const missiles = jsonData.missiles;

    // Descomentar para probar juego de 10.000 rondas.
    // const jsonData= require('./out.json'); 

    const canvasRef = useRef();

    const [dataSimulation, setDataSimulation] = useState([]);
    const [isLoading, setLoading] = useState(true);

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
        
        greenRobot.onload = () => {
            render()
        };

        // Misiles
        const yellowMisil = new Image();
        yellowMisil.src = yellowMisilImage;
        const redMisil = new Image();
        redMisil.src = redMisilImage;
        const blueMisil = new Image();
        blueMisil.src = blueMisilImage;
        const greenMisil = new Image();
        greenMisil.src = greenMisilImage;

        //inicalizamos la propiedad onload del objeto de la clase Image,
        //esto se ejecuta cuando cuando finaliza la carga de la Imagen en el navegador.
        // yellowMisil.onload = () => {
        //     renderDos()
        // }

        // const renderDos = () => {
        //     const misilList = [yellowMisil, redMisil, blueMisil, greenMisil]; // array de misiles
        //     const canvas = canvasRef.current;
        //     const ctxTest = canvas.getContext("2d");
        //     ctxTest.drawImage(misilList[0],0,0); // se dibuja con el tamaño original de la img.
        //     ctxTest.drawImage(misilList[0],300,0,50,50); // ancho-alto : 50
        //     //extayendo parte de la imagen 125px de ancho-alto
        //     // y se dibuja esa parte de la imagen en la coordenada (0,300) con ancho y alto (72,72)
        //     ctxTest.drawImage(misilList[0],0,0,125,125,0,300,72,72);

        //     // El método window.requestAnimationFrame informa al navegador que quieres realizar una animación 
        //     // y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación.
        //     // El método acepta como argumento una función a la que llamar antes de efectuar el repintado.
        //     requestAnimationFrame(renderDos);
        // }

        redMisil.onload = () => {
            renderTres()
        }

        // Algunas pruebas de lo que ofrece canva.
        const renderTres = () => {
            const canvas = canvasRef.current;
            const ctxTest = canvas.getContext("2d");

            // Define the points as {x, y}
            let start = { x: 50,    y: 20  };
            let cp1 =   { x: 230,   y: 30  };
            let cp2 =   { x: 150,   y: 80  };
            let end =   { x: 250,   y: 100 };

            // Cubic Bézier curve
            ctxTest.beginPath();
            ctxTest.moveTo(start.x, start.y);
            ctxTest.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
            ctxTest.stroke();

            // ctxTest.strokeStyle = "white";

            // Start and end points
            ctxTest.fillStyle = 'blue';
            ctxTest.beginPath();
            ctxTest.arc(start.x, start.y, 5, 0, 2 * Math.PI);  // Start point
            ctxTest.arc(end.x, end.y, 5, 0, 2 * Math.PI);      // End point
            ctxTest.fill();

            // // First path
            // ctxTest.beginPath(); // método para crear una nueva ruta o Start a new path.
            // ctxTest.strokeStyle = 'blue';
            // ctxTest.moveTo(100,100); //comienza una nueva subruta en el punto especificado por las (x, y)coordenadas dadas.
            // ctxTest.lineTo(200,20); //agrega una línea recta a la ruta secundaria actual al conectar el último punto de la ruta secundaria a las (x, y)coordenadas especificadas.
            // ctxTest.stroke(2);

            // // Second path
            // ctxTest.beginPath();
            // ctxTest.strokeStyle = 'red';
            // ctxTest.moveTo(100,100);
            // ctxTest.lineTo(120,120);
            // ctxTest.stroke();

            // //3ra path
            // // Draw the ellipse's line of reflection
            // ctxTest.beginPath();
            // ctxTest.setLineDash([10, 10]);
            // ctxTest.moveTo(20, 20);
            // ctxTest.lineTo(200, 0);
            // ctxTest.stroke();

            // //4to. path 
            // ctxTest.beginPath();
            // ctxTest.moveTo(50, 50); // Begin first sub-path
            // ctxTest.lineTo(200, 50);
            // ctxTest.moveTo(50, 90); // Begin second sub-path
            // ctxTest.lineTo(280, 120);
            // ctxTest.stroke();

            requestAnimationFrame(renderTres)
        } 

        const render = () => {
            const canvas = canvasRef.current;
            const ctx = canvas.getContext("2d");
            const ctxMisil = canvas.getContext("2d"); //retorna un contexto de dibujo en el lienzo.
            
            const width = canvas.width;
            const height = canvas.height;
            const robotSize = 50;

            const robotList = [yellowRobot, redRobot, blueRobot, greenRobot];

            const misilList = [yellowMisil, redMisil, greenMisil, blueMisil];

            setProgressBar(createDamageBar());
            ctx.clearRect(0, 0, width, height);

            //recorro la lista de robots, de longitud 4,
            for (let i = 0; i < dataSimulation.robotcount; i++) {
                if (dataSimulation.robots[i].damage[index] < 100) {
                    ctx.drawImage(robotList[i], dataSimulation.robots[i].positions[index].x-robotSize/2,
                        dataSimulation.robots[i].positions[index].y-robotSize/2, robotSize, robotSize);

                    // ctxMisil.drawImage(misilList[i], dataSimulation.robots[i].positions[index].x, 
                    // dataSimulation.robots[i].positions[index].y, 40 , 40);
                    
                    //vuelos de misiles cuando este disponible el dato.
                    // for (let j = 0; j < dataSimulation.robots[i].misiles.length; j++) {
                    //     //chequeo que la lista de misiles no este vacia
                    //     if (dataSimulation.robots[i].misiles.length !== 0) {
                    //         var robot = dataSimulation.robots[i].missiles[index].robots  
                    //         ctxMisil.drawImage(robot, dataSimulation.robots[i].misiles[index].x, 
                    //             dataSimulation.robots[i].missiles[index].y , 40 , 40);
                    //     } else {
                            
                    //     }
                    // }
                    
                    //Vuelos de misiles, probando un Json con información de missiles
                    console.log("missiles: ", missiles.length);
                    for (let j = 0; j < missiles.length; j++) {
                        console.log("entro");
                        //Chequeo que la lista de missiles no este vacia
                        if (missiles[j].length !== 0) {
                            //Recorro las posiciones correspondiente a los missiles
                            for (let k=0; k < missiles[j].length; k++ ) {
                                console.log("x:", missiles[j][k].x);
                                console.log("y:", missiles[j][k].y);
                                ctxMisil.drawImage(misilList[missiles[j][k].robot], missiles[j][k].x, missiles[j][k].y, 40 , 40);
                            }
                        } else {
                            console.log("No dibujo nada");
                        }
                    }
                } else {
                    console.log("Desaparecio el robot");
                }
            }
            // cuando el index es menor de 100.000 rounds
            if(index < 1000){
                console.log("Valor del index: ", index);
                //Pruebo el movimiento usando el index
                ctxMisil.drawImage(misilList[0], index, index, 40 , 40);
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
                console.log("response: ", response.data);
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


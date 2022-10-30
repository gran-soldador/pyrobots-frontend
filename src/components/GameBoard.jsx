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
import missileBurstImage from '../media/missileBurst.svg';

export function GameBoard() {
    
    // const jsonData= require('./misiles.json'); 
    // const listMisiles = JSON.parse(jsonData);
    // const missiles = jsonData.missiles;

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

        // Estallido de missil
        const missileBurst = new Image();
        missileBurst.src = missileBurstImage;

        //inicalizamos la propiedad onload del objeto de la clase Image,
        //esto se ejecuta cuando cuando finaliza la carga de la Imagen en el navegador.
        redMisil.onload = () => {
            // renderTest();
        }

        // // Algunas pruebas de lo que ofrece canva.
        // const renderTest = () => {
        //     const canvas = canvasRef.current;
        //     const ctxTest = canvas.getContext("2d");
        //     // rectángulos a la izquierda, rotar desde el origen del lienzo
        //     ctxTest.save();
        //     // rect azul
        //     ctxTest.fillStyle = '#0095DD';
        //     ctxTest.fillRect(30, 30, 100, 100);
        //     ctxTest.rotate((Math.PI / 180) * 25);
        //     // rect gris
        //     ctxTest.fillStyle = '#4D4E53';
        //     ctxTest.fillRect(30, 30, 100, 100);
        //     ctxTest.restore();
        //     // rect blanco
        //     ctxTest.fillStyle = 'white';
        //     ctxTest.fillRect(60, 60, 100, 100);   // Dibuja un rectángulo con la configuración restaurada

        //     // El método window.requestAnimationFrame informa al navegador que quieres realizar una animación 
        //     // y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación.
        //     // El método acepta como argumento una función a la que llamar antes de efectuar el repintado.
        //    // requestAnimationFrame(renderTest);
        //     // setTimeout(renderTest, 500); //nos permite ejecutar una función una vez, pasado un intervalo de tiempo dado.   

        // } 

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

            const misilList = [yellowMisil, redMisil, greenMisil, blueMisil];

            const missilesLanzados = [];

            setProgressBar(createDamageBar());
            ctx.clearRect(0, 0, width, height);

            // muestra los robots en la simulación
            for (let i = 0; i < dataSimulation.players.length; i++) {
                if (dataSimulation.rounds[index].robots[i].damage < 100 ) {
                    ctx.drawImage(robotList[i], dataSimulation.rounds[index].robots[i].x,
                        dataSimulation.rounds[index].robots[i].y, robotSize, robotSize);
                }
            }
                    

            //muestra los vuelos de misiles en la simulación.
            for (let j = 0; j < dataSimulation.rounds[index].missiles.length; j++) {
                ctxMisil.save(); //Guarda todo el estado del lienzo.
                var robot = dataSimulation.rounds[index].missiles[j].sender;
                ctxMisil.drawImage(misilList[robot], dataSimulation.rounds[index].missiles[j].x, 
                    dataSimulation.rounds[index].missiles[j].y , missilSize , missilSize);
                    
                ctxMisil.translate(dataSimulation.rounds[index].missiles[j].x, dataSimulation.rounds[index].missiles[j].y);
                ctxMisil.rotate(dataSimulation.rounds[index].missiles[j].angle);// missil rotado
                missilesLanzados.push(dataSimulation.rounds[index].missiles[j]);
                ctxMisil.translate(-dataSimulation.rounds[index].missiles[j].x, -dataSimulation.rounds[index].missiles[j].y);
                // ctxMisil.restore(); //Restaura el estado de lienzo más recientemente salvado.
            }            

            // Muestra por consola si el array de missiles, vuelve a tener las mismas propiedades.
            // console.log("Longitud de missilesLanzados : ", missilesLanzados.length);
            // console.log("missilesLanzados ["+ index +"]: ", missilesLanzados);

            //muestra el estallido del missil.
            for (let k = 0; k < dataSimulation.rounds[index].explosions.length; k++) {
                ctxMisil.drawImage(missileBurst, dataSimulation.rounds[index].explosions[k].x, 
                    dataSimulation.rounds[index].explosions[k].y , missileBurstSize , missileBurstSize);
            }

            if(index < dataSimulation.rounds_played){                                
                index++;
            }
            else{
                return;
            }
            // Informa al navegador que quieres realizar una animación.
            requestAnimationFrame(render);
            //nos permite ejecutar una función una vez, pasado un intervalo de tiempo dado.
            // setTimeout(render, 500);    
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


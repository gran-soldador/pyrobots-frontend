import React, { useEffect, useState } from 'react';
import './css/Winner.css';
import axios from 'axios';
import { Button } from 'bootstrap';


const MainPage = () => {
  const [result, setResult] = useState([]);
  const [isEmptyList, setIsEmptyList] = useState(false);

  //conección con api
    //Actualizar lista
  useEffect(() => {
    const firstCall = setTimeout(handleGames, 0);
    return () => clearTimeout(firstCall);
  }, [])
  
  //Solicitar datos API
  async function handleGames() {
    try {
      const response = await fetch('http://localhost:8000/match-result/' + localStorage.getItem('id_lobby'), {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      if (response.status === 200) {
        setResult(await response.json())
        setIsEmptyList(false)
      } else {
        setResult([])
        setIsEmptyList(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  console.log('estoydandolosdatos', result);

  return (
    <p id='winner'>
      Ganador
     {!isEmptyList && result.map((user, id) => (
        <span className='center' key={id}>
         {user.usuario}-{user.robot}
        </span>
        ))}
      &mdash; PyRobots &mdash;
    </p>
  );
}

export default MainPage;
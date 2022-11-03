import React, { useEffect, useState } from 'react';
import { API_ENDPOINT_WINNER, BASE_URL } from './ApiTypes';
import './css/Winner.css';

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
      const response = await fetch(BASE_URL + API_ENDPOINT_WINNER + localStorage.getItem('id_lobby'), {
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
    <div className='winner-pyrobot'>
      <p id='winner'>
        Ganador
      {!isEmptyList && result.map((user, id) => (
        <span className='center' key={id}>
          {user.usuario}-{user.robot}
          </span>
          ))}
        &mdash; PyRobots &mdash;
      </p>
    </div>
  );
}

export default MainPage;
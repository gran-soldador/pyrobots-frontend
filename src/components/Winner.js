import React, { useEffect, useState } from 'react';
import { API_ENDPOINT_WINNER, BASE_URL } from './ApiTypes';
import './css/Winner.css';
import { Button } from 'react-bootstrap';


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

  return (
    <div className='winner-pyrobot'>
      <p id='winner'>
        Ganador
      {!isEmptyList && result.map((u, id) => (
        <span className='center' key={id}>
          {u.user}-{u.robot}
          </span>
          ))}
        &mdash; PyRobots &mdash;
        <br/>
        <br />
        <a href='/home'>
          <Button> Home </Button>
        </a>
      </p>
    </div>
  );
}

export default MainPage;
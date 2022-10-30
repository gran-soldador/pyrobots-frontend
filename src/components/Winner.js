import React, { useEffect, useState } from 'react';
import './css/Winner.css';

const MainPage = () => {
  //Estado de la lista
  const [isEmptyList, setIsEmptyList] = useState(false);
  //Datos de la partida
  const [result, setResult] = useState([]);

   //Actualizar lista
  useEffect(() => {
    const firstCall = setTimeout(handleGames, 0);
    return () => clearTimeout(firstCall);
  }, [])

  //Solicitar datos API
  async function handleGames() {
    try {
      const response = await fetch('https://63458450745bd0dbd36aae3e.mockapi.io/winner', {
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
    <p>
      Ganador
      {!isEmptyList && result.map((winner, id) => (
        <span className="center" key={id}>
          {winner.usuario}
        </span>
        ))}
      &mdash; PyRobots &mdash;
    </p>
  );
}

export default MainPage;
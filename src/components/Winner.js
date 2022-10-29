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

  function DisplayData() {
    return (
      <tbody>
      {!isEmptyList && result.map((winner, id) => (
          <tr key={ id }>
            <td> Jugador: { winner.usuario },&nbsp;</td> 
            <td> Robot: { winner.robot } </td>
          </tr>
        ))}
      </tbody>
    )
  }

  return (
    <div className='container-winner'>
      <div>
        <h1> Ganador: </h1>
      </div>
        <table className='table-winner'>
          { DisplayData() }
        </table>
    </div>
  );
}

export default MainPage;
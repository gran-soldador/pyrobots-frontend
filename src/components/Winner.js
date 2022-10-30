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

  // <div style="overflow:hidden; position:absolute; left:0; top:0; width:50px; height:25px;">
  //   <div>
  //     <h1> Ganador: </h1>
  //   </div>
  //     <table className='table-winner'>
  //       <tbody>
  //         {!isEmptyList && result.map((winner, id) => (
  //           <tr key={ id }>
  //           <td> Jugador: { winner.usuario },&nbsp;</td>
  //           <td> Robot: { winner.robot } </td>
  //          </tr>
  //         ))}
  //       </tbody>
  //     </table>
  // </div>
  // <>
  //   <div id="titles">
  //     <div id="titlecontent">
        
  //       <p className="center">Ganador<br /></p>
  //       {!isEmptyList && result.map((winner, id) => (
  //         <p className="center" key={id}>
  //           Jugador: {winner.usuario}, Robot: {winner.robot}
  //         </p>
  //       ))}
  //     </div>
  //   </div>
  // </>
  return (
    <p>
      Ganador
      {!isEmptyList && result.map((winner, id) => (
        <span className="center" key={id}>
          {winner.usuario},
          Robot: {winner.robot}
        </span>
        ))}
      &mdash; PyRobots &mdash;
    </p>
  );
}

export default MainPage;
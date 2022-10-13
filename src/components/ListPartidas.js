import React, { useEffect, useState } from 'react';
import Popup from 'reactjs-popup';
import 'bootstrap/dist/css/bootstrap.css';

const ListPartidas = () => {
  //Estado de la lista
  const [isEmptyList, setIsEmptyList] = useState(false);
  const [listGame, setListGame] = useState([]);

  //Datos de la partida
  const [partida_id, setId] = useState(-1);
  const [namepartida, setName] = useState('');
  const [status, setStatus] = useState('');
  const [numplayers, setCantJugadores] = useState(0);
  const [numgames, setCantJuegos] = useState(0);
  const [numrondas, setCantRondas] = useState(0);
  const [numcurrentplayers, setParticipantes] = useState(0);
  const [creador, setCreador] = useState('');
  const [password, setPassword] = useState(false);

  //Actualizar lista
  useEffect(() => {
    const firstCall = setTimeout(handleGames, 0);  
    return () => clearTimeout(firstCall);
  }, [])
  
  useEffect(() => {
    const autoRefresh = setInterval(handleGames, 10000);
    return () => clearInterval(autoRefresh);
  }, []);

  //Solicitar datos API
  async function handleGames() {
    try {
      const response = await fetch('https://63458450745bd0dbd36aae3e.mockapi.io/listar-partidas', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      if (response.status === 200) {
        setListGame(await response.json())
        setIsEmptyList(false)
      } else {
        setListGame([])
        setIsEmptyList(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //Enviar datos API
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('aaaaaaaaaaaaaaaa');
  }

  const settingid = (i) => {
    setName(listGame[i]['namepartida'])
    setId(listGame[i]['partida_id'])
    setStatus(listGame[i]['status'])
    setCantJugadores(listGame[i]['numplayers'])
    setCantJuegos(listGame[i]['numgames'])
    setCantRondas(listGame[i]['numrondas'])
    setParticipantes(listGame[i]['numcurrentplayers'])
    setCreador(listGame[i]['creador'])
    setPassword(listGame[i]['password'])
  }

  function DispleyListGames() {
    return (
      <div>
      <div className='partidas-header'>
        <h2 className='partida-title'> Lista de partidas</h2>
        <p className='-count'>Cantidad de partidas activas = {listGame.length}</p>
      </div>
      <table className='table table-sm' id='key-list' cellSpacing='0' cellPadding='0'>
        <thead className='table-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Status</th>
            <th scope='col'>Cantidad de jugadores</th>
            <th scope='col'>Cantidad de juegos</th>
            <th scope='col'>Cantidad de rondas</th>
            <th scope='col'>participantes</th>
            <th scope='col'>Creador</th>
            <th scope='col'>Contraseña</th>
          </tr>
        </thead>
      <tbody className='partidas-list'>
        {listGame.map((partida, i) => (
          <Popup trigger= {
            <tr key={partida.id} className="Rows-List">
              <td onClick={() => { settingid(i) }}>{partida.partida_id} </td>
              <td onClick={() => { settingid(i) }}>{partida.namepartida} </td>
              <td onClick={() => { settingid(i) }}>{partida.status} </td>
              <td onClick={() => { settingid(i) }}>{partida.numplayers} </td>
              <td onClick={() => { settingid(i) }}>{partida.numgames} </td>
              <td onClick={() => { settingid(i) }}>{partida.numrondas} </td>
              <td onClick={() => { settingid(i) }}>{partida.numcurrentplayers}/4 </td>
              <td onClick={() => { settingid(i) }}>{partida.creador} </td>
              {
                (!partida.password) ? <td onClick={() => {settingid(i)}}>Desbloqueada</td>
                : <td onClick={() => {settingid(i)}} >Ingrese Contraseña</td>
              }
            </tr>
            }>
          </Popup>
          ))}
      </tbody>
      </table>
    </div>
    )
  }

   return (
    <div className="Background-List">
      <div>
        <h1>Seleccionar partida</h1>
        {(isEmptyList) ? <div>No hay partidas disponibles</div> : <p/>}
        {DispleyListGames()}
      </div>
    </div>
 );
}

export default ListPartidas;

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/ListPartidas.css';

const ListPartidas = () => {
  //Estado de la lista
  const [isEmptyList, setIsEmptyList] = useState(false);
  //Datos de la partida
  const [listGame, setListGame] = useState([]);
  //estados para buscar
  const [search, setSearch] = useState("")

  //buscar en table
  const results = (!search && !isEmptyList)? listGame : listGame.filter((dato) =>
  dato.namepartida.toLowerCase().includes(search.toLocaleLowerCase()))

  const searcher = (e) => {
    setSearch(e.target.value)
  }

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
      const response = await fetch('http://127.0.0.1:8000/lista-partidas', {
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

  function DisplayData() {
    return (
      <tbody className='partidas-list'>
        {results.map((partida, id) => (
            <tr key={ partida.id } className="Rows-List">
              <td key={1}> { partida.partida_id } </td>
              <td key={2}> { partida.namepartida } </td>
              <td key={3}> { partida.status } </td>
              <td key={4}> { partida.minplayers} a { partida.maxplayers } </td>
              <td key={5}> { partida.numgames } </td>
              <td key={6}> { partida.numrondas } </td>
              <td key={7}> { partida.numcurrentplayers } </td>
              <td key={8}> { partida.creador } </td>
              {
                (!partida.password) ? <td>Desbloqueada</td>
                : <td>Bloqueada</td>
              }
            </tr>
          ))}
      </tbody>
    )
  }

  return (
    <div>
      <div className='partidas-header'>
        <h1 className='partida-title'> Lista de partidas</h1>
        <p className='-count'>
           # Partidas = {listGame.length}
        </p>
      </div>
      <input
        value={search}
        onChange={searcher}
        type='text'
        placeholder='Buscar una partida'
        className='input-table'
      />
      <table className='table table-striped table-hover mt-5 shadow-lg'
        id='key-list'
        cellSpacing='0'
        cellPadding='0'>
        <thead className='table-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Status</th>
            <th scope='col'>Cantidad de jugadores</th>
            <th scope='col'>Cantidad de juegos</th>
            <th scope='col'>Cantidad de rondas</th>
            <th scope='col'>Participantes</th>
            <th scope='col'>Creador</th>
            <th scope='col'>Contraseña</th>
          </tr>
        </thead>
        {
          DisplayData()
        }
      </table>
      {
        (isEmptyList || (!listGame || listGame.length === 0)) ?
          <div className='emptylist'> No hay partidas disponibles </div> : <p/>
      }
    </div>
 );
}

export default ListPartidas;

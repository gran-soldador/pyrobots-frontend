import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const ListPartidas = () => {
  //Estado de la lista
  const [isEmptyList, setIsEmptyList] = useState(false);
  //Datos de la partida
  const [listGame, setListGame] = useState([]);
  //estados para buscar
  const [search, setSearch] = useState("")

  const searcher = (e) => {
    setSearch(e.target.value)   
  }

  const results = !search ? listGame : listGame.filter((dato) =>
    dato.namepartida.toLowerCase().includes(search.toLocaleLowerCase()))
  
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

  function DispleyListGames() {
    return (
      <div>
      <div className='partidas-header'>
        <h1 className='partida-title'> Lista de partidas</h1>
        <p className='-count'>Cantidad de partidas activas = {listGame.length}</p>
      </div>
      <input
        value={search}
        onChange={searcher}
        type='text'
        placeholder='Buscar una partida'
        className='form-control'
      />
      <table className='table table-striped table-hover mt-5 shadow-lg' id='key-list' cellSpacing='0' cellPadding='0'>
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
        {results.map((partida, i) => (
            <tr key={partida.id} className="Rows-List">
              <td >{partida.partida_id} </td>
              <td >{partida.namepartida} </td>
              <td >{partida.status} </td>
              <td >{partida.numplayers} </td>
              <td >{partida.numgames} </td>
              <td >{partida.numrondas} </td>
              <td >{partida.numcurrentplayers}/4 </td>
              <td >{partida.creador} </td>
              {
                (!partida.password) ? <td>Desbloqueada</td>
                : <td>Bloqueada</td>
              }
            </tr>
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

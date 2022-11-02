import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/ListPartidas.css';
import NavBar from './NavBar_2';
import { Button } from 'react-bootstrap';


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

  //Primera solicitud de datos
  useEffect(() => {
    localStorage.setItem('id_lobby', -1);
    const firstCall = setTimeout(handleGames, 0);
    return () => clearTimeout(firstCall);
  }, [])

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
        console.log('estoy solicitando datos')
      } else {
        setListGame([])
        setIsEmptyList(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // const [id, setId] = useState(0);

  function handleSubmit(partida) {
    localStorage.setItem("id_lobby", partida.partida_id);
    localStorage.setItem('mix_players', partida.minplayers);
    localStorage.setItem('max_players', partida.maxplayers); 
  }
  
  function DisplayData() {
    return (
      <tbody className='partidas-list'>
        {results.reverse().map((partida, id) => (
            <tr key={ id } className="Rows-List">
              <td> { partida.partida_id } </td>
              <td> { partida.namepartida } </td>
              <td> { partida.status } </td>
              <td> { partida.minplayers} a { partida.maxplayers } </td>
              <td> { partida.numgames } </td>
              <td> { partida.numrondas } </td>
              <td> { partida.numcurrentplayers } </td>
              <td> { partida.creador } </td>
              {
                (!partida.password) ?
                  <td>
                      <Button className="btn btn-success"
                        data-testid="unirse-unirse" 
                        onClick={() => {handleSubmit(partida)}} disabled={partida.status === 'finalizada'}> 
                          <a href='/lobby'>
                            Unirse 🔓
                          </a>
                      </Button>
                  </td>
                :
                <td>
                    <Button onClick={() => { handleSubmit(partida) }} className="btn btn-danger" disabled={partida.status === 'finalizada'}> 
                          <a href='/lobby'>
                          Unirse 🔒
                        </a>
                    </Button>
                </td>
              }
            <td>
                <Button
                  className="btn btn-primary"
                  disabled={partida.status !== 'finalizada'}
                  onClick={() => { handleSubmit(partida) }}>
                  <a href='/ganador'>
                    Ver
                  </a>
                </Button>
            </td>
            </tr>
          ))}
      </tbody>
    )
  }

  return (
    <div>
      <NavBar />
      <div className='partidas-header'>
        <h1 className='partida-title'> Lista de partidas</h1>
        <p className='-count'>
          <Button onClick={handleGames}>Actualizar</Button>
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
            <th scope='col'>Unirse </th>
            <th scope='col'>Resultado</th>
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

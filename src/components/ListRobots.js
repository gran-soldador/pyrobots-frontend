import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/ListPartidas.css';
import NavBar from './NavBar_2';
import { Avatar } from '@material-ui/core';


const ListRobots = () => {
  //Estado de la lista
  const [isEmptyList, setIsEmptyList] = useState(false);
  //Datos de la partida
  const [listRobots, setlistRobots] = useState([]);
  //estados para buscar
  const [search, setSearch] = useState("")

  //buscar en table
  const results = (!search && !isEmptyList)? listRobots : listRobots.filter((dato) =>
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
      const response = await fetch('https://63458450745bd0dbd36aae3e.mockapi.io/list-robots', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      if (response.status === 200) {
        setlistRobots(await response.json())
        setIsEmptyList(false)
      } else {
        setlistRobots([])
        setIsEmptyList(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function DisplayData() {
    return (
      <>
      <tbody className='partidas-list'>
        {results.map((robots, id) => (
            <tr key={ id } className="Rows-List">
              <td> { robots.robot_id } </td>
              <td> { robots.name } </td>
              <td> <Avatar src = {robots.avatar }/> </td>  
            </tr>
          ))}
      </tbody>
    </>
    )
  }

  return (
    <div>
      <NavBar />
      <div className='partidas-header'>
        <h1 className='partida-title'> Lista de Robots</h1>
        <p className='-count'>
           # Robots = {listRobots.length}
        </p>
      </div>
      <input
        value={search}
        onChange={searcher}
        type='text'
        placeholder='Buscar un Robot'
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
            <th scope='col'>Avatar</th>
          </tr>
        </thead>
        {
          DisplayData()
        }
      </table>
    </div>
 );
}

export default ListRobots;

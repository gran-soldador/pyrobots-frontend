import React, { useEffect, useState } from 'react';
import Card from './Card';
import NavBar from './NavBar_2';

const Cards = () => {
  //Datos de la partida
  const [listRobots, setlistRobots] = useState([]);

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
      } else {
        setlistRobots([])
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    <NavBar />
    <br />
    <div className='partidas-header'>
      <h1 className='partida-title'> Lista de robots</h1>
      <p className='-count'>
        # Robots = {listRobots.length}
      </p>
    </div>
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        {
          listRobots.map(({ name, avatar, id }) => (
            <div className="col-md-4" key={id}>
              <Card imageSource={avatar} title={name} /> &nbsp;
            </div>
            )
          )
        }
      </div>
    </div>
    </>
  );
}

export default Cards;
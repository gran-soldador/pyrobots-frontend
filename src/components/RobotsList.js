import React, { useEffect, useState } from 'react';
import Card from './Card';
import NavBar from './NavBar_2';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { API_ENDPOINT_LIST_ROBOTS, BASE_URL } from './ApiTypes';


const Cards = () => {
  //Datos de la partida
  const [listRobots, setlistRobots] = useState([]);

  //Actualizar lista
  useEffect(() => {
    const firstCall = setTimeout(handleGames, 0);
    return () => clearTimeout(firstCall);
  }, [])

  //Leer datos de robots
  const handleGames = () => {
    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      axios.get(BASE_URL + API_ENDPOINT_LIST_ROBOTS, {
        headers: { 'Authorization': `Bearer ${tokenValue}` }
      })
      .then((res) => {
        console.log(res)
        // setlistRobots(sort_lists('nombre', res.data))
        setlistRobots(res.data.sort((a, b) => (a.name > b.name ? 1 : -1 )))
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }

  return (
    <>
    <NavBar />
    <br />
    <div className='partidas-header'>
      <h1 className='partida-title'> Lista de robots</h1>
      <p className='-count'>
       <Button onClick={handleGames}>Actualizar Lista</Button>
      </p>
    </div>
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        {listRobots.map(({ name, avatar, id }) => (
            <div className="col-md-4" key={id}>
              <Card imageSource={avatar} title={name} /> &nbsp;
            </div>
          )
        )}
      </div>
    </div>
    </>
  );
}

export default Cards;
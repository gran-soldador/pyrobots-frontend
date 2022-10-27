import React, { useEffect, useState } from 'react';
import Card from './Card';
import NavBar from './NavBar_2';
import axios from 'axios';
import { Button } from 'react-bootstrap';


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
      axios.get('http://127.0.0.1:8000/lista-robots', {
        headers: { 'Authorization': `Bearer ${tokenValue}` }
      })
      .then((res) => {
        console.log(res)
        setlistRobots(res.data)
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
        {listRobots.map(({ nombre, avatar, id }) => (
            <div className="col-md-4" key={id}>
              <Card imageSource={avatar} title={nombre} /> &nbsp;
            </div>
          )
        )}
      </div>
    </div>
    </>
  );
}

export default Cards;
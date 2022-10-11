import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const partida = [
  {
  id: 1,
  name: 'hola',
  status: 'llena',
  cant_jugadores: 3,
  participantes: 2,
  cant_juegos: 22,
  cant_rondas: 999,
  creador: 'juancarlos',
  },
  {
  id: 3,
  name: 'chau',
  status: 'disponible',
  cant_jugadores: 4,
  cant_juegos: 25,
  cant_rondas: 99,
  participantes: 3,
  creador: 'pedro',
  },
   {
  id: 5,
  name: 'hasdasdola',
  status: 'disponible',
  cant_jugadores: 2,
  cant_juegos: 21,
  cant_rondas: 96,
  participantes: 1,
  creador: 'juan',
  },
];

const ListPartidas = () => {
  const [datos, setDatos] = useState({
    id: '',
    name: '',
    status: '',
    cant_jugadores: '',
    cant_juegos: '',
    cant_rondas: '',
    participantes: '',
    creador: '',
  });
  
  const handleChange = () => {
    console.log('change')
  }
  return (
    <div className='partidas'>
      <div className="partidas-header">
        <h2 className="partida-title"> Lista de partidas</h2>
        <p className="-count">Cantidad de partidas activas = {partida.length}</p>
      </div>
        
      <div className='partidas-list'>
        <ul>
          {partida.map((partida) => (
            <li key={partida.id}>
              <p>{partida.id}</p>
              <p>{partida.name}</p>
              <p>{partida.status}</p>
              <p>{partida.cant_jugadores}</p>
              <p>{partida.cant_juegos}</p>
              <p>{partida.cant_rondas}</p>
              <p>{partida.participantes}</p>
              <p>{partida.creador}</p>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <button onClick={handleChange} > Crear </button>
      </div>
    </div>  
  )
}

export default ListPartidas;

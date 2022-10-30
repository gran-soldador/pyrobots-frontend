import React, { useEffect, useState } from 'react';
import './css/Winner.css';
import axios from 'axios';
import { Button } from 'bootstrap';


const MainPage = () => {
  const [result, setResult] = useState([]);
  const [isEmptyList, setIsEmptyList] = useState(false);

  //conección con api
  useEffect(function () {
    console.log("lee datos winner");
    axios.get('http://localhost:8000/match-result/' + localStorage.getItem('id_lobby'))
    .then((res) => {
      setResult(res.data)
      setIsEmptyList(false)
    })
    .catch((err) => {
      setResult([])
      setIsEmptyList(true)
      console.log(err)
      console.log(err.response.data)
    });
  }, []);

  console.log('estoydandolosdatos', result);

  return (
    <p>
      Ganador
     {!isEmptyList && result.map((user, id) => (
        <span className='center' key={id}>
         {user.usuario}-{user.robot}
        </span>
        ))}
      &mdash; PyRobots &mdash;
    </p>
  );
}

export default MainPage;
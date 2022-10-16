import ListPartidas from './components/ListPartidas';
import RegisterForm from './components/Register';
import CreatePartida from './components/CreatePartida';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import React, { useEffect, useState } from 'react';
import axios from "axios";

function App() {
  const [result, setResult] = useState(null);

  const message = async () => {
    try {
      let res = await axios.get('http://127.0.0.1:8000/');
      let result = res.data;
      setResult(result);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    message();
  }, [])

  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<MainPage/>} />
          <Route exact path='/register' element={<RegisterForm/>}></Route>
          <Route exact path='/listar-partidas' element={<ListPartidas/>}></Route>
          <Route exact path='/crear-partida' element={<CreatePartida/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
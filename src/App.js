import ListPartidas from './components/ListPartidas';
import RegisterForm from './components/Register';
import CreatePartida from './components/CreatePartida';
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
      <div className="App">
        <ul className="App-header">
          <li>
            <Link to="/register">Registrar</Link>
          </li>
          <li>
            <Link to="/listPartidas">Listar Partidas</Link>
          </li>
          <li>
            <Link to="/createPartida">Crear Partida</Link>
          </li>
        </ul>
        <Routes>
          <Route exact path='/register' element={<RegisterForm />}></Route>
          <Route exact path='/listPartidas' element={<ListPartidas />}></Route>
          <Route exact path='//createPartida' element={<CreatePartida />}></Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
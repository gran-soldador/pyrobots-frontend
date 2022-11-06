import React from 'react'

import ListPartidas from './components/ListPartidas';
import RegisterForm from './components/Register';
import CreatePartida from './components/CreatePartida';
import FormLogin from './components/FormLogin';
import MainPage from './components/MainPage';
import UploadBotForm from './components/UploadBotForm'
import GameBoard  from "./components/GameBoard"
import Home from './components/Home';
import CreateSim from './components/SimulationForm';
import Lobby from './components/Lobby';
import ListRobots from './components/Cards';
import NotFound from './components/NotFound';
import Winner from './components/Winner';
import Verify from './components/Verify'
import ProtectedRoutes from './components/router/ProtectedRoutes';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route exact path='/login' element={<FormLogin/>}></Route>
          <Route exact path='/registrarse' element={<RegisterForm />}></Route>
          <Route element={<ProtectedRoutes />}>
            <Route path='/home' element={<Home/>} />
            <Route path='/listar-partidas' element={<ListPartidas/>}></Route>
            <Route path='/crear-partida' element={<CreatePartida/>}></Route>
            <Route path='/subir-bot' element={<UploadBotForm/>}></Route>
            <Route path='/ver-tablero' element={<GameBoard />}></Route>
            <Route path='/crear-sim' element={<CreateSim />}></Route>
            <Route path='/lobby' element={<Lobby />}></Route>
            <Route path='/list-robots' element={<ListRobots />}></Route>
            <Route path='/ganador' element={<Winner />}></Route>
            <Route path='/verify/:token' element={<Verify />}></Route>
          </Route>
          <Route path='*' element={<NotFound />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
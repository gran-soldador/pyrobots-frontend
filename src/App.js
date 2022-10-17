import ListPartidas from './components/ListPartidas';
import RegisterForm from './components/Register';
import CreatePartida from './components/CreatePartida';
import FormLogin from './components/FormLogin';
import MainPage from './components/MainPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <div className='App'>
        <Routes>
          <Route path='/' element={<MainPage />} />
          <Route exact path='/login' element={<FormLogin/>}></Route>
          <Route exact path='/registrarse' element={<RegisterForm/>}></Route>
          <Route exact path='/listar-partidas' element={<ListPartidas/>}></Route>
          <Route exact path='/crear-partida' element={<CreatePartida/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}
export default App;
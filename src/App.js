import ListPartidas from './components/ListPartidas';
import RegisterForm from './components/Register';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';

function App() {
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
            </ul>
           <Routes>
                 <Route exact path='/register' element={<RegisterForm />}></Route>
                 <Route exact path='/listPartidas' element={<ListPartidas />}></Route>
          </Routes>
          </div>
       </Router>
   );
}

export default App;
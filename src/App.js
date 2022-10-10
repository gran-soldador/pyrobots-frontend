import FormLogin from './components/FormLogin';
import logo2 from './components/logo2.svg'
import './App.css';

function App() {
  return (
    <div className="App">
      <img src={logo2} className="App-logo" alt="logo" />
      <FormLogin></FormLogin>
    </div>
  );
}

export default App;

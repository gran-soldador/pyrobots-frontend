import FormLogin from './components/FormLogin';
import logo2 from './components/logo2.svg'
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
    <div className="App">
      <img src={logo2} className="App-logo" alt="logo" />
      <FormLogin></FormLogin>
    </div>
  );
}
export default App;
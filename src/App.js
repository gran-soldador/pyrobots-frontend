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
    <div>
      <h1>
        {result}
      </h1>
    </div>
  );
}

export default App;

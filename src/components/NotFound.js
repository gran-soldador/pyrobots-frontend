import React from "react";
import './css/NotFound.css';


const notfound = () => {
  return (
    <div className='centered'>
      <div>
        <h2>Oops!..</h2>
        <h3>Página no encontrada</h3>
      </div>
      <img style={{ height:350 }} alt='notfount' src='https://i.imgur.com/QIxIKBH.png' />
    </div >
  );
}

export default notfound;

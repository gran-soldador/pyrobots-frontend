import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';

const CreatePartida = () => {
  const [namepartida, setNamepartida] = useState("");
  const [password, setPassword] = useState(undefined);
  const [numgames, setNumgames] = useState(1);
  const [numrondas, setNumrondas] = useState(1);
  const [numplayers, setNumplayers] = useState(2);
  //const [isError, setIsError] = useState(null);

  const list = [
    {
      Title: "Robot1",
      Id: "1" },
    {
      Title: "Robot2",
      Id: "2"
    },
    {
      Title: "Robot3",
      Id: "3"
    }
  ];

  // const submitCreatePartida = async () => { };

  // const handleInputChange = (event) => {
  //   //console.log(event.target.value)
  //   setDatos({
  //     ...datos, //hace una copia
  //     [event.target.name] : event.target.value
  //   })
  // }

  const handleSubmit = (event) => {
    event.preventDefault();
    //submitCreatePartida();
    console.log(namepartida + ' ' + password + ' ' + numgames + ' ' + numrondas
      + ' ' + numplayers);
  }

  return (
    <div >
      <h2> Crear Partida </h2>
        <form class='form' className='box' method='post' onSubmit={handleSubmit}> 

          <div>
            <label class='form-element'>Nombre de la Partida</label>
            <div>
              <input type='name'
              placeholder='Nombre de partida'
              class='form-element'
              required
            />
            </div>
          </div>
          
          <div>
            <label class='form-element'>Cantidad de Jugadores</label>
            <div>
              <input type='number'
              placeholder='Cantidad de Jugadores'
              className='input'
              class='form-element'
              required
            />
            </div>
          </div>

          <div>
            <label class='form-element'>Cantidad de Juegos</label>
            <div>
              <input type='number'
              placeholder='Cantidad de Juegos'
              className='input'
              class='form-element'
              required
            />
            </div>
          </div>

          <div>
            <label class='form-element'>Cantidad de Rondas</label>
            <div>
            <input type='number'
              placeholder='Número de Rondas'
              className='input'
              class='form-element'
              required
            />
            </div>
          </div>

          <div>
            <label class='form-element'>Contraseña</label>
            <div>
              <input type='password'
              placeholder='Contraseña (opcional)'
              className='input'
              class='form-element'
              optional
            />
            </div>
          </div>
        
          <div>
            <label class='form-element'>Seleccionar Robot</label>
            <div className='form-element'>
              <select name='list' className='foorm-control'>
                {list.map(item => {return (
                  <option value={item.Id}>{item.Title}</option>
                )})}
              </select>
            </div>
          </div>
        <br/>
          <button class='form-element' type='submit'> Crear </button>
          <button class='form-element' type='submit'> Cancelar </button>
        </form> 
    </div>
  )
}

export default CreatePartida;
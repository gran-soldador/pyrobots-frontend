import React, { useState } from 'react';
import logo from './logo.png'
import 'bootstrap/dist/css/bootstrap.css';

const list = [
  {
    Title: "Robot1",
    Id: "1"
  },
  {
    Title: "Robot2",
    Id: "2"
  },
  {
    Title: "Robot3",
    Id: "3"
  }
]

const CreatePartida = () => {
  const [datos, setDatos] = useState({
    namepartida: '',
    password: '',
    numgames: '',
    numrondas: '',
    numplayers: '',
  });

  const [idlist, setIdList] = useState(-1);

  const handleSelectChange = (e) => {
    const opcion = e.target.value;
    console.log(opcion);
    setIdList(opcion);
  }
  

  const handleChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value
    })
  }

  const handleSubmit = (event) => {
    //Send State
    event.preventDefault();
    console.log(datos.namepartida + ' ' + datos.password + ' ' +
      datos.numplayers + ' ' + datos.numrondas + ' ' + datos.numgames
      + ' ' + idlist);
  }
  //const submitCreatePartida = async () => { };

  return (
    <form className='form_create_pardida' onSubmit={handleSubmit}> 
      <img src={logo} className="" alt="logo" />
      <h1>Pyrobots</h1>
      <h2>Crear Partida</h2>
      <hr></hr>
      <div className="form-input">
        <label> Nombre de la Partida</label>
        <input
          placeholder='Ingrese el Nombre de partida'
          className="form-control"
          type='text'
          minLength={4}
          maxLength={10}
          name='namepartida'
          value={datos.namepartida}
          onChange={handleChange}
          required
        />
      </div>
      <br/>
      <div className="form-input">
        <label>Cantidad de Jugadores</label>
        <input
          placeholder='Ingrese la Cantidad de Jugadores'
          type='number'
          name='numplayers'
          min='2'
          max='4'
          value={datos.numplayers}
          onChange={handleChange}
          id='validationJugadores'
          className="form-control"
          required
        />
      </div>
      <br/>
      <div className='form-input'>
        <label>Cantidad de Juegos</label>
        <input
          type='number'
          placeholder='Ingrese la Cantidad de Juegos'
          min='1'
          max='200'
          name={'numgames'}
          value={datos.numgames}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <br/>
      <div className='form-input'>
        <label>Cantidad de Rondas</label>
        <input
          type='number'
          placeholder='Ingrese el Número de Rondas'
          min='1'
          max='10000'
          name={'numrondas'}
          value={datos.numrondas}
          onChange={handleChange}
          className="form-control"
          required
        />
      </div>
      <br/>
      <div>
        <label className='form-input' htmlFor="inputPassword5">Contraseña</label>
        <input
          type='password'
          id="inputPassword5" 
          placeholder='Ingrese contraseña (opcional)'
          aria-describedby="passwordHelpBlock"
          name={'password'}
          value={datos.password}
          onChange={handleChange}
          className="form-control"
          maxLength='10'
        />
        <small id="passwordHelpBlock" className="form-text text-muted">
          Tu contraseña puede tener como máximo 10 caracteres.
        </small>
      </div>
      <br />
      <div>
        <label>Seleccionar Robot</label>
      <div>
        <select className="custom-select" name='list' required onClick={handleSelectChange}>
          <option className="form-control" disabled value={-1}> --Seleccione un robot--</option>
            {
              list.map((item, i) => {
                return (
                  <option key={'list' + i} value={i}>{item.Title}</option>
                  )
                }
              )
            }
          </select>
        </div>
      </div>
      <br />
      <button
        className="btn btn-block mb-4 btn-success"
        name='Crear'
        type='submit'> Crear </button> &nbsp;
      <button
        className="btn btn-block mb-4 btn-dark"
        type='reset'> Cancelar </button>
      </form>
  )
}

export default CreatePartida;
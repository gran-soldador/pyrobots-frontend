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

  //const submitCreatePartida = async () => { };

  const handleOptionChange = (e) => {
      const {Title, id } = e.target;
      this.setState({[Title] : id});
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    //submitCreatePartida();
    console.log(namepartida + ' ' + password + ' ' + numgames + ' ' + numrondas
      + ' ' + numplayers);
  }

  return (
    <div className='form'>
      <form onSubmit={handleSubmit}> 
        <h1>Crear Partida</h1>
          <div className="form-group">
            <label>Nombre de la Partida</label>
            <div>
            <input type='name'
              className="form-control"
              placeholder='Ingrese el Nombre de partida'
              required
            />
            </div>
          </div>
          <br/>
          <div className="form-group">
            <label>Cantidad de Jugadores</label>
            <div>
              <input type='number'
              placeholder='Ingrese la Cantidad de Jugadores'
              min='2'
              max='4'
              className="form-control"
              required
            />
            </div>
          </div>
          <br/>
          <div>
            <label>Cantidad de Juegos</label>
            <div>
              <input type='number'
              placeholder='Ingrese la Cantidad de Juegos'
              min='1'
              max='200'
              className="form-control"
              required
            />
            </div>
          </div>
          <br/>
          <div>
            <label>Cantidad de Rondas</label>
            <div>
            <input type='number'
              placeholder='Ingrese el Número de Rondas'
              min='1'
              max='10000'
              className="form-control"
              required
            />
            </div>
          </div>
          <br/>
          <div>
            <label>Contraseña</label>
            <div>
              <input type='password'
              placeholder='Máximo 10 caracteres (opcional)'
              className="form-control"
              maxlength='10' 
              optional
            />
            </div>
          </div>
          <br/>
          <div>
            <label className='my-1 mr-2'>Seleccionar Robot</label>
              <div>
              <select className="custom-select my-1 mr-sm-2" required onChange={handleOptionChange}>
                <option disabled value=''> --Seleccione un robot--</option>
                {list.map(item => {
                return (
                  <option key={item.Id} value={item.Id}>{item.Title}</option>
                )})}
              </select>
          </div>
          </div>
        <br/>
        <button className="btn btn-block mb-4 btn-success" name='Crear' type='submit'> Crear </button>
        <button className="btn btn-block mb-4 btn-dark" type='reset'> Cancelar </button>
        </form> 
    </div>
  )
}

export default CreatePartida;
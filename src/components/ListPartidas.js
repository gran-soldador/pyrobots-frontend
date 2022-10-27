import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './css/ListPartidas.css';
import NavBar from './NavBar_2';
import { Button, Modal, Form } from 'react-bootstrap';


const ListPartidas = () => {
  //Estado de la lista
  const [isEmptyList, setIsEmptyList] = useState(false);
  //Datos de la partida
  const [listGame, setListGame] = useState([]);
  //estados para buscar
  const [search, setSearch] = useState("")

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [password, setPassword] = useState('');

  //buscar en table
  const results = (!search && !isEmptyList)? listGame : listGame.filter((dato) =>
  dato.namepartida.toLowerCase().includes(search.toLocaleLowerCase()))

  const searcher = (e) => {
    setSearch(e.target.value)
  }

  //Primera solicitud de datos
  useEffect(() => {
    const firstCall = setTimeout(handleGames, 0);
    return () => clearTimeout(firstCall);
  }, [])

  //Solicitar datos API
  async function handleGames() {
    try {
      const response = await fetch('http://127.0.0.1:8000/lista-partidas', {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
      if (response.status === 200) {
        setListGame(await response.json())
        setIsEmptyList(false)
        console.log('estoy solicitando datos')
      } else {
        setListGame([])
        setIsEmptyList(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function DisplayData() {
    return (
      <tbody className='partidas-list'>
        {results.map((partida, id) => (
            <tr key={ id } className="Rows-List">
              <td> { partida.partida_id } </td>
              <td> { partida.namepartida } </td>
              <td> { partida.status } </td>
              <td> { partida.minplayers} a { partida.maxplayers } </td>
              <td> { partida.numgames } </td>
              <td> { partida.numrondas } </td>
              <td> { partida.numcurrentplayers } </td>
              <td> { partida.creador } </td>
              {
                (!partida.password) ?
                  <td>
                    <a href='lobby'>
                      <Button variant='outline-success'> Desbloqueada </Button>
                    </a>
                  </td>
                :
                <td>
                  <Button onClick={handleShow} variant='outline-danger'> Bloqueada </Button>
                  <Modal className='modal-upload'show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>Ingresar al Lobby</Modal.Title>
                    </Modal.Header>
                    <Form>
                      <Form.Group>
                        <Form.Label>
                          Contraseña
                        </Form.Label>
                        <Form.Control
                          type='password'
                          placeholder='Ingrese contraseña'
                          minLength={1}
                          maxLength={10}
                          onChange={event => setPassword(event.target.value)} />
                    </Form.Group>
                    <Modal.Footer>
                      <a href='/lobby'>
                        <Button variant='primary' onClick={handleClose}>
                          Aceptar
                          </Button>
                      </a>
                      <Button variant='secondary' onClick={handleClose}>
                        Cancelar
                      </Button>
                    </Modal.Footer>
                    </Form>
                  </Modal>
                </td>
              }
            </tr>
          ))}
      </tbody>
    )
  }

  return (
    <div>
      <NavBar />
      <div className='partidas-header'>
        <h1 className='partida-title'> Lista de partidas</h1>
        <p className='-count'>
          <Button onClick={handleGames}>Actualizar</Button>
        </p>
      </div>
      <input
        value={search}
        onChange={searcher}
        type='text'
        placeholder='Buscar una partida'
        className='input-table'
      />
      <table className='table table-striped table-hover mt-5 shadow-lg'
        id='key-list'
        cellSpacing='0'
        cellPadding='0'>
        <thead className='table-dark'>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>Nombre</th>
            <th scope='col'>Status</th>
            <th scope='col'>Cantidad de jugadores</th>
            <th scope='col'>Cantidad de juegos</th>
            <th scope='col'>Cantidad de rondas</th>
            <th scope='col'>Participantes</th>
            <th scope='col'>Creador</th>
            <th scope='col'>Contraseña</th>
          </tr>
        </thead>
        {
          DisplayData()
        }
      </table>
      {
        (isEmptyList || (!listGame || listGame.length === 0)) ?
          <div className='emptylist'> No hay partidas disponibles </div> : <p/>
      }
    </div>
 );
}

export default ListPartidas;

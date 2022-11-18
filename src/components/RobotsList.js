import React, { useEffect, useState } from 'react';
import NavBar from './NavBar_2';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import {
  API_ENDPOINT_DOWNLOAD_ROBOT_CODE,
  API_ENDPOINT_EDIT_ROBOT,
  API_ENDPOINT_LIST_ROBOTS,
  BASE_URL
} from './ApiTypes';
import { GoCloudDownload, GoCloudUpload } from 'react-icons/go';
import './css/Card.css';


const Cards = () => {
  //game data
  const [listRobots, setlistRobots] = useState([]);
  const [codeRobot, setCodeRobot] = useState(null);

  //modal
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErrorShow(false);
  }

  //error handling
  const [errorShow, setErrorShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [message, setMessage] = useState(false);

  //update robots list
  useEffect(() => {
    const firstCall = setTimeout(handleGames, 0);
    return () => clearTimeout(firstCall);
  }, [])

  //enpoint robot data
  const handleGames = () => {
    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      axios.get(BASE_URL + API_ENDPOINT_LIST_ROBOTS, {
        headers: { 'Authorization': `Bearer ${tokenValue}` }
      })
      .then((res) => {
        console.log(res)
        setlistRobots(res.data.sort((a, b) => (a.name > b.name ? 1 : -1 )))
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }
  
  //download robot code
  const handleSubmitDownload = () => {
    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      axios.get(BASE_URL + API_ENDPOINT_DOWNLOAD_ROBOT_CODE + localStorage.getItem('id_robot'), {
        headers: { 'Authorization': `Bearer ${tokenValue}` }
      })
      .then((res) => {
        console.log(res.data)
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `${localStorage.getItem('name_robot')}` + '.py');
        document.body.appendChild(link);
        link.click();
        if (res.data.detail === 'El robot no existe') {
         setErrorShow(true);
          setMessage(true);
          setErrorMsg('El robot no existe');
        }
        if (res.data.detail === 'El robot no pertenece al usuario') {
          setErrorShow(true);
          setMessage(true);
          setErrorMsg('El robot no pertenece al usuario');
        }
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }

  //post to edit implementation
  async function handleSubmitEdit(event) {
    event.preventDefault()
    let formData = new FormData();
    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      formData.append('robot_id', localStorage.getItem('id_robot'));
      formData.append('new_code', codeRobot);
      try {
        const response = await axios.post(BASE_URL + API_ENDPOINT_EDIT_ROBOT, formData, {
          headers: { 'Authorization': `Bearer ${tokenValue}` }
        });
        console.log(response)
        if (response.data.detail === 'Robot code succesfully changed.') {
          setErrorShow(true);
          setMessage(true);
          setErrorMsg('El código del robot se ha cambiado correctamente.');
        }
      } catch (e) {
        console.log(e)
        setErrorMsg('');
        if (e.response.data.detail === 'File must be a .py') {
          setErrorShow(true);
          setMessage(false);
          setErrorMsg('Solo se permiten archivos con extensión .py');
        }
      }
    }
  }

  //data I store in localstorage
  function handleSubmitIdRobot(robot) {
    localStorage.setItem('id_robot', robot.id);
    localStorage.setItem('name_robot', robot.name);
  }

  return (
    <>
    <NavBar />
    <br />
    <div className='partidas-header'>
      <h1 className='partida-title'> Lista de robots</h1>
      <p className='-count'>
        <Button onClick={handleGames}>Actualizar Lista</Button>
      </p>
    </div>
    {/* cartas   */}
    <div className='container d-flex justify-content-center align-items-center h-100'>
      <div className='row'>
        {listRobots.map(( robot, id ) => (
          <div className='col-md-6' key={id}>
            <div className='card text-center bg-dark animate__animated animate__fadeInUp'>
              <div className='overflow'>
                <img src={robot.avatar} alt='a wallpaper' className='card-img-top'/>
              </div>
              <div className='card-body text-light'>
                <h3 className='card-title'>{robot.name}</h3>
              </div>
              <div className="col-sm-12 col-xs-12">
                <Button
                  variant='primary mr-1'
                  onClick={() => { setShow(true); handleSubmitIdRobot(robot) }}>
                    <GoCloudUpload />
                </Button> &nbsp;
                <Button
                  variant='primary mr-1'
                  onClick={() => { handleSubmitIdRobot(robot); handleSubmitDownload() }}>
                  <GoCloudDownload />
                </Button>
              </div>
                <Modal
                  className='modal-joinGame'
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}>
                    <Modal.Header closeButton>
                      <Form.Text>
                        <h1>Subir Nuevo Código</h1>
                      </Form.Text>
                    </Modal.Header>
                    <Modal.Body>
                    {/* Form modal */}
                    <Form onSubmit={handleSubmitEdit}>
                      <Form.Group className='mb-3'>
                        <Form.Label> Subir nuevo código del Robot: </Form.Label>
                        <Form.Control
                            type='file'
                            className='form-control'
                            required
                            onChange={ (e) => {setCodeRobot(e.target.files[0]) }}
                            data-testid='test-file-py' />
                      </Form.Group>
                      <br/>
                      <Form.Group className='mb-3'>
                        <Button
                          variant='success'
                          type='submit'
                          size='lg'
                          data-testid='modal-unirme'
                          onClick={handleClose}
                          >
                          Aceptar
                        </Button>
                        &nbsp;
                        <Button
                          variant='secondary'
                          type='reset'
                          size='lg'
                          onClick={handleClose}>
                          Cancelar
                        </Button>
                      </Form.Group>
                    </Form>
                  </Modal.Body>
                </Modal>
                {/* erros modal */}
                <Modal
                  className='modal-errorForm'
                  show={errorShow}
                  onHide={handleClose}
                  backdrop='static'
                  keyboard={false}>
                  <Modal.Header closeButton>
                    <Modal.Title> {message ? 'Subir nuevo código del Robot:' : 'Ha ocurrido un error'} </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {errorMsg}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant='primary'
                      onClick={handleClose}
                      className='buttonModal'>
                      Aceptar
                    </Button>
                  </Modal.Footer>
                </Modal>
              </div> &nbsp;
            </div> 
          )
        )}
      </div>
    </div>
    </>
  );
}

export default Cards;
import React, { useEffect, useState } from 'react';
import NavBar from './NavBar_2';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { API_ENDPOINT_DOWNLOAD_ROBOT_CODE, API_ENDPOINT_EDIT_ROBOT, API_ENDPOINT_LIST_ROBOTS, BASE_URL } from './ApiTypes';
import { GoCloudDownload, GoCloudUpload } from 'react-icons/go';
import './css/Card.css';

const Cards = () => {
  //Datos de la partida
  const [listRobots, setlistRobots] = useState([]);
  const [codeRobot, setCodeRobot] = useState(null);
  const [codeDownload, setCodeDownload] = useState([]);

  // Modal:
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErrorShow(false);
  }

  //errores
  const [errorShow, setErrorShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [message, setMessage] = useState(false);

  //Actualizar lista
  useEffect(() => {
    const firstCall = setTimeout(handleGames, 0);
    return () => clearTimeout(firstCall);
  }, [])

  //Leer datos de robots
  const handleGames = () => {
    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      axios.get(BASE_URL + API_ENDPOINT_LIST_ROBOTS, {
        headers: { 'Authorization': `Bearer ${tokenValue}` }
      })
      .then((res) => {
        console.log(res)
        // setlistRobots(sort_lists('nombre', res.data))
        setlistRobots(res.data.sort((a, b) => (a.name > b.name ? 1 : -1 )))
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }
  
  //Descargar codigo
  const handleSubmitDownload = () => {
    const tokenDict = localStorage.getItem('user');
    if (tokenDict !== null) {
      const tokenValue = (JSON.parse(tokenDict)).accessToken;
      axios.get(BASE_URL + API_ENDPOINT_DOWNLOAD_ROBOT_CODE + localStorage.getItem('id_robot'), {
        headers: { 'Authorization': `Bearer ${tokenValue}` }
      })
      .then((res) => {
        console.log(res.data)
        setCodeDownload(res.data)
      })
      .catch((err) => {
        console.log(err)
      });
    }
  }

  //Enviar datos a la API
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
        setErrorMsg('');
        if (e.response.data.detail === 'File must be a .py') {
          setErrorShow(true);
          setMessage(false);
          setErrorMsg('Solo se permiten archivos con extensión .py');
        }
      }
    }
  }

  function handleSubmitIdRobot(robot) {
    localStorage.setItem("id_robot", robot.id);
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
    <div className="container d-flex justify-content-center align-items-center h-100">
      <div className="row">
        {listRobots.map(( robot, id ) => (
          <div className="col-md-6" key={id}>
            <div className='card text-center bg-dark animate__animated animate__fadeInUp'>
              <div className='overflow'>
                <img src={robot.avatar} alt='a wallpaper' className='card-img-top'/>
              </div>
              <div className='card-body text-light'>
                <h3 className='card-title'>{robot.name}</h3>
              </div>
              <div className="col-sm-12 col-xs-12">
                <Button variant='primary mr-1' onClick={() => { setShow(true); handleSubmitIdRobot(robot) }}> <GoCloudUpload /> </Button> &nbsp;
                <Button variant='primary mr-1' onClick={() => { handleSubmitIdRobot(robot); handleSubmitDownload() }}> <GoCloudDownload /> </Button>
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

                    <Form onSubmit={handleSubmitEdit}>
                      <Form.Group className="mb-3">
                        <Form.Label> Subir nuevo código del Robot: </Form.Label>
                        <Form.Control
                            type="file"
                            className='form-control'
                            required
                            onChange={ (e) => {setCodeRobot(e.target.files[0]) }}
                            // ref={codeRobotInput}
                            data-testid="test-file-py" />
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

                <Modal
                  className='modal-errorForm'
                  show={errorShow}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}>
                  <Modal.Header closeButton>
                    <Modal.Title> {message ? 'Subir nuevo código del Robot:' : 'Ha ocurrido un error'} </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    {errorMsg}
                  </Modal.Body>
                  <Modal.Footer>
                    <Button
                      variant="primary"
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
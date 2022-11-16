import React, { useEffect, useState } from 'react';
import NavBar from './NavBar_2';
import axios from 'axios';
import { Button, Modal, Form } from 'react-bootstrap';
import { API_ENDPOINT_EDIT_ROBOT, API_ENDPOINT_LIST_ROBOTS, BASE_URL } from './ApiTypes';
import { GoCloudDownload, GoCloudUpload } from 'react-icons/go';


const Cards = () => {
  //Datos de la partida
  const [listRobots, setlistRobots] = useState([]);
  const [roborId, setRobotId] = useState(0);
  const [codeRobot, setCodeRobot] = useState(null);

  // Modal:
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);
    setErrorShow(false);
  }

    //errores
  const [errorShow, setErrorShow] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

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
  const handleCodeRobot = (event) => {
    
  }

  async function handleSubmitEdit(event) {
    event.preventDefault()
    // if (handleValidation()) {
    let formData = new FormData();

    const tokenDict = localStorage.getItem('user');
    const tokenValue = (JSON.parse(tokenDict)).accessToken;
    formData.append('robot_id', localStorage.getItem('id_robot'));
    formData.append('new_code', codeRobot);
    axios.post(BASE_URL + API_ENDPOINT_EDIT_ROBOT, formData, {
        headers: {"Authorization" : `Bearer ${tokenValue}`}
        })
    .then((res) => {
    }) 
    .catch((err) => {
        console.log(err)
    });
// }
    //     else {
    //         setValidForm(true);
		// }
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
          <div className="col-md-4" key={id}>
            <div className='card text-center bg-dark animate__animated animate__fadeInUp'>
              <div className='overflow'>
                <img src={robot.avatar} alt='a wallpaper' className='card-img-top'/>
              </div>
              <div className='card-body text-light'>
                <h3 className='card-title'>{robot.name}</h3>
              </div>
              <div class="col-sm-12 col-xs-12">
                <Button variant='primary mr-1' onClick={() => { setShow(true); handleSubmitIdRobot(robot) }}> Editar <GoCloudUpload /> </Button> &nbsp;
                <Button> Descargar<GoCloudDownload /> </Button>
              </div>
                <Modal
                  className='modal-joinGame'
                  show={show}
                  onHide={handleClose}
                  backdrop="static"
                  keyboard={false}>
                    <Modal.Header closeButton>
                      <Form.Text>
                        <h1>Nuevo Código</h1>
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
                        {/* <span style={{ color: "red" }}> {codeErr} </span> */}
                      </Form.Group>

                      <br/>
                      
                      <Form.Group className='mb-3'>
                        <Button
                          variant='success'
                          type='submit'
                          size='lg'
                          data-testid='modal-unirme'
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
                    <Modal.Title>Ha ocurrido un error</Modal.Title>
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
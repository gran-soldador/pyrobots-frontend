import React, { useState, useRef } from 'react'

import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import './css/UploadBotForm.css';
import logo from '../media/azul.svg';
import NavBar from './NavBar2';
import { API_ENDPOINT_UPLOAD_BOT, BASE_URL } from './ApiTypes';


export function UploadBotForm() {

	// Datos del formulario
    const [nameRobot, setNameRobot] = useState('');
    const [avatarRobot, setAvatarRobot] = useState(null);
    const [codeRobot, setCodeRobot] = useState(null);

	// Mensajes de entradas no validas.
	const [robotNameErr, setRobotNameErr] = useState("");
    const [avatarErr, setAvatarErr] = useState("");
    const [codeErr, setCodeErr] = useState("");

    // Mostar Modal de error si hay errores en los imputs.
    const [validForm, setValidForm] = useState(false);
    const hideErrorForm = () => setValidForm(false);

    // Referencias a los inputField.
    const nameRobotInput = useRef();
    const avatarRobotInput = useRef();
    const codeRobotInput = useRef();

    // Modal:
    const [successUpload, setSuccessUpload] = useState(false);

    const handleCloseModal = () => {
        setSuccessUpload(false);
        nameRobotInput.current.value = "";
        avatarRobotInput.current.value = null;
        codeRobotInput.current.value = null;
    }

    const handleValidation = () => {
        let formIsValid = true;
    
        if (!nameRobot.match(/^[a-zA-Z0-9-]+$/)) {
            formIsValid = false;
            setRobotNameErr("Solo mayúsculas, minúsculas, números y guiones.");
        }
        
        if (avatarRobot != null) {
            let ext = avatarRobot.name.split('.').pop();
            if (ext !== "jpg" && ext !== "jpeg" &&
                ext !== "jpe" && ext !== "jfif" &&
                ext !== "gif" && ext !== "png") {
                formIsValid = false;
                setAvatarErr("Solo se permiten imagenes con extensiones .jpg .jpeg .jpe .jfif .gif .png");
                setAvatarRobot(null);
                avatarRobotInput.current.value = null;
            }
        }

        if (codeRobot != null){
            let ext = codeRobot.name.split('.').pop();
            if (ext !== 'py') {
                formIsValid = false;
                setCodeErr("Solo se permiten archivos con extension '.py'");
                setCodeRobot(null);
                codeRobotInput.current.value = null;
            }
        }
        
        if (formIsValid) {
            setRobotNameErr("");
            setAvatarErr("");
            setCodeErr("");
        }
    
        return formIsValid;
    };

    const handleNameRobot = (event) => {
        setNameRobot(event.target.value); 
    }

    const handleAvatarRobot = (event) => {
        setAvatarRobot(event.target.files[0]);    
    }

    const handleCodeRobot = (event) => {
        setCodeRobot(event.target.files[0]);    
    }

    const handleCancel = () => {
        setNameRobot(''); 
        setAvatarRobot(null);    
        setCodeRobot(null);   
		
		setRobotNameErr("");
		setAvatarErr("");
		setCodeErr("");
    }

    const handleSubmit = (event) => {
        event.preventDefault()

        if (handleValidation()) {
            let formData = new FormData();

            const tokenDict = localStorage.getItem('user');
            const tokenValue = (JSON.parse(tokenDict)).accessToken;

            formData.append('name', nameRobot);

            if(avatarRobot){
                formData.append('avatar', avatarRobot);
            }

            formData.append('code', codeRobot);
            axios.post(BASE_URL + API_ENDPOINT_UPLOAD_BOT, formData, {
                headers: {"Authorization" : `Bearer ${tokenValue}`}
                })
            .then((res) => {
                setSuccessUpload(true);
            }) 
            .catch((err) => {
                if(err.response.data.detail === "User doesn't exist."){
                    setValidForm(true);
                }
                else if(err.response.data.detail === "File must be a .py"){
                    setValidForm(true);
                    codeRobotInput.current.value = null;
                    setCodeRobot(null);
                    setCodeErr("El archivo del robot no es valido. Por favor ingrese un archivo valido.");
                }
                else if(err.response.data.detail === "You already havea robot with that name."){
                    setValidForm(true);
                    nameRobotInput.current.value = "";
                    setNameRobot(''); 
                    setRobotNameErr("Nombre de robot en uso. Por favor ingrese un nombre valido.");
                }
                else if(err.response.data.detail === "File is not an image."){
                    setValidForm(true);
                    avatarRobotInput.current.value = null;
                    setAvatarRobot(null);
                    setAvatarErr("El avatar no es valido. Por favor ingrese una imagen valida.");
                }
                else{
                    console.log(err)
                }
            });
        }
        else {
            setValidForm(true);
		}
    }
        
    return (
        <>
        <NavBar />
        <br/>
        <Form onSubmit={ handleSubmit } className="form_upload_bot_pyrobot">
            
            <Modal
                className='modal-upload'
                show={successUpload}
                onHide={handleCloseModal}
                backdrop="static"
                keyboard={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Tu robot se subió correctamente! 🔥 </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>{nameRobot}</span> se añadió correctamente a tu bibliotecta de robots.
                    </Modal.Body>
                    <Modal.Footer>
                    <a href='/home'>
                        <Button 
                            variant="primary" 
                            onClick={handleCloseModal}
                            className='buttonModal'>
                                Aceptar
                        </Button>
                    </a>
                </Modal.Footer>
            </Modal>

            <Modal
                className='modal-errorForm'
                show={validForm}
                onHide={hideErrorForm}
                backdrop="static"
                keyboard={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>No se pudo subir tu robot 😔</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Revisa los datos del formulario e intenta nuevamente.
                    </Modal.Body>
                    <Modal.Footer>
                        <Button 
                            variant="primary" 
                            onClick={hideErrorForm}
                            className='buttonModal'>
                                Aceptar
                        </Button>
                </Modal.Footer>
            </Modal>

            <Image src={logo}></Image>
            <Image src={logo}></Image>
            <Image src={logo}></Image>
            
            <Form.Text> <h1>PyRobots</h1> </Form.Text>

            <Form.Text> <h4> Formulario para subir robots </h4> </Form.Text>

            <hr></hr>

            <Form.Group className="mb-3">
                <Form.Label> Nombre del robot: </Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder='Ingrese el nombre del robot' 
                    className="form-control" 
                    required
                    minLength={1} 
                    maxLength={32}
                    onChange={ handleNameRobot }
                    ref={nameRobotInput} /> 
                <span style={{ color: "red" }}> {robotNameErr} </span>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label> Avatar del Robot (Opcional): </Form.Label>
                    <Form.Control
                        type="file"
                        className='form-control'
                        onChange={ handleAvatarRobot }
                        data-testid="test-file-image"
                        ref={avatarRobotInput} />
                <span style={{ color: "red" }}> {avatarErr} </span>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label> Codigo del Robot: </Form.Label>
                <Form.Control
                    type="file"
                    className='form-control'
                    required
                    onChange={ handleCodeRobot }
                    ref={codeRobotInput} 
                    data-testid="test-file-py" />
                <span style={{ color: "red" }}> {codeErr} </span>
            </Form.Group>

            <Form.Group className="mb-3">
                <Button variant="success" 
                    type="submit"
                    data-testid="test-button"
                    size="lg">
                        Subir Robot
                </Button>{' '}

                <Button variant="secondary" 
                    type="reset"
                    size="lg"
                    onClick={ handleCancel }>
                        Cancelar
                </Button>
            </Form.Group>
        </Form>
        </>
    );
}

export default UploadBotForm;

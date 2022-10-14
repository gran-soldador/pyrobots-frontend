import React, { useState  } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import logo from './logo.png';

import axios from "axios";

export function UploadBotForm() {

	// Datos del formulario
    const [nameRobot, setNameRobot] = useState('');
    const [avatarRobot, setAvatarRobot] = useState(null);
    const [codeRobot, setCodeRobot] = useState(null);

	// Mensajes de entradas no validas.
	const [robotNameErr, setRobotNameErr] = useState("");
    const [avatarErr, setAvatarErr] = useState("");
    const [codeErr, setCodeErr] = useState("");

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
          }
        }

        if (codeRobot != null) {
            let ext = codeRobot.name.split('.').pop();
            if (ext !== 'py') {
                formIsValid = false;
              	setCodeErr("Solo se permiten archivos con extension '.py'");
              	setCodeRobot(null);
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

            formData.append('nameRobot', nameRobot);

            if(avatarRobot){
                formData.append('avatarRobot', avatarRobot);
            }

            formData.append('codeRobot', codeRobot);

            const API = ''
            const URL = "http://127.0.0.1:8000/" + API

            axios.post(URL, formData)
            .then((res) => {
                alert("Tu robot se cargó correctamente! 🤖 ")
                console.log(res)
                }
            ) 
            .catch((err) => {
                alert("No se pudo cargar tu robot! 😓 ")
                console.log(err) 
            });
        }
        else {
            alert("El formulario contiene errores");
		}

    }
        
    return (
        <Form onSubmit={ handleSubmit } className="form_upload_bot_pyrobot">

            <Image src={logo}></Image>
            <Image src={logo}></Image>
            <Image src={logo}></Image>
            
            <Form.Text>
                <h1>PyRobots</h1>
            </Form.Text>

            <Form.Text>
                <h4> Formulario para subir robots </h4>
            </Form.Text>

            <hr></hr>

            <Form.Group className="mb-3">
                <Form.Label> 
                    Nombre del robot:
                </Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder='Ingrese el nombre del robot' 
                    className="form-control" 
                    required
                    minLength={1} 
                    maxLength={32}
                    onChange={ handleNameRobot }/> 
				<span style={{ color: "red" }}>{robotNameErr}</span>

            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label> 
                    Avatar del Robot (Opcional):    
                </Form.Label>
                    <Form.Control
                        type="file"
                        className='form-control'
                        onChange={ handleAvatarRobot }/>
				<span style={{ color: "red" }}>{avatarErr}</span>

            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label> 
                    Codigo del Robot:
                </Form.Label>
                <Form.Control
                    type="file"
                    className='form-control'
                    required
                    onChange={ handleCodeRobot }/>
				<span style={{ color: "red" }}>{codeErr}</span>

            </Form.Group>

            <Form.Group className="mb-3">
                <Button variant="success" 
                    type="submit"
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
    );
}




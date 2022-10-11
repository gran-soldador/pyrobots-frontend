import React, { useState } from 'react'

import 'bootstrap/dist/css/bootstrap.css';

import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import logo from './logo.png';

// import axios from "axios";

export function UploadBotForm() {

    /*const baseURL = "";
      
    const createPost = (name_robot, avatar_robot, code_robot) => {
        console.log("Sending data...");
        axios.post(baseURL, {
          name_robot: "",
          avatar_robot: "",
          code_robot: ""
        })
        .then(function (response) {
            alert('Then: ' + response);
        })
        .catch(function (error) {
            alert('Catch: ' + error);
        });
    }*/

    const [nameRobot, setNameRobot] = useState('');
    const [avatarRobot, setAvatarRobot] = useState(null);
    const [codeRobot, setCodeRobot] = useState(null);

    const handleNameRobot = (event) => {
        setNameRobot(event.target.value);    
    }

    const handleAvatarRobot = (event) => {
        setAvatarRobot(event.target.files[0]);    
    }

    const handleACodeRobot = (event) => {
        setCodeRobot(event.target.files[0]);    
    }

    const verDatos = () => {
        alert("nameRobot: " + nameRobot);
        avatarRobot ? alert("avatarRobot: " + avatarRobot.name) : alert("null");
        alert("codeRobot: " + codeRobot.name);
        // createPost(nameRobot, avatarRobot, codeRobot);
    }

    return (
            <Form onSubmit={ verDatos } className="form_upload_bot_pyrobot">

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
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label> 
                        Avatar del Robot (Opcional):    
                    </Form.Label>
                        <Form.Control
                            type="file"
                            className='form-control'
                            onChange={ handleAvatarRobot }/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label> 
                        Codigo del Robot:
                    </Form.Label>
                    <Form.Control
                        type="file"
                        className='form-control'
                        required
                        onChange={ handleACodeRobot }/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Button variant="success" 
                        type="submit"
                        size="lg">
                            Subir Robot
                    </Button>{' '}

                    <Button variant="secondary" 
                        type="reset"
                        size="lg">
                            Cancelar
                    </Button>
                </Form.Group>
            </Form>
    );
}




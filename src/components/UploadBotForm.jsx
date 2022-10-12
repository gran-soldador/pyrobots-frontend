import React, { useState  } from 'react'

import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import logo from './logo.png';

import axios from "axios";

export function UploadBotForm() {

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


    const handleSubmit = (event) => {
        event.preventDefault()

        let formData = new FormData();

        formData.append('nameRobot', nameRobot);
        formData.append('avatarRobot', avatarRobot);
        formData.append('codeRobot', codeRobot);

        const API = ''
        const URL = "http://127.0.0.1:8000/" + API

        axios.post(URL, formData)
        .then((res) => { console.log(res) }) 
        .catch((err) => { console.log(err) });
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




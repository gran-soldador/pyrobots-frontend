import React, { useState, useRef, useEffect} from 'react'

import axios from "axios";

import 'bootstrap/dist/css/bootstrap.css';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

import './css/UploadBotForm.css';
import logo from './logo.png';

export function UploadBotForm() {
    
    const [username, setUsername] = useState('');
 
    useEffect(function () {
        
        const API_ID = '/login/verify_token'
        const URL_ID = "http://127.0.0.1:8000" + API_ID
        
        const tokenDict = localStorage.getItem('user');
        if(tokenDict !== null){
            const tokenValue = (JSON.parse(tokenDict)).accessToken;
            console.log(tokenValue);
    
            let TokenData = new FormData();
            TokenData.append('Authorization', tokenValue);
            
            axios.post(URL_ID, TokenData)
            .then((res) => {
                console.log(res.data.nombre_usuario)
                setUsername(res.data.nombre_usuario)
            }) 
            .catch((err) => {
                console.log(err)
            });
        }

    }, []);

	// Datos del formulario
    const [nameRobot, setNameRobot] = useState('');
    const [avatarRobot, setAvatarRobot] = useState(null);
    const [codeRobot, setCodeRobot] = useState(null);

	// Mensajes de entradas no validas.
	const [robotNameErr, setRobotNameErr] = useState("");
    const [avatarErr, setAvatarErr] = useState("");
    const [codeErr, setCodeErr] = useState("");

    // Referencias a los inputField.
    const nameRobotInput = useRef();
    const avatarRobotInput = useRef();
    const codeRobotInput = useRef();

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

        console.log("EL usuario ", username, " quiere subir un robot.")
        if (handleValidation()) {
            
            let formData = new FormData();
            console.log("FromData-Username: ", username);
            formData.append('username', username);
            formData.append('robotName', nameRobot);

            if(avatarRobot){
                formData.append('robotAvatar', avatarRobot);
            }

            formData.append('robotCode', codeRobot);

            const API = '/user/creacion_de_robot/'
            const URL = "http://127.0.0.1:8000" + API

            axios.post(URL, formData)
            .then((res) => {
                console.log("Tu robot se subió correctamente! 🤖 ")
                // Redirigir a otra pagina.
                console.log(res.data)
                }
            ) 
            .catch((err) => {
                if(err.response.data.detail === "User doesn't exist."){
                    console.log("Username error. Try again.")
                    // Redirgo a otra pagina.
                }
                else if(err.response.data.detail === "File must be a .py"){
                    codeRobotInput.current.value = null;
                    setCodeRobot(null);
            		setCodeErr("El archivo del robot no es valido. Por favor ingrese un archivo valido.");
                }
                else if(err.response.data.detail === "You already have a robot with that name."){
                    nameRobotInput.current.value = "";
                    setNameRobot(''); 
                    setRobotNameErr("Nombre de robot en uso. Por favor ingrese un nombre valido.");
                }
                else if(err.response.data.detail === "File is not an image."){
                    avatarRobotInput.current.value = null;
                    setAvatarRobot(null);
            		setAvatarErr("El avatar no es valido. Por favor ingrese una imagen valida.");
                }
            });
        }
        else {
            console.log("El formulario contiene errores. Revisa los datos e intente nuevamente.");
		}
    }
        
    return (
        <Form onSubmit={ handleSubmit } className="form_upload_bot_pyrobot">

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
    );
}

export default UploadBotForm;

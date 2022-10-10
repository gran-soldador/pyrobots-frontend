import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';

export function UploadBotForm() {
    
    const [nameRobot, setNameRobot] = useState('');
    const [avatarRobot, setAvatarRobot] = useState('');
    const [codeRobot, setCodeRobot] = useState('');

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
        alert("avatarRobot: " + avatarRobot.name);
        alert("codeRobot: " + codeRobot.name);
    }

    return (
        <div className="Form_PyRobot">
            <form onSubmit={ verDatos }>
                <h2> Subir Robot</h2>
                <div className="form-outline mb-4">
                    <label> Nombre del Robot </label> 
                    <br/>
                    <input 
                        type="text" 
                        placeholder='Ingrese el nombre del robot' 
                        className="form-control" 
                        onChange={ handleNameRobot }/> 
                </div>

                <div className="form-outline mb-4">
                    <label> Avatar del Robot </label> 
                    <br/>
                    <input 
                        type="file"
                        className='form-control'
                        onChange={ handleAvatarRobot }/>
                </div>

                <div className="form-outline mb-4">
                    <label> Codigo del Robot </label> 
                    <br/> 
                    <input 
                        type="file"
                        className='form-control'
                        onChange={ handleACodeRobot }/>
                </div>

                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        <button 
                            className="btn btn-success"
                            type='submit'> 
                                Subir Robot
                        </button>
                    </div>

                    <div className="col">
                        <button 
                            className="btn btn-secondary"
                            type='reset'> 
                                Cancelar 
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}




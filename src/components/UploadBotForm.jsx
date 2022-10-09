import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';

class UploadBotForm extends React.Component {

    render() {
        return (
            <div className='Form_PyRobot'>		
                <form action="algun_lado">	
                    <h2> Subir Robot </h2>
                    
                    <label for='nombre-robot'> Nombre del Robot: </label>
                    <br/>
                    <input type="text" class='form-control'/>
                
                    <label for='avatar-robot'> Avatar: </label>
                    <br/>
                    <input type="file" id="files" class='form-control' />

                    <label for> Codigo fuente: </label>
                    <br/>
                    <input type="file" ref={this.code_robot}  class='form-control'/>
                
                    <button type="submit" class="btn btn-block mb-4 btn-success">Subir Robot</button>
                    <button type="reset" class="btn btn-block mb-4 btn-dark">Cancelar</button>

                </form>
            </div>
        )	
    };
}

export default UploadBotForm;
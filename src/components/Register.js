import 'bootstrap/dist/css/bootstrap.css'
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import logo from './logo.png';
import React from 'react';

class Register extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      fields: {},
      errors: {},
    };
  }

  handleValidation() {
    let fields = this.state.fields;
    let errors = {};
    let formIsValid = true;

    //Username
    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "No Puede estar vacío";
    }

    if (typeof fields["username"] !== "undefined") {
      if (!fields["username"].match(/^[a-zA-Z0-9-]+$/)) {
        formIsValid = false;
        errors["username"] = "Solo Mayúsculas, Minúsculas y Guiones";
      }
    }

    if (fields["username"].length > 32) {
      formIsValid = false;
      errors["username"] = "Username debe tener menos de 32 caracteres";
    }

    /*
    if (fields["username"] pertenecen a usuarios registrados) {
      formIsValid = false;
      errors["username"] = "Username ya registrado";
    }*/

    //Email
    if (!fields["email"]) {
      formIsValid = false;
      errors["email"] = "No Puede estar vacío";
    }

    if (typeof fields["email"] !== "undefined") {
      let lastAtPos = fields["email"].lastIndexOf("@");
      let lastDotPos = fields["email"].lastIndexOf(".");

      if (
        !(
          lastAtPos < lastDotPos &&
          lastAtPos > 0 &&
          fields["email"].indexOf("@@") == -1 &&
          lastDotPos > 2 &&
          fields["email"].length - lastDotPos > 2
        )
      ) {
        formIsValid = false;
        errors["email"] = "Email no valido";
      }
    }
    /*
    if (fields["email"] pertenecen a usuarios registrados) {
      formIsValid = false;
      errors["email"] = "Email ya registrado";
    }*/

    //Confirmar email
    if (fields["email"] != fields["email-conf"]) {
      formIsValid = false;
      errors["email-conf"] = "Confirmación de email es distinto al email seleccionado";
    }

    //Contraseña
    if (!fields["password"]) {
      formIsValid = false;
      errors["password"] = "No Puede estar vacío";
    }

    if (typeof fields["password"] !== "undefined") {
      if (!fields["password"]
      .match(/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*-_])/)) {
        formIsValid = false;
        errors["password"] = 
        "Debe contener minimo 1 Mayúscula, 1 Minúscula, 1 Numero y 1 Caracter especial";
      }
    }

    if (fields["password"].length < 8) {
      formIsValid = false;
      errors["password"] = "Contraseña debe tener más de 8 caracteres";
    }

    //Confirmar contraseña
    if (fields["password"] != fields["password-conf"]) {
      formIsValid = false;
      errors["password-conf"] =
      "Confirmación de contraseña es distinta a la contraseña seleccionada";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }

  registerSubmit(e) {
    e.preventDefault();

    if (this.handleValidation()) {
      alert("Usuario registrado");
      console.log(this.state.fields["username"] + ' ' + this.state.fields["email"] + ' ' + this.state.fields["password"]);
    } else {
      alert("El formulario contiene errores");
    }
  }

  handleChange(field, e) {
    let fields = this.state.fields;
    fields[field] = e.target.value;
    this.setState({ fields });
  }

  render() {
    return (
      <>
        <form
          className="registerform"
          noValidate
          onSubmit={this.registerSubmit.bind(this)}
        >
          <img src={logo} className="" alt="logo" />
          <Image src={logo}></Image>
          <Image src={logo}></Image>

          <Form.Text>
            <h1>Bienvenido a PyRobots!</h1>
          </Form.Text>
          <Form.Text>
            Registro
          </Form.Text>
          <hr></hr>

          <Form.Group as={Row} className="mb-3" controlId="formBasicUsuario">
            <Form.Label column sm={12}>Usuario</Form.Label>
            <br/>
            <Col sm={12}>
              <Form.Control
                ref="username"
                type="text"
                placeholder="Ingresar usuario"
                class='form-control'
                onChange={this.handleChange.bind(this, "username")}
                value={this.state.fields["username"]}
              />
              <span style={{ color: "red" }}>{this.state.errors["username"]}</span>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formBasicEmail">
            <Form.Label column sm={12}>Email</Form.Label>
            <br/>
            <Col sm={12}>
              <Form.Control
                ref="email"
                type="email"
                placeholder="Ingresar Email"
                class='form-control'
                onChange={this.handleChange.bind(this, "email")}
                value={this.state.fields["email"]}
              />
            <span style={{ color: "red" }}>{this.state.errors["email"]}</span>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formBasicEmailConf">
            <Form.Label column sm={12}>Confirmar Email</Form.Label>
            <br/>
            <Col sm={12}>
              <input
                ref="email-conf"
                type="email"
                placeholder="Confirmar Email"
                class='form-control'
                onChange={this.handleChange.bind(this, "email-conf")}
                value={this.state.fields["email-conf"]}
              />
            <span style={{ color: "red" }}>{this.state.errors["email-conf"]}</span>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formBasicPassword">
            <Form.Label column sm={12}>Contraseña </Form.Label>
            <br/>
            <Col sm={12}>
              <input
                ref="password"
                type="password"
                placeholder="Ingresar contraseña"
                class='form-control'
                onChange={this.handleChange.bind(this, "password")}
                value={this.state.fields["password"]}
              />
            <span style={{ color: "red" }}>{this.state.errors["password"]}</span>
            </Col>
          </Form.Group>
        
          <Form.Group as={Row} className="mb-3" controlId="formBasicPasswordConf">
            <Form.Label column sm={12}>Confirmar Contraseña</Form.Label>
            <br/>
            <Col sm={12}>
              <input
                ref="password-conf"
                type="password"
                placeholder="Confirmar contraseña"
                class='form-control'
                onChange={this.handleChange.bind(this, "password-conf")}
                value={this.state.fields["password-conf"]}
              />
            <span style={{ color: "red" }}>{this.state.errors["password-conf"]}</span>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="formBasicAvatar">
            <Form.Label column sm={12}>Avatar</Form.Label>
            <br/>
            <Col sm={12}>
              <input
                ref="prof-avatar"
                type="file"
                id="files"
                class='form-control'
                onChange={this.handleChange.bind(this, "prof-avatar")}
                value={this.state.fields["prof-avatar"]}
              />
            <span style={{ color: "red" }}>{this.state.errors["prof-avatar"]}</span>
            </Col>
          </Form.Group>

          <button type="reset" class="btn btn-block mb-4 btn-dark">
            Cancelar
          </button>
          &nbsp;
          <button type="submit" class="btn btn-block mb-4 btn-success">
            Registrarte
          </button>
        </form>
      </>
    );
  };
};
export default Register;
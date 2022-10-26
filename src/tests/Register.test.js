import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Register from '../components/Register'

//Verifico que se encuentren los campos predeterminados
test('Estan los campos predeterminados?', () => {
  render(<Register/>);
  const username = screen.getByPlaceholderText(/Ingresar usuario/i);
  const useremail = screen.getByPlaceholderText(/Ingresar Email/i);
  const useremailconf = screen.getByPlaceholderText(/Confirmar Email/i);
  const password = screen.getByPlaceholderText(/Ingresar contraseña/i);
  const passwordconf = screen.getByPlaceholderText(/Confirmar contraseña/i);
  const avatar = screen.getByText("Avatar (Opcional)");
  expect(username).toBeInTheDocument();
  expect(useremail).toBeInTheDocument();
  expect(useremailconf).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(passwordconf).toBeInTheDocument();
  expect(avatar).toBeInTheDocument();
})

test('Las entradas están vacias al inicio?', () => {
  render(<Register/>);
  const username = screen.getByPlaceholderText(/Ingresar usuario/i);
  const useremail = screen.getByPlaceholderText(/Ingresar Email/i);
  const useremailconf = screen.getByPlaceholderText(/Confirmar Email/i);
  const password = screen.getByPlaceholderText(/Ingresar contraseña/i);
  const passwordconf = screen.getByPlaceholderText(/Confirmar contraseña/i);
  expect(username).toBeInTheDocument('abc');
  expect(useremail).toBeInTheDocument('abc@gmail.com');
  expect(useremailconf).toBeInTheDocument('abc@gmail.com');
  expect(password).toBeInTheDocument('abCdeF@15');
  expect(passwordconf).toBeInTheDocument('abCdeF@15');
})

test('Registrar envia datos?', () => {
  render(<Register/>);
  const buttonis = screen.getByText('Registrarte');
  const username = screen.getByPlaceholderText(/Ingresar usuario/i);
  const useremail = screen.getByPlaceholderText(/Ingresar Email/i);
  const useremailconf = screen.getByPlaceholderText(/Confirmar Email/i);
  const password = screen.getByPlaceholderText(/Ingresar contraseña/i);
  const passwordconf = screen.getByPlaceholderText(/Confirmar contraseña/i);
  const testusername = 'abc0';
  const testuseremail = 'abc0@gmail.com';
  const testuseremailconf = 'abc0@gmail.com';
  const testpassword = 'abCdeF@150';
  const testpasswordconf = 'abCdeF@150';
  fireEvent.change(username, { target: { value: testusername } });
  fireEvent.change(useremail, { target: { value: testuseremail } });
  fireEvent.change(useremailconf, { target: { value: testuseremailconf } });
  fireEvent.change(password, { target: { value: testpassword } });
  fireEvent.change(passwordconf, { target: { value: testpasswordconf } });
  fireEvent.click(buttonis);
  expect(username).toBeInTheDocument(testusername);
  expect(useremail).toBeInTheDocument(testuseremail);
  expect(useremailconf).toBeInTheDocument(testuseremailconf);
  expect(password).toBeInTheDocument(testpassword);
  expect(passwordconf).toBeInTheDocument(testpasswordconf);
})

test('Renderizar componentes async?', async () => {
  render(<Register/>)
  const username = screen.getByPlaceholderText(/Ingresar usuario/i);
  const useremail = screen.getByPlaceholderText(/Ingresar Email/i);
  const useremailconf = screen.getByPlaceholderText(/Confirmar Email/i);
  const password = screen.getByPlaceholderText(/Ingresar contraseña/i);
  const passwordconf = screen.getByPlaceholderText(/Confirmar contraseña/i);
  const buttonis = screen.getByText('Registrarte');

  fireEvent.change(username, { target: { value: 'abc01' } });
  fireEvent.change(useremail, { target: { value: 'abc01@gmail.com' } });
  fireEvent.change(useremailconf, { target: { value: 'abc01@gmail.com' } });
  fireEvent.change(password, { target: { value: 'abCdeF@1501' } });
  fireEvent.change(passwordconf, { target: { value: 'abCdeF@1501' } });
  fireEvent.click(buttonis);
  expect(username).toBeInTheDocument();
  expect(useremail).toBeInTheDocument();
  expect(useremailconf).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(passwordconf).toBeInTheDocument();

  expect(screen.getByPlaceholderText(/Ingresar usuario/i)).toHaveValue('abc01');
  expect(screen.getByPlaceholderText(/Ingresar Email/i)).toHaveValue('abc01@gmail.com');
  expect(screen.getByPlaceholderText(/Confirmar Email/i)).toHaveValue('abc01@gmail.com');
  expect(screen.getByPlaceholderText(/Ingresar contraseña/i)).toHaveValue('abCdeF@1501');
  expect(screen.getByPlaceholderText(/Confirmar contraseña/i)).toHaveValue('abCdeF@1501');
})

test('solo puedo enviar archivos de imagenes', async () => {
  render(<Register/>)
  let file = new File(['(⌐□_□)'], 'picture.py', { type: 'aplication/py' });

  const fileInput = screen.getByTestId('test-file-image');
  fireEvent.change(fileInput, { target: { files: [file] } })

  const submitButton = screen.getByTestId("test-button")
  fireEvent.click(submitButton)

  await waitFor(() =>
    screen.getByText("Solo se permiten imagenes con extensiones .jpg .jpeg .jpe .jfif .gif .png")
  );
})

test('debe avisar error en formacion de user', async () => {
  render(<Register/>)
  const username = screen.getByPlaceholderText(/Ingresar usuario/i);
  fireEvent.change(username, { target: { value: '123@@&abc' } });
  expect(screen.getByPlaceholderText(/Ingresar usuario/i)).toHaveValue('123@@&abc');

  const submitButton = screen.getByTestId("test-button")
  fireEvent.click(submitButton)

  await waitFor(() =>
    screen.getByText(
    "Solo Mayúsculas, Minúsculas, Números y Guiones")
  );
})

test('debe avisar error en formacion de password', async () => {
  render(<Register/>)
  const password = screen.getByPlaceholderText(/Ingresar contraseña/i);
  fireEvent.change(password, { target: { value: 'abcde1234' } });
  expect(screen.getByPlaceholderText(/Ingresar contraseña/i)).toHaveValue('abcde1234');

  const submitButton = screen.getByTestId("test-button")
  fireEvent.click(submitButton)

  await waitFor(() =>
    screen.getByText(
    "Debe contener minimo 1 Mayúscula, 1 Minúscula, 1 Número y 1 Caracter especial de los siguientes: !@#$%^&*-")
  );
})

test('debe avisar error de confirmaciones', async () => {
  render(<Register/>)
  const useremail = screen.getByPlaceholderText(/Ingresar Email/i);
  const useremailconf = screen.getByPlaceholderText(/Confirmar Email/i);
  const password = screen.getByPlaceholderText(/Ingresar contraseña/i);
  const passwordconf = screen.getByPlaceholderText(/Confirmar contraseña/i);

  fireEvent.change(useremail, { target: { value: 'abc01@gmail.com' } });
  fireEvent.change(useremailconf, { target: { value: 'abc012@gmail.com' } });
  fireEvent.change(password, { target: { value: 'abCdeF@1501' } });
  fireEvent.change(passwordconf, { target: { value: 'abCdeF@150' } });

  expect(screen.getByPlaceholderText(/Ingresar Email/i)).toHaveValue('abc01@gmail.com');
  expect(screen.getByPlaceholderText(/Confirmar Email/i)).toHaveValue('abc012@gmail.com');
  expect(screen.getByPlaceholderText(/Ingresar contraseña/i)).toHaveValue('abCdeF@1501');
  expect(screen.getByPlaceholderText(/Confirmar contraseña/i)).toHaveValue('abCdeF@150');


  const submitButton = screen.getByTestId("test-button");
  fireEvent.click(submitButton);

  await waitFor(() => {
    screen.getByText("Confirmación de email es distinto al email seleccionado");
    screen.getByText("Confirmación de contraseña es distinta a la contraseña seleccionada");
  });
})
import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import RecoverPassword from '../components/RecoverPassword';
import Login from '../components/FormLogin';

test('Estan los campos predeterminados?', () => {
  render(<RecoverPassword />);
  const password = screen.getByPlaceholderText(/Ingrese una nueva contraseña/i);
  const passwordconf = screen.getByPlaceholderText(/Ingrese de nuevo la contraseña/i);
  expect(password).toBeInTheDocument();
  expect(passwordconf).toBeInTheDocument();
})

test('Se guardan los datos?', () => {
  render(<RecoverPassword />);
  const buttonis = screen.getByText('Cambiar Contraseña');
  const password = screen.getByPlaceholderText(/Ingrese una nueva contraseña/i);
  const passwordconf = screen.getByPlaceholderText(/Ingrese de nuevo la contraseña/i);
  const testpassword = 'abCdeF@150';
  const testpasswordconf = 'abCdeF@150';
  fireEvent.change(password, { target: { value: testpassword } });
  fireEvent.change(passwordconf, { target: { value: testpasswordconf } });
  fireEvent.click(buttonis);
  expect(password).toBeInTheDocument(testpassword);
  expect(passwordconf).toBeInTheDocument(testpasswordconf);
  expect(screen.getByPlaceholderText(/Ingrese una nueva contraseña/i)).toHaveValue('abCdeF@150');
  expect(screen.getByPlaceholderText(/Ingrese de nuevo la contraseña/i)).toHaveValue('abCdeF@150');
})

test('debe avisar error en formacion de password', async () => {
  render(<RecoverPassword />);
  const password = screen.getByPlaceholderText(/Ingrese una nueva contraseña/i);
  const passwordconf = screen.getByPlaceholderText(/Ingrese de nuevo la contraseña/i);
  fireEvent.change(password, { target: { value: 'abcde1234' } });
  fireEvent.change(passwordconf, { target: { value: 'abcde1234' } });
  expect(screen.getByPlaceholderText(/Ingrese una nueva contraseña/i)).toHaveValue('abcde1234');

  const submitButton = screen.getByTestId("test-button-recover");
  fireEvent.click(submitButton);

  await waitFor(() =>
    screen.getByText(
    "Debe contener minimo 1 Mayúscula, 1 Minúscula, 1 Número y 1 Caracter especial de los siguientes: !@#$%^&*-")
  );
})

test('debe avisar error de confirmaciones', async () => {
  render(<RecoverPassword />);
  const buttonis = screen.getByText('Cambiar Contraseña');
  const password = screen.getByPlaceholderText(/Ingrese una nueva contraseña/i);
  const passwordconf = screen.getByPlaceholderText(/Ingrese de nuevo la contraseña/i);
  const testpassword = 'abCdeF@150';
  const testpasswordconf = 'abCdeF@1501';
  fireEvent.change(password, { target: { value: testpassword } });
  fireEvent.change(passwordconf, { target: { value: testpasswordconf } });

  const submitButton = screen.getByTestId("test-button-recover");
  fireEvent.click(submitButton);

  await waitFor(() => {
    screen.getByText("Las contraseñas ingresadas deben ser iguales.");
  });
})

describe('Tests recover password en el login', () => {
  test('se renderizan el boton?', async () => {
    render(<Login />);
    const linkElement = screen.getByText(/¿Olvidaste tu contraseña?/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('se renderiza el modal?', async () => { 
    render(<Login />);
    const linkElement = screen.getByText(/¿Olvidaste tu contraseña?/i);
    expect(linkElement).toBeInTheDocument();
    fireEvent.click(linkElement);
    const title = screen.getByText(/Recuperar contraseña/i);
    expect(title).toBeInTheDocument();
    const email = screen.getByText(/Ingresa tu email:/i);
    expect(email).toBeInTheDocument();
  });
  // test('se enviar el formulario', async () => {
  //   const linkElement = screen.getByText(/¿Olvidaste tu contraseña?/i);
  //   expect(linkElement).toBeInTheDocument();
  //   fireEvent.click(linkElement);
  //   userEvent.type(inputemail, 'kevingston47@gmail.com');
  //   const button = screen.getByRole('button', { name: /Aceptar/i });
  //   userEvent.click(button);
  //   const alert = await screen.findByRole('alert');
  //   expect(alert).toBeInTheDocument();
  // });
})
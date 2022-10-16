import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import FormLogin from '../components/FormLogin';

test('la entrada de nombre de usuario debe ser procesada', () => {
  render(<FormLogin/>);
  const username = screen.getByPlaceholderText(/Ingrese nombre de usuario/i);
  expect(username).toBeInTheDocument();
})

test('la entrada de contraseña debe ser procesada', () => {
    render(<FormLogin/>);
    const password = screen.getByPlaceholderText(/Ingrese una contraseña/i);
    expect(password).toBeInTheDocument();
})

test("la entrada de nombre de usuario debe estar vacía", () => {
  render(<FormLogin />);
  const usuario = screen.getByPlaceholderText(/Ingrese nombre de usuario/i);
  expect(usuario.value).toBe("");
});

test("la entrada de contraseña debe estar vacía", () => {
  render(<FormLogin />);
  const password = screen.getByPlaceholderText(/Ingrese una contraseña/i);
  expect(password.value).toBe("");
});

test("la entrada de nombre de usuario debe cambiar", () => {
  render(<FormLogin />);
  const username = screen.getByPlaceholderText(/Ingrese nombre de usuario/i);
  const testValue = "testUsername";

  fireEvent.change(username, { target: { value: testValue } });
  expect(username.value).toBe(testValue);
});

test("la entrada de contraseña debe cambiar", () => {
  render(<FormLogin />);
  const password = screen.getByPlaceholderText(/Ingrese una contraseña/i);
  const testValue = "testPassword";

  fireEvent.change(password, { target: { value: testValue } });
  expect(password.value).toBe(testValue);
});

test("Formulario de login debe ser renderizado", () => {
  render(<FormLogin />);
  const username = screen.getByPlaceholderText(/Ingrese nombre de usuario/i);
  const password = screen.getByPlaceholderText(/Ingrese una contraseña/i);
  const buttonSubmit = screen.getByRole("button", {name: /Iniciar sesion/i});

  const testValueUsername = "testUsername";
  const testValuePassword = "testPassword2022";

  fireEvent.change(username, { target: { value: testValueUsername } });
  fireEvent.change(password, { target: { value: testValuePassword } });
  // fireEvent.click(buttonSubmit);
});
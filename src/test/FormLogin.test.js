import React from 'react'
import { render, screen } from '@testing-library/react'
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
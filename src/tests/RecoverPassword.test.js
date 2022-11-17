import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import RecoverPassword from '../components/FormLogin';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  render(<RecoverPassword />);
})

describe('Tests recover password', () => {
  test('se renderizan las cosas', async () => {
    const linkElement = screen.getByText(/¿Olvidaste tu contraseña?/i);
    expect(linkElement).toBeInTheDocument();
  });
  test('se renderiza el modal', async () => { 
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
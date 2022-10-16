import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import Register from '../components/Register'

//Verifico que se encuentren los campos predeterminados
test('Estan los campos predeterminados?', () => {
  render(<Register/>);
  const username = screen.getByPlaceholderText(/Ingresar usuario/i);
  const useremail = screen.getByPlaceholderText(/Ingresar Email/i);
  const useremailconf = screen.getByPlaceholderText(/Confirmar Email/i);
  const password = screen.getByPlaceholderText(/Ingresar contraseña/i);
  const passwordconf = screen.getByPlaceholderText(/Confirmar contraseña/i);
  expect(username).toBeInTheDocument();
  expect(useremail).toBeInTheDocument();
  expect(useremailconf).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(passwordconf).toBeInTheDocument();
})

//
test('Las entradas están vacias al inicio?', () => {
  render(<Register/>);
  const username = screen.getByPlaceholderText(/Ingresar usuario/i);
  const useremail = screen.getByPlaceholderText(/Ingresar Email/i);
  const useremailconf = screen.getByPlaceholderText(/Confirmar Email/i);
  const password = screen.getByPlaceholderText(/Ingresar contraseña/i);
  const passwordconf = screen.getByPlaceholderText(/Confirmar contraseña/i);
  expect(username).toBeInTheDocument('fede');
  expect(useremail).toBeInTheDocument('fede@gmail.com');
  expect(useremailconf).toBeInTheDocument('fede@gmail.com');
  expect(password).toBeInTheDocument('abCdeF-15');
  expect(passwordconf).toBeInTheDocument('abCdeF-15');
})

// cambian los parámetros inválidos a válidos

test('Crear envia datos?', () => {
  render(<Register/>);
  const buttonis = screen.getByText('Registrarte');
  const username = screen.getByPlaceholderText(/Ingresar usuario/i);
  const useremail = screen.getByPlaceholderText(/Ingresar Email/i);
  const useremailconf = screen.getByPlaceholderText(/Confirmar Email/i);
  const password = screen.getByPlaceholderText(/Ingresar contraseña/i);
  const passwordconf = screen.getByPlaceholderText(/Confirmar contraseña/i);
  const testusername = 'fede0';
  const testuseremail = 'fede0@gmail.com';
  const testuseremailconf = 'fede0@gmail.com';
  const testpassword = 'abCdeF-150';
  const testpasswordconf = 'abCdeF-150';
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

  fireEvent.change(username, { target: { value: 'fede01' } });
  fireEvent.change(useremail, { target: { value: 'fede01@gmail.com' } });
  fireEvent.change(useremailconf, { target: { value: 'fede01@gmail.com' } });
  fireEvent.change(password, { target: { value: 'abCdeF-1501' } });
  fireEvent.change(passwordconf, { target: { value: 'abCdeF-1501' } });
  fireEvent.click(buttonis);
  expect(username).toBeInTheDocument();
  expect(useremail).toBeInTheDocument();
  expect(useremailconf).toBeInTheDocument();
  expect(password).toBeInTheDocument();
  expect(passwordconf).toBeInTheDocument();

  expect(screen.getByPlaceholderText(/Ingresar usuario/i)).toHaveValue('fede01');
  expect(screen.getByPlaceholderText(/Ingresar Email/i)).toHaveValue('fede01@gmail.com');
  expect(screen.getByPlaceholderText(/Confirmar Email/i)).toHaveValue('fede01@gmail.com');
  expect(screen.getByPlaceholderText(/Ingresar contraseña/i)).toHaveValue('abCdeF-1501');
  expect(screen.getByPlaceholderText(/Confirmar contraseña/i)).toHaveValue('abCdeF-1501');
})
import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import CreatePartida from '../components/CreatePartida'

//Verifico que se encuentren los campos predeterminados
test('Name Partida', () => {
  render(<CreatePartida/>);
  const namepartida = screen.getByPlaceholderText(/Ingrese el nombre de la partida/i);
  expect(namepartida).toBeInTheDocument();
})

test('Cantidad de jugadores', () => {
  render(<CreatePartida/>);
  const numjugadores = screen.getByPlaceholderText(/Ingrese la cantidad de jugadores/i);
  expect(numjugadores).toBeInTheDocument();
})

test('Cantidad de juegos', () => {
  render(<CreatePartida/>);
  const numjuegos = screen.getByPlaceholderText(/Ingrese la cantidad de juegos/i);
  expect(numjuegos).toBeInTheDocument();
})

test('Cantidad de Rondas', () => {
  render(<CreatePartida/>);
  const numrondas = screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i);
  expect(numrondas).toBeInTheDocument();
})

test('Password', () => {
  render(<CreatePartida/>);
  const password = screen.getByPlaceholderText(/Ingrese contraseña/i);
  expect(password).toBeInTheDocument();
})

test('Name Partida Vacio', () => {
  render(<CreatePartida/>);
  const namepartida = screen.getByPlaceholderText(/Ingrese el nombre de la partida/i);
  expect(namepartida).toBeInTheDocument('');
})

test('Cantidad de jugadores 1', () => {
  render(<CreatePartida/>);
  const numjugadores = screen.getByPlaceholderText(/Ingrese la cantidad de jugadores/i);
  expect(numjugadores).toBeInTheDocument(1);
})

test('Cantidad de juegos 0', () => {
  render(<CreatePartida/>);
  const numjuegos = screen.getByPlaceholderText(/Ingrese la cantidad de juegos/i);
  expect(numjuegos).toBeInTheDocument(0);
})

test('Cantidad de Rondas negativo', () => {
  render(<CreatePartida/>);
  const numrondas = screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i);
  expect(numrondas).toBeInTheDocument(-2);
})

test('Password vacio', () => {
  render(<CreatePartida/>);
  const password = screen.getByPlaceholderText(/Ingrese contraseña/i);
  expect(password).toBeInTheDocument('');
})

test('Cantidad de Rondas > 10000', () => {
  render(<CreatePartida/>);
  const numrondas = screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i);
  expect(numrondas).toBeInTheDocument(1000000);
})

// cambian?
test('Name Partida change', () => {
  render(<CreatePartida/>);
  const namepartida = screen.getByPlaceholderText(/Ingrese el nombre de la partida/i);
  const testValue = 'prueba';
  fireEvent.change(namepartida, { target: { value: testValue } });
  expect(namepartida).toBeInTheDocument(testValue);
})

test('Cantidad de jugadores change', () => {
  render(<CreatePartida/>);
  const numjugadores = screen.getByPlaceholderText(/Ingrese la cantidad de jugadores/i);
  const testValue = 5;
  fireEvent.change(numjugadores, { target: { value: testValue } });
  expect(numjugadores).toBeInTheDocument(testValue);
})

test('Cantidad de juegos change', () => {
  render(<CreatePartida/>);
  const numjuegos = screen.getByPlaceholderText(/Ingrese la cantidad de juegos/i);
  const testValue = 5;
  fireEvent.change(numjuegos, { target: { value: testValue } });
  expect(numjuegos).toBeInTheDocument(testValue);
})

test('Cantidad de Rondas change', () => {
  render(<CreatePartida/>);
  const numrondas = screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i);
  const testValue = 10;
  fireEvent.change(numrondas, { target: { value: testValue } });
  expect(numrondas).toBeInTheDocument(testValue);
})

test('Password change', () => {
  render(<CreatePartida/>);
  const password = screen.getByPlaceholderText(/Ingrese contraseña/i);
  const testValue = 'prueba';
  fireEvent.change(password, { target: { value: testValue } });
  expect(password).toBeInTheDocument(testValue);
})

test('el boton debe estar deshabilitado', () => {
  render(<CreatePartida />);
  const buttonEl = screen.getByText('Crear');
  expect(buttonEl).toBeDisabled();
});

test('Crear envia datos', () => {
  render(<CreatePartida/>);
  const buttonis = screen.getByText('Crear');
  const namepartida = screen.getByPlaceholderText(/Ingrese el nombre de la partida/i);
  const numjugadores = screen.getByPlaceholderText(/Ingrese la cantidad de jugadores/i);
  const numjuegos = screen.getByPlaceholderText(/Ingrese la cantidad de juegos/i);
  const numrondas = screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i);
  const password = screen.getByPlaceholderText(/Ingrese contraseña/i);
  const testPartida = 'p1';
  const testJuges = 2;
  const testJug = 5;
  const testRound = 100;
  const testPass = 'prueba1';
  fireEvent.change(namepartida, { target: { value: testPartida } });
  fireEvent.change(numjugadores, { target: { value: testJuges } });
  fireEvent.change(numjuegos, { target: { value: testJug } });
  fireEvent.change(numrondas, { target: { value: testRound } });
  fireEvent.change(password, { target: { value: testPass } });
  fireEvent.click(buttonis);
  expect(namepartida).toBeInTheDocument(testPartida);
  expect(numjugadores).toBeInTheDocument(testJuges);
  expect(numjuegos).toBeInTheDocument(testJug);
  expect(numrondas).toBeInTheDocument(testRound);
  expect(password).toBeInTheDocument(testPass);
})

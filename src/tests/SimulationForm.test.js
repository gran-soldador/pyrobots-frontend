import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import CreateSim from '../components/SimulationForm';

//Verifico que se encuentren los campos predeterminados
test('Estan los campos predeterminados?', () => {
  render(<CreateSim/>);
  const numround = screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i);
  const robots = screen.getByText("Seleccione sus robots:");
  expect(numround).toBeInTheDocument();
  expect(robots).toBeInTheDocument();
})

test('Las entradas están vacias al inicio?', () => {
  render(<CreateSim/>);
  const numround = screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i);
  expect(numround).toBeInTheDocument('123');
})

test('Registrar envia datos?', () => {
  render(<CreateSim/>);
  const buttonis = screen.getByText('Crear');
  const numround = screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i);
  const testnum = '123';
  fireEvent.change(numround, { target: { value: testnum } });
  fireEvent.click(buttonis);
  expect(numround).toBeInTheDocument(testnum);
})

test('Renderizar componentes async?', async () => {
  render(<CreateSim/>);
  const buttonis = screen.getByText('Crear');
  const numround = screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i);
  const testnum = 123;
  fireEvent.change(numround, { target: { value: testnum } });
  fireEvent.click(buttonis);
  expect(numround).toBeInTheDocument(testnum);
  expect(numround).toHaveValue(123);
})

test('debe avisar error del form', async () => {
  render(<CreateSim/>);
  const buttonis = screen.getByText('Crear');
  fireEvent.click(buttonis)

  await waitFor(() =>
    screen.getByText(
    "Debes seleccionar 2 robots como mínimo y 4 como máximo.")
  );
})
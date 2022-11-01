import React from 'react'
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react'
import userEvent from "@testing-library/user-event";
import CreateSim from '../components/SimulationForm';
import '@testing-library/jest-dom'

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
/*
test('muestra robots?', async () => {
  render(<CreateSim/>);
  const buttonis = screen.getByText('Crear');

  userEvent.click(screen.getByLabelText("Seleccione sus robots:"));
  // Click the entries you want to select
  fireEvent.click(screen.getByText("Viserys"));
  fireEvent.click(screen.getByText("SquareRobot"));
  // Close the select using Escape or Tab or clicking away
  fireEvent.keyDown(document.activeElement, {
    key: "Escape",
    code: "Escape"
  });

  expect(
    await screen.findByText(/Viserys/i)
  ).toBeInTheDocument();

  fireEvent.click(buttonis)
})*/
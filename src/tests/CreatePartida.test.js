import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import CreatePartida from '../components/CreatePartida'

//Verifico que se encuentren los campos predeterminados
test('Estan los campos predeterminados?', () => {
  render(<CreatePartida/>);
  const namepartida = screen.getByPlaceholderText(/Ingrese el nombre de la partida/i);
  const numjugadores = screen.getByPlaceholderText(/Ingrese la cantidad de jugadores/i);
  const numjuegos = screen.getByPlaceholderText(/Ingrese la cantidad de juegos/i);
  const numrondas = screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i);
  const password = screen.getByPlaceholderText(/Ingrese contraseña/i);
  expect(namepartida).toBeInTheDocument();
  expect(numjugadores).toBeInTheDocument();
  expect(numjuegos).toBeInTheDocument();
  expect(numrondas).toBeInTheDocument();
  expect(password).toBeInTheDocument();
})

//
test('Las entradas están vacias al inicio?', () => {
  render(<CreatePartida/>);
  const namepartida = screen.getByPlaceholderText(/Ingrese el nombre de la partida/i);
  const numjugadores = screen.getByPlaceholderText(/Ingrese la cantidad de jugadores/i);
  const numjuegos = screen.getByPlaceholderText(/Ingrese la cantidad de juegos/i);
  const numrondas = screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i);
  const password = screen.getByPlaceholderText(/Ingrese contraseña/i);
  expect(namepartida).toBeInTheDocument('hola');
  expect(numjugadores).toBeInTheDocument(2);
  expect(numjuegos).toBeInTheDocument(10);
  expect(numrondas).toBeInTheDocument(999);
  expect(password).toBeInTheDocument('');
})

// cambian los parámetros inválidos a válidos
test('Si las entradas estan llenas en boton de crear tiene que estar activo', () => {
  render(<CreatePartida/>);
  const namepartida = screen.getByPlaceholderText(/Ingrese el nombre de la partida/i);
  const numjugadores = screen.getByPlaceholderText(/Ingrese la cantidad de jugadores/i);
  const numjuegos = screen.getByPlaceholderText(/Ingrese la cantidad de juegos/i);
  const numrondas = screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i);
  const password = screen.getByPlaceholderText(/Ingrese contraseña/i);
  const buttonEl = screen.getByText('Crear');
  const testValue1 = 'pr6';
  const testValue2 = 5;
  const testValue3 = 5;
  const testValue4 = 10;
  const testValue5 = 'prueba';
  fireEvent.change(namepartida, { target: { value: testValue1 } });
  fireEvent.change(numjugadores, { target: { value: testValue2 } });
  fireEvent.change(numjuegos, { target: { value: testValue3 } });
  fireEvent.change(numrondas, { target: { value: testValue4 } });
  fireEvent.change(password, { target: { value: testValue5} });
  expect(namepartida).toBeInTheDocument(testValue1);
  expect(numjugadores).toBeInTheDocument(testValue2);
  expect(numjuegos).toBeInTheDocument(testValue3);
  expect(numrondas).toBeInTheDocument(testValue4);
  expect(password).toBeInTheDocument(testValue5);
  expect(buttonEl).toBeDisabled();
})

test('Crear envia datos?', () => {
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

test('Renderizar componentes async?', async () => { 
  render(<CreatePartida/>)
  const namepartida = screen.getByPlaceholderText(/Ingrese el nombre de la partida/i);
  const numjugadores = screen.getByPlaceholderText(/Ingrese la cantidad de jugadores/i);
  const numjuegos = screen.getByPlaceholderText(/Ingrese la cantidad de juegos/i);
  const numrondas = screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i);
  const password = screen.getByPlaceholderText(/Ingrese contraseña/i);

  const buttonis = screen.getByText('Crear');

  fireEvent.change(namepartida, { target: { value: 'partida' } });
  fireEvent.change(numjugadores, { target: { value: 6 } });
  fireEvent.change(numjuegos, { target: { value: 2 } });
  fireEvent.change(numrondas, { target: { value: 25 } });
  fireEvent.change(password, { target: { value: '123' } });

  fireEvent.click(buttonis);
  expect(namepartida).toBeInTheDocument();
  expect(numjugadores).toBeInTheDocument();
  expect(numjuegos).toBeInTheDocument();
  expect(numrondas).toBeInTheDocument();
  expect(password).toBeInTheDocument();

  expect(screen.getByPlaceholderText(/Ingrese el nombre de la partida/i)).toHaveValue('partida');
  expect(screen.getByPlaceholderText(/Ingrese la cantidad de jugadores/i)).toHaveValue(6);
  expect(screen.getByPlaceholderText(/Ingrese la cantidad de juegos/i)).toHaveValue(2);
  expect(screen.getByPlaceholderText(/Ingrese la cantidad de rondas/i)).toHaveValue(25);
  expect(screen.getByPlaceholderText(/Ingrese contraseña/i)).toHaveValue('123');
})

test('La carga se procesa bien?', async () => {
  render(<CreatePartida />);
  const buttonEl = screen.getByText('Crear');
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

  fireEvent.click(buttonEl);

  await waitFor(() => expect(buttonEl).not.toHaveTextContent(/Espere por favor/i));
});
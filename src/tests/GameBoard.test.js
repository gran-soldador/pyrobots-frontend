import { render, screen, fireEvent } from '@testing-library/react';
import GameBoard from '../components/GameBoard.jsx';

test('render del componente tablero', () => {
  render(<GameBoard />);
});

test('test click en el button de Simular ', () => {  
  // const {getByLabelText, queryAllByTestId} = render(<GameBoard />)
  render(<GameBoard />)
  const buttonSimulation = screen.getByRole("button", {name: /Simular/i});
  fireEvent.click(buttonSimulation);
});
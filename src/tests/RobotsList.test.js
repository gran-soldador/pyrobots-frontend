import React from 'react'
import mockAxios from "axios";
import { fireEvent, render, screen } from '@testing-library/react'
import RobotsList from '../components/RobotsList';


test('Renderizar componentes', () => {
  render(<RobotsList />);
  expect(screen.getByText(/Lista de robots/i)).toBeInTheDocument()
});

test('button actualizar lista', () => {
  render(<RobotsList />);
  const buttonis = screen.getByRole('button', { name: /Actualizar Lista/i });
  expect(buttonis).toBeInTheDocument();
});

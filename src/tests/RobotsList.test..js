import React from 'react'
import mockAxios from "axios";
import { render, screen } from '@testing-library/react'
import RobotsList from './components/RobotsList';
import Card from '../components/Card'


test('Renderizar componentes', () => {
  render(<RobotsList />);
  expect(screen.getByText(/Lista de robots/i)).toBeInTheDocument()
});

test('button actualizar lista', () => {
  render(<RobotsList />);
  const buttonis = screen.getByRole('button', { name: /Actualizar Lista/i });
  expect(buttonis).toBeInTheDocument();
});

test('renders learn react link', async () => {
  render(<RobotsList/>);
  mockAxios.get.mockResolvedValueOnce(() =>
    Promise.resolve({
      data: [
        {
          id: 1,
          nombre: 'Joe Doe',
          avatar: 'https://robohash.org/1'
        },
        {
          id: 2,
          nombre: 'Jane Doe',
          avatar: 'https://robohash.org/2'
        }]
    })
  )
  expect(mockAxios.get).toHaveBeenCalledTimes(0);
});

test('img?', () => {
  render(<Card />);
  const winner = screen.getAllByRole('img');
  expect(winner).toHaveLength(1);
});

test('name?', () => {
  render(<Card />);
  const winner = screen.getAllByRole('heading');
  expect(winner).toHaveLength(1);
});
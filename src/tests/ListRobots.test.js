import React from 'react'
import mockAxios from "axios";
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ListRobots from '../components/Cards'
import { waitForDebugger } from 'inspector';
import { joinPaths } from '@remix-run/router';

beforeEach(() => {
  render(<ListRobots />);
})

test('Renderizar componentes', () => {
  expect(screen.getByText(/Lista de robots/i)).toBeInTheDocument()
});

test('button actualizar lista', () => {
  const buttonis = screen.getByRole('button', { name: /Actualizar Lista/i });
  expect(buttonis).toBeInTheDocument();
});

test('renders learn react link', async () => {
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
  );
  expect(mockAxios.get).toHaveBeenCalledTimes(0);
});

// test('renders learn react link', async () => { 
//   screen.get.
// }); 
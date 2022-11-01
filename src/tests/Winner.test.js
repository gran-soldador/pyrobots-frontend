import React from 'react';
import { render, screen } from '@testing-library/react';
import Winner from '../components/Winner';


beforeEach(() => {
  render(<Winner />);
})

describe('Tests componente Winner', () => {
  test('se renderiza Ganador', () => {
    expect(screen.getByText(/Ganador/i)).toBeInTheDocument();
  });
  
  test('se renderiza pyrobots', () => {
    expect(screen.getByText(/pyrobots/i)).toBeInTheDocument();
  });

  test('se cargan los del usuario', async () => {
    const winner = await screen.findByText(/Ganador/i);
    const usuario = await screen.findByText(/Kevin2/i);
    expect(usuario).toBeInTheDocument();
    expect(winner).toBeInTheDocument();
  });

  test('se cargan los del usuario', async () => {
    const winner = await screen.findByText(/Ganador/i);
    const usuario = await screen.findByText(/Viserys/i);
    expect(usuario).toBeInTheDocument();
    expect(winner).toBeInTheDocument();
  });
})


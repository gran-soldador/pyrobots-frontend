import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Winner from '../components/Winner';
import fetchMock from "fetch-mock";


beforeEach(() => {
  render(<Winner />);
})

test('se renderiza Ganador', () => { 
    expect(screen.getByText(/Ganador/i)).toBeInTheDocument();
});

test('se renderiza pyrobots', () => { 
    expect(screen.getByText(/pyrobots/i)).toBeInTheDocument();
});


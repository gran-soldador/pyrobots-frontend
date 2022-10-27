import React from 'react'
import axiosMock from "axios";
import { render, screen, waitFor } from '@testing-library/react'
import ListRobots from '../components/Cards'
import { act } from 'react-dom/test-utils';

test('Renderizar componentes', () => {
  render(<ListRobots />)
  expect(screen.getByText(/Lista de robots/i)).toBeInTheDocument()
});

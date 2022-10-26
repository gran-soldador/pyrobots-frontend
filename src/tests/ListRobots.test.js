import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ListRobots from '../components/Cards'

test('Renderizar componentes', () => {
  render(<ListRobots />)
  expect(screen.getByText(/Lista de robots/i)).toBeInTheDocument()
})

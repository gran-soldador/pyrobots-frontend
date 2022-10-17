import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import ListPartidas from '../components/ListPartidas'

test('Renderizar componentes', () => {
  render(<ListPartidas />)
  
  expect(screen.getByText(/Lista de partidas/i)).toBeInTheDocument()
  expect(screen.getByText('#')).toBeInTheDocument()
  expect(screen.getByText('Nombre')).toBeInTheDocument()
  expect(screen.getByText('Status')).toBeInTheDocument()
  expect(screen.getByText('Cantidad de jugadores')).toBeInTheDocument()
  expect(screen.getByText('Cantidad de juegos')).toBeInTheDocument()
  expect(screen.getByText('Cantidad de rondas')).toBeInTheDocument()
  expect(screen.getByText('Participantes')).toBeInTheDocument()
  expect(screen.getByText('Creador')).toBeInTheDocument()
  expect(screen.getByText('Cantidad de juegos')).toBeInTheDocument()
})

test('Render emptylist', () => { 
  render(<ListPartidas />)
  expect(screen.getByText("No hay partidas disponibles")).toBeInTheDocument()
})

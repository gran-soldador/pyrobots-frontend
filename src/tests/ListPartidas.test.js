import React from "react";
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent, screen } from '@testing-library/react'
import ListPartidas from '../components/ListPartidas';

test('Renderizar componentes e input esperados', () => {
    // consulta sincrona de los campos de la tabla
    render(<ListPartidas/>)
    expect(screen.getByText('#')).toBeInTheDocument()
    expect(screen.getByText('Nombre')).toBeInTheDocument()
    expect(screen.getByText('Status')).toBeInTheDocument()
    expect(screen.getByText('Cantidad de jugadores')).toBeInTheDocument()
    expect(screen.getByText('Cantidad de juegos')).toBeInTheDocument()
    expect(screen.getByText('Cantidad de rondas')).toBeInTheDocument()
    expect(screen.getByText('participantes')).toBeInTheDocument()
    expect(screen.getByText('Creador')).toBeInTheDocument()
    expect(screen.getByText('Contraseña')).toBeInTheDocument()
})

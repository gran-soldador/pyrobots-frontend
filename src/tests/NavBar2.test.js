import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import NavBar2 from '../components/NavBar2';
import mockAxios from 'axios';

beforeEach(() => {
    render(<NavBar2 />);
})

describe('Tests componente NavBar_2', () => {
    test('Estan los campos predeterminados?', () => {
        const linkElement = screen.getByText(/Subir Robot/i);
        expect(linkElement).toBeInTheDocument();
        const linkElement2 = screen.getByText(/Crear Simulación/i);
        expect(linkElement2).toBeInTheDocument();
        const linkElement3 = screen.getByText(/Crear Partida/i);
        expect(linkElement3).toBeInTheDocument();
        const linkElement4 = screen.getByText(/Listar Partidas/i);
        expect(linkElement4).toBeInTheDocument();
        const linkElement6 = screen.getByText(/Ver perfil/i);
        expect(linkElement6).toBeInTheDocument();
    });
    
    test('Verificar que se muestre el perfil', async () => {
        const linkElement = screen.getByText(/Ver perfil/i);
        expect(linkElement).toBeInTheDocument();
        fireEvent.click(linkElement);
        const linkElement1 = screen.getByText(/Cambiar avatar/i);
        expect(linkElement1).toBeInTheDocument();
        const linkElement2 = screen.getByText(/Cambiar contraseña/i);
        expect(linkElement2).toBeInTheDocument();
        const linkElement3 = screen.getByText(/Cerrar sesión/i);
        expect(linkElement3).toBeInTheDocument();
        const linkElement4 = screen.getByText(/Mis robots/i);
        expect(linkElement4).toBeInTheDocument();
    });
    
    test('Modal cambiar avatar', async () => {
        const linkElement = screen.getByText(/Ver perfil/i);
        expect(linkElement).toBeInTheDocument();
        fireEvent.click(linkElement);
        const linkElement1 = screen.getByText(/Cambiar avatar/i);
        expect(linkElement1).toBeInTheDocument();
        fireEvent.click(linkElement1);
        const linkElement2 = screen.getByText(/Cambiar Avatar:/i);
        expect(linkElement2).toBeInTheDocument();
        const linkElement3 = screen.getByText(/Cancelar/i);
        expect(linkElement3).toBeInTheDocument();
    });
})
//Verifico que se encuentren los campos predeterminados
import React from 'react';
import { render, screen, fireEvent, waitFor  } from '@testing-library/react';

import '@testing-library/jest-dom/extend-expect'
import WS from "jest-websocket-mock";

import Lobby from '../components/Lobby';

test('Comprobar los botones...', async () => {
    render(<Lobby />)
    
    // Ver elementos duplicados.
    const botonUnirse = screen.getAllByTestId('boton-unirse');
    fireEvent.click(botonUnirse[0]);
    
    // Al clickear unirse, se abre un modal con estos campos:
    await waitFor(() => {
        screen.getAllByText("Contraseña")
        screen.getAllByText("Unirme a la partida")
        screen.getAllByText("Seleccione un robot:")
    });
});

test('Obtenemos el resultado del ws', async () => {
    const server = new WS('ws://localhost:8000/ws/' + localStorage.getItem('id_lobby'), {
      jsonProtocol: true
    });

    const client1 = new WebSocket('ws://localhost:8000/ws/' + localStorage.getItem('id_lobby'));
    await server.connected;
  
    const messages = {
      client1: [],
    };

    client1.onmessage = (e) => {
      messages.client1.push(e.data);
    };
  
    const msgtosend = [{event: "join", creador: "lautaro", contraseña: false, robot: [{"id": 1, "nombre": "Kempes", "usuario": "lautaro"}]}]
    
    server.send(msgtosend);
    expect(messages).toEqual({
      client1: [`[{"event":"join","creador":"lautaro","contraseña":false,"robot":[{"id":1,"nombre":"Kempes","usuario":"lautaro"}]}]`],
    });

});


test('Comprobar si se ha unido...', async () => {
    render(<Lobby />)

    const botonUnirse = screen.getAllByTestId('boton-unirse');
    fireEvent.click(botonUnirse[0]);

    const robotname = screen.getByTestId('robot-input');
    fireEvent.change(robotname, { target: { value: "Lautaro" } }) 

    const modalUnirmeBoton = screen.getAllByTestId('modal-unirme');
    fireEvent.click(modalUnirmeBoton[0]);
});

// test('Comprobar si aparece el boton abandonar...', async () => {
//   render(<Lobby />)

//   const botonUnirse = screen.getAllByTestId('boton-unirse');
//   fireEvent.click(botonUnirse[0]);

//   const abandonar = screen.getAllByText('Abandonar Sala');
// });
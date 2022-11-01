import React from 'react';
import { render, screen } from '@testing-library/react';
import Lobby from '../components/Lobby';
import '@testing-library/jest-dom/extend-expect'
import WS from "jest-websocket-mock";


beforeEach(() => {
  render(<Lobby />);
})

test('renders lobby', () => { 
    expect(screen.getByText('Robot')).toBeInTheDocument();
    expect(screen.getByText('Nombre')).toBeInTheDocument();
});

test('prueba: el servidor realiza un seguimiento de los mensajes recibidos y los muestra a medida que llegan', async () => {
  const server = new WS("ws://localhost:1234");
  const client = new WebSocket("ws://localhost:1234");
  await server.connected;
  client.send("hello");
  await expect(server).toReceiveMessage("hello");
  expect(server).toHaveReceivedMessages(["hello"]);
});

test('Se reciben los datos y se renderizan', async () => {
  const server = new WS('ws://localhost:8000/ws/' + localStorage.getItem('id_lobby'), {
    jsonProtocol: true
  });
  const client1 = new WebSocket('ws://localhost:8000/ws/' + localStorage.getItem('id_lobby'));
  await server.connected;
  const client2 = new WebSocket('ws://localhost:8000/ws/' + localStorage.getItem('id_lobby'));
  await server.connected;

  const messages = {
    client1: [],
    client2: []
  };
  client1.onmessage = (e) => {
    messages.client1.push(e.data);
  };
  client2.onmessage = (e) => {
    messages.client2.push(e.data);
  };

  const msgtosend = [{nickName: "Jugador1", Robot: '1'},{nickName: "Jugador2", Robot: '2'}]
  server.send(msgtosend);
  expect(messages).toEqual({
    client1: [`[{"nickName":"Jugador1","Robot":"1"},{"nickName":"Jugador2","Robot":"2"}]`],
    client2: [`[{"nickName":"Jugador1","Robot":"1"},{"nickName":"Jugador2","Robot":"2"}]`],
  });
})
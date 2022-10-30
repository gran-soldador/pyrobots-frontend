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

// test('fetches and displays data', async () => {
//     fetchMock.getOnce('http://localhost:8000/match-result/1', {
//       body: {
//         result: [
//           {
//             usuario: 'usuario1', robot: 'robot1', id: 1
//           },
//           {
//             usuario: 'usuario2', robot: 'robot2', id: 2
//           }
//         ]
//       },
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Access-Control-Allow-Origin': '*'
//       }
//     })
    
    
//     await waitFor(() => screen.getByLabelText('usuario1-robot1'))
    
//     expect(screen.getByText('usuario1')).toBeInTheDocument()
// });

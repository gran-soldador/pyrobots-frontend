import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import UploadBotForm from '../components/UploadBotForm'

test('Estan los campos predeterminados?', () => {
  render(<UploadBotForm/>);
  const namerobot = screen.getByPlaceholderText(/Ingrese el nombre del robot/i);
  const avatar = screen.getByText("Avatar del Robot (Opcional):");

  expect(namerobot).toBeInTheDocument();
  expect(avatar).toBeInTheDocument();
})


test('solo puedo enviar archivos .py', async () => {
  render(<UploadBotForm />)
  let file = new File(['(⌐□_□)'], 'picture.png', { type: 'image/png' });

  const fileInput = screen.getByTestId('test-file-py');
  fireEvent.change(fileInput, { target: { files: [file] } })

  const submitButton = screen.getByTestId("test-button")
  fireEvent.click(submitButton)

  await waitFor(() =>
    screen.getByText("Solo se permiten archivos con extension '.py'")
  );
})

test('solo puedo enviar archivos de imagenes', async () => {
    render(<UploadBotForm />)
    let file = new File(['(⌐□_□)'], 'picture.py', { type: 'aplication/py' });
  
    const fileInput = screen.getByTestId('test-file-image');
    fireEvent.change(fileInput, { target: { files: [file] } })
  
    const submitButton = screen.getByTestId("test-button")
    fireEvent.click(submitButton)
  
    await waitFor(() =>
      screen.getByText("Solo se permiten imagenes con extensiones .jpg .jpeg .jpe .jfif .gif .png")
    );
  })

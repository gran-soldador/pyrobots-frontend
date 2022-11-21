import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import ChangePassword from '../components/ChangePassword'

//Verifico que se encuentren los campos predeterminados
test('Estan los campos predeterminados?', () => {
    render(<ChangePassword/>);
    const current_password = screen.getByPlaceholderText(/Ingresa tu contraseña actual/i);
    const new_password = screen.getByPlaceholderText(/Ingrese la nueva contraseña/i);
    const conf_password = screen.getByPlaceholderText(/Confirmación de contraseña/i);
    const button_accept = screen.getAllByTestId('accept-button')[0];
    const button_cancel = screen.getAllByTestId('cancel-button')[0];

    expect(current_password).toBeInTheDocument();
    expect(new_password).toBeInTheDocument();
    expect(conf_password).toBeInTheDocument();
    expect(button_accept).toBeInTheDocument();
    expect(button_cancel).toBeInTheDocument();
})

test('Las entradas están vacias al inicio?', () => {
    render(<ChangePassword/>);
    const current_password = screen.getByPlaceholderText(/Ingresa tu contraseña actual/i);
    const new_password = screen.getByPlaceholderText(/Ingrese la nueva contraseña/i);
    const conf_password = screen.getByPlaceholderText(/Confirmación de contraseña/i);

    expect(current_password).toBeInTheDocument('12345678');
    expect(new_password).toBeInTheDocument('12345678');
    expect(conf_password).toBeInTheDocument('12345678');
})

test('Cambiar contraseña envia datos?', () => {
    render(<ChangePassword/>);
    const button_accept = screen.getAllByTestId('accept-button')[0];

    const current_password = screen.getByPlaceholderText(/Ingresa tu contraseña actual/i);
    const new_password = screen.getByPlaceholderText(/Ingrese la nueva contraseña/i);
    const conf_password = screen.getByPlaceholderText(/Confirmación de contraseña/i);

    const test_current_pass = '123456Aa!';
    const test_new_pass = 'Aa123456!';
    const test_conf_pass = 'Aa123456!';

    fireEvent.change(current_password, { target: { value: test_current_pass } });
    fireEvent.change(new_password, { target: { value: test_new_pass } });
    fireEvent.change(conf_password, { target: { value: test_conf_pass } });

    fireEvent.click(button_accept);

    expect(current_password).toBeInTheDocument(test_current_pass);
    expect(new_password).toBeInTheDocument(test_new_pass);
    expect(conf_password).toBeInTheDocument(test_conf_pass);
})

test('debe avisar error en formacion de password', async () => {
    render(<ChangePassword/>);
    const current_password = screen.getByPlaceholderText(/Ingresa tu contraseña actual/i);
    fireEvent.change(current_password, { target: { value: '12345678' } });
    expect(screen.getByPlaceholderText(/Ingresa tu contraseña actual/i)).toHaveValue('12345678');

    const button_accept = screen.getAllByTestId('accept-button')[0];
    fireEvent.click(button_accept)

await waitFor(() =>
    screen.getByText(
    "Debe contener minimo 1 Mayúscula, 1 Minúscula, 1 Número y 1 Caracter especial de los siguientes: !@#$%^&*-")
);
})

test('debe avisar error de confirmaciones', async () => {
    render(<ChangePassword/>)
    const new_password = screen.getByPlaceholderText(/Ingrese la nueva contraseña/i);
    const conf_password = screen.getByPlaceholderText(/Confirmación de contraseña/i);
  
    fireEvent.change(new_password, { target: { value: '123456Aa!' } });
    fireEvent.change(conf_password, { target: { value: 'Aa123456!' } });
  
    expect(screen.getByPlaceholderText(/Ingrese la nueva contraseña/i)).toHaveValue('123456Aa!');
    expect(screen.getByPlaceholderText(/Confirmación de contraseña/i)).toHaveValue('Aa123456!');
  
  
    const button_accept = screen.getAllByTestId('accept-button')[0];
    fireEvent.click(button_accept)
  
    await waitFor(() => {
        screen.getByText("La confirmación no coincide con la nueva contraseña.");
    });
  })

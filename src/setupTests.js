// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// src/setupTests.js
import { server } from './mocks/server.js'
// Establezca la simulación de API antes de todas las pruebas.
beforeAll(() => server.listen())

// Restablece cualquier controlador de solicitudes que podamos agregar durante las pruebas,
// para que no afecten a otras pruebas.
afterEach(() => server.resetHandlers())

// Limpiar después de terminar las pruebas.
afterAll(() => server.close())
import { cleanup, render, fireEvent, screen } from '@testing-library/react';
import { afterEach, describe, it } from 'vitest';

import SignupFormModal from 'src/layouts/dashboard/signup-form-modal';

describe('Signup test:', () => {
  afterEach(cleanup);

  it('should render a signup button', () => {
    render(<SignupFormModal />);
    screen.getByText('Registrarme');
  });

  it('should open a signup form', () => {
    render(<SignupFormModal />);
    const boton = screen.getByText('Registrarme');
    fireEvent.click(boton);
    screen.getByText('Registro de usuario ✨');
  });

  it('should validate the inputs formats', () => {
    render(<SignupFormModal />);
    const boton = screen.getByText('Registrarme');
    fireEvent.click(boton);

    const validations = [
      {
        inputLabel: 'Correo electronico',
        value: 'emailincorrecto.com',
        errorMessage: 'Ingresa un email válido, ej. susanita@gmail.com',
      },
      {
        inputLabel: 'Alias de usuario',
        value: 'Jua',
        errorMessage:
          'Puede contener solo letras (mayúsculas y minúsculas) y números, minimo 4 caracteres.',
      },
      {
        inputLabel: 'Contraseña',
        value: 'Pass1',
        errorMessage:
          'Debe contener al menos una letra mayúscula y puedes usar letras y números, minimo 6 caracteres.',
      },
    ];

    for (const validation of validations) {
      const inputEmail = screen.getByLabelText(validation.inputLabel);
      fireEvent.change(inputEmail, { target: { value: validation.value } });
      expect(inputEmail.value).toBe(validation.value);
      screen.getByText(validation.errorMessage);
    }
  });
});

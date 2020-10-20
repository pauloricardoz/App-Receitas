import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import TelaLogin from '../Pages/TelaLogin';

test('renderiza caixa de texto do email', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <TelaLogin />
    </MemoryRouter>,
  );
  const inputEmail = getByTestId('email-input');
  expect(inputEmail).toBeInTheDocument();
});

test('renderiza caixa de texto para senha', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <TelaLogin />
    </MemoryRouter>,
  );
  const inputPassword = getByTestId('password-input');
  expect(inputPassword).toBeInTheDocument();
});

test('renderiza o botão para login', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <TelaLogin />
    </MemoryRouter>,
  );
  const loginButton = getByTestId('login-submit-btn');
  expect(loginButton).toBeInTheDocument();
});

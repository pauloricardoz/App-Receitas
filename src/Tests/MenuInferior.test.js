import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import MenuInferior from '../Components/MenuInferior';

test('renderiza link com imagem food', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <MenuInferior />
    </MemoryRouter>,
  );
  const foodButtom = getByTestId('food-bottom-btn');
  expect(foodButtom).toBeInTheDocument();
});

test('renderiza link com imagem explore', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <MenuInferior />
    </MemoryRouter>,
  );
  const exploreButtom = getByTestId('explore-bottom-btn');
  expect(exploreButtom).toBeInTheDocument();
});

test('renderiza link com imagem drink', () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <MenuInferior />
    </MemoryRouter>,
  );
  const drinkButtom = getByTestId('drinks-bottom-btn');
  expect(drinkButtom).toBeInTheDocument();
});

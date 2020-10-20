import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import BarraBusca from '../Components/Barra de Busca - Header/BarraBuscaHeader';

describe('testando arquivo Header', () => {
  test('renderiza link com imagem Perfil', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BarraBusca />
      </MemoryRouter>,
    );
    const HeaderProfile = getByTestId('profile-top-btn');
    expect(HeaderProfile).toBeInTheDocument();
  });

  test('renderiza o titulo com o nome da página', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BarraBusca />
      </MemoryRouter>,
    );
    const HeaderName = getByTestId('page-title');
    expect(HeaderName).toBeInTheDocument();
  });

  test('renderiza imagem da lupa de busca', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BarraBusca />
      </MemoryRouter>,
    );
    const HeaderLupa = getByTestId('search-top-btn');
    expect(HeaderLupa).toBeInTheDocument();
  });
});

describe('testando arquivo Search', () => {
  test('renderiza input search', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BarraBusca />
      </MemoryRouter>,
    );
    const HeaderLupa = getByTestId('search-top-btn');
    fireEvent.click(HeaderLupa);
    const HeaderSearch = getByTestId('search-input');
    expect(HeaderSearch).toBeInTheDocument();
  });
});

describe('testando arquivo Options', () => {
  test('renderiza radio ingredientes', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BarraBusca />
      </MemoryRouter>,
    );
    const HeaderLupa = getByTestId('search-top-btn');
    fireEvent.click(HeaderLupa);
    const HeaderIngredientesRadio = getByTestId('ingredient-search-radio');
    expect(HeaderIngredientesRadio).toBeInTheDocument();
  });

  test('renderiza radio nome', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BarraBusca />
      </MemoryRouter>,
    );
    const HeaderLupa = getByTestId('search-top-btn');
    fireEvent.click(HeaderLupa);
    const HeaderNameRadio = getByTestId('name-search-radio');
    expect(HeaderNameRadio).toBeInTheDocument();
  });

  test('renderiza radio primeira letra', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BarraBusca />
      </MemoryRouter>,
    );
    const HeaderLupa = getByTestId('search-top-btn');
    fireEvent.click(HeaderLupa);
    const HeaderFirstLetterRadio = getByTestId('first-letter-search-radio');
    expect(HeaderFirstLetterRadio).toBeInTheDocument();
  });
});

describe('testando arquivo ButtonBuscar', () => {
  test('renderiza botão Buscar', () => {
    const { getByTestId } = render(
      <MemoryRouter>
        <BarraBusca />
      </MemoryRouter>,
    );
    const HeaderLupa = getByTestId('search-top-btn');
    fireEvent.click(HeaderLupa);
    const HeaderButton = getByTestId('exec-search-btn');
    expect(HeaderButton).toBeInTheDocument();
  });
});

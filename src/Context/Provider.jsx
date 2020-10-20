import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ReceitasContext from './ReceitasContext';
import {
  searchCockTailByName,
  searchCockTailByLetter,
  searchCockTailByIngredient,
} from '../Services/ApiBebida';
import {
  ApiSearchMealByName,
  ApiSearchByFirstLetter,
  ApiSearchByMainIngredient,
} from '../Services/ApiComida';

function noElements(arr) {
  if (!arr) {
    window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    return null;
  }
  return arr.length === 0
    ? window.alert('Sinto muito, não encontramos nenhuma receita para esses filtros.')
    : null;
}

export function filterComidas(title, optionsValue, searchValue, setReceitas, setIsFetching) {
  if (optionsValue === 'primeiraLetra') {
    if (searchValue.length !== 1) {
      window.alert('Sua busca deve conter somente 1 (um) caracter');
      return null;
    }
    ApiSearchByFirstLetter(searchValue)
      .then((ListaComidasPelaPrimeiraLetra) => {
        setReceitas(ListaComidasPelaPrimeiraLetra);
        noElements(ListaComidasPelaPrimeiraLetra);
      })
      .then(() => {
        setIsFetching(true);
      });
  } else if (optionsValue === 'ingrediente') {
    ApiSearchByMainIngredient(searchValue)
      .then((ListaComidasPorIngrediente) => {
        setReceitas(ListaComidasPorIngrediente);
        noElements(ListaComidasPorIngrediente);
      })
      .then(() => {
        setIsFetching(true);
      });
  } else if (optionsValue === 'nome') {
    ApiSearchMealByName(searchValue)
      .then((ListaComidasPeloNome) => {
        setReceitas(ListaComidasPeloNome);
        noElements(ListaComidasPeloNome);
      })
      .then(() => {
        setIsFetching(true);
      });
  }
  return null;
}

function filterBebidas(title, optionsValue, searchValue, setReceitas, setIsFetching) {
  if (optionsValue === 'primeiraLetra') {
    if (searchValue.length !== 1) {
      window.alert('Sua busca deve conter somente 1 (um) caracter');
      return null;
    }
    searchCockTailByLetter(searchValue)
      .then((ListaBebidasPelaPrimeiraLetra) => {
        setReceitas(ListaBebidasPelaPrimeiraLetra);
        noElements(ListaBebidasPelaPrimeiraLetra);
      })
      .then(() => {
        setIsFetching(true);
      });
  } else if (optionsValue === 'ingrediente') {
    searchCockTailByIngredient(searchValue)
      .then((ListaBebidasPorIngrediente) => {
        setReceitas(ListaBebidasPorIngrediente);
        noElements(ListaBebidasPorIngrediente);
      })
      .then(() => {
        setIsFetching(true);
      });
  } else if (optionsValue === 'nome') {
    searchCockTailByName(searchValue)
      .then((ListaBebidasPeloNome) => {
        setReceitas(ListaBebidasPeloNome);
        noElements(ListaBebidasPeloNome);
      })
      .then(() => {
        setIsFetching(true);
      });
  }
  return null;
}

function setupRecom(searchValue, setReceitas, setIsFetching, setSugestFood, setSugestDrink) {
  searchCockTailByName('')
    .then((ListaBebidasPeloNome) => {
      setSugestDrink(ListaBebidasPeloNome.slice(0, 6));
    })
    .then(() => {
      setIsFetching(true);
    });

  ApiSearchMealByName('')
    .then((ListaComidasPeloNome) => {
      setSugestFood(ListaComidasPeloNome.slice(0, 6));
    })
    .then(() => {
      setIsFetching(true);
    });
}

function funcBusca1(tipo, ingrediente, title, setReceitas, setIsFetching) {
  if (tipo === 'comidas') {
    filterComidas(title, 'ingrediente', ingrediente, setReceitas, setIsFetching);
  } else {
    filterBebidas(title, 'ingrediente', ingrediente, setReceitas, setIsFetching);
  }
  return null;
}
/* const funcBusca = (tipo, ingrediente) => {
    temp1 = tipo === 'comidas'
        ? filterComidas(title, 'ingrediente', ingrediente, setReceitas, setIsFetching)
        : filterBebidas(title, 'ingrediente', ingrediente, setReceitas, setIsFetching);
  }; */

function UseFilterOut(title, optionsValue, searchValue, setReceitas, setIsFetching) {
  if (title === 'comidas') {
    filterComidas(title, optionsValue, searchValue, setReceitas, setIsFetching);
  }
  if (title === 'bebidas') {
    filterBebidas(title, optionsValue, searchValue, setReceitas, setIsFetching);
  }
}
export default function Provider(props) {
  const [isFetching, setIsFetching] = useState(false);
  const [receitas, setReceitas] = useState([]);
  const [optionsValue, setOptionsValue] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [changeFilter, setchangeFilter] = useState(0);
  const [title, setTitle] = useState('');
  const [sugestDrink, setSugestDrink] = useState([]);
  const [sugestFood, setSugestFood] = useState([]);
  const [redirecionado, setRedirecionado] = useState(false);
  const [email, setEmail] = useState('');
  const funcBusca = (tipo, ingrediente) =>
    funcBusca1(tipo, ingrediente, title, setReceitas, setIsFetching);
  const state = {
    isFetching,
    receitas,
    optionsValue,
    searchValue,
    changeFilter,
    title,
    sugestDrink,
    sugestFood,
    email,
    setIsFetching,
    setReceitas,
    setOptionsValue,
    setSearchValue,
    setchangeFilter,
    setTitle,
    setSugestDrink,
    setSugestFood,
    setEmail,
    funcBusca,
    redirecionado,
    setRedirecionado,
  };
  useEffect(() => {
    setupRecom(searchValue, setReceitas, setIsFetching, setSugestFood, setSugestDrink);
  }, []);
  useEffect(() => {
    UseFilterOut(title, optionsValue, searchValue, setReceitas, setIsFetching);
  }, [changeFilter]);
  return <ReceitasContext.Provider value={state}>{props.children}</ReceitasContext.Provider>;
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

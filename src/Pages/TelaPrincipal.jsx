import React, { useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import MenuInferior from '../Components/MenuInferior';
import BarraBuscaHeader from '../Components/Barra de Busca - Header/BarraBuscaHeader';
import ListReceitas from '../Components/ListReceitas';
import ReceitasContext from '../Context/ReceitasContext';
import {
  ApiSearchMealByName,
  searchMealByCategory,
  searchMealCategory,
} from '../Services/ApiComida';
import {
  searchCockTailByCategory,
  searchCockTailByName,
  searchCockTailCategory,
} from '../Services/ApiBebida';
import '../CSS/TelaPrincipal.css';

function TemReceira(receitas, tipo, id, automaticRedirection) {
  if (typeof receitas !== 'object' || !receitas) return null;
  if (receitas.length === 1 && automaticRedirection) {
    return <Redirect to={`/${tipo}/${receitas[0][id]}`} />;
  } else if (receitas.length === 0) {
    return null;
  }
  return (
    <div>
      <ListReceitas />
    </div>
  );
}
async function filterButton(setCategorias, tipo) {
  if (tipo === 'comidas') {
    await searchMealCategory().then((el) =>
      setCategorias(['All', ...el.filter((_, i) => i < 5).map((e) => e.strCategory)]),
    );
  } else {
    await searchCockTailCategory().then((el) =>
      setCategorias(['All', ...el.filter((_, i) => i < 5).map((e) => e.strCategory)]),
    );
  }
}
function receitasBasicas(setReceitas, tipo) {
  if (tipo === 'comidas') {
    ApiSearchMealByName('').then((el) => setReceitas(el));
  } else {
    searchCockTailByName('').then((el) => setReceitas(el));
  }
}
function filtraCategoria(tipo, selecCat, setReceitas) {
  if (tipo === 'comidas') {
    searchMealByCategory(selecCat).then((el) => {
      setReceitas(el);
    });
  } else {
    searchCockTailByCategory(selecCat).then((el) => setReceitas(el));
  }
}
function updateClicks(selecCat, setReceitas, tipo) {
  if (selecCat === '') {
    receitasBasicas(setReceitas, tipo);
  } else {
    filtraCategoria(tipo, selecCat, setReceitas);
  }
}
export default function TelaPrincipal(props) {
  
  const { receitas, setReceitas, redirecionado, setRedirecionado } = useContext(ReceitasContext);
  const [categorias, setCategorias] = useState([]);
  const [selecCat, setSelecCat] = useState('');
  const [automatic, setAutomatic] = useState(false);
  const tipo = /comida/.test(props.match.path) ? 'comidas' : 'bebidas';
  const id = tipo === 'comidas' ? 'idMeal' : 'idDrink';
  useEffect(() => {
    if (!redirecionado) {
      receitasBasicas(setReceitas, tipo);
    }
    filterButton(setCategorias, tipo);
  }, [tipo]);
  useEffect(() => {
    if (!redirecionado) {
      updateClicks(selecCat, setReceitas, tipo);
    }
    setRedirecionado(false);
  }, [selecCat, tipo]);
  useEffect(() => () => setSelecCat(''), [tipo]);
  return (
    <div>
      <BarraBuscaHeader title={tipo} automatic={setAutomatic} />
      <div className="bottonBlock">
        {categorias.map((el) => (
          <button
            onClick={(e) => {
              if (e.target.innerText === 'All' || e.target.innerText === selecCat) {
                setSelecCat('');
              } else {
                setSelecCat(e.target.innerText);
              }
            }}
            data-testid={`${el}-category-filter`}
            className="yellowPrincipal"
          >
            {el}
          </button>
        ))}
      </div>
      {TemReceira(receitas, tipo, id, automatic)}
      <MenuInferior />
    </div>
  );
}

TelaPrincipal.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

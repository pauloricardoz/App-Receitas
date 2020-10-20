import React, { useEffect, useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MenuInferior from '../Components/MenuInferior';
import BarraHeader from '../Components/Barra de Busca - Header/Header';
import CardIngredient from '../Components/cards/CardIngredient';
import { searchMealsByListOfIngredient } from '../Services/ApiComida';
import { searchCockTailByListOfIngredient } from '../Services/ApiBebida';
import Context from '../Context/ReceitasContext';
import '../CSS/ListReceitas.css';

function startList(tipo, setLista) {
  if (tipo === 'comidas') {
    searchMealsByListOfIngredient().then((resposta) => {
      if (!resposta) {
        return null;
      }
      return setLista(resposta);
    });
  } else {
    searchCockTailByListOfIngredient().then((resposta) => {
      if (!resposta) {
        return null;
      }
      return setLista(resposta);
    });
  }
}

export default function TelaExplorarIngredientes(props) {
  const { funcBusca, setRedirecionado } = useContext(Context);
  const tipo = /comida/.test(props.match.path) ? 'comidas' : 'bebidas';
  const [lista, setLista] = useState([]);
  useEffect(() => {
    startList(tipo, setLista);
  }, []);
  if (typeof lista !== 'object') {
    return null;
  }
  return (
    <div>
      <BarraHeader title={'Explorar Ingredientes'} showTop="true" />
      <div className="listReceitas marginTop">
        {!lista ? null : lista
          .filter((_, index) => index < 12)
          .map((el, index) => {
            const ingrediente = tipo === 'comidas' ? el.strIngredient : el.strIngredient1;
            return (
              <Link
                className="receitaLink" to={`/${tipo}`}
                onClick={() => {
                  if (tipo === 'comidas') {
                    funcBusca(tipo, ingrediente);
                  } else {
                    funcBusca(tipo, ingrediente);
                  }
                  setRedirecionado(true);
                }}
              >
                <CardIngredient
                  index={index} title={tipo === 'comidas' ? ingrediente : el.strIngredient1}
                  image={
                    tipo === 'comidas'
                      ? `https://www.themealdb.com/images/ingredients/${el.strIngredient}-Small.png`
                      : `https://www.thecocktaildb.com/images/ingredients/${el.strIngredient1}-Small.png `
                  }
                />
              </Link>
            );
          })}
      </div>
      <MenuInferior />
    </div>
  );
}

TelaExplorarIngredientes.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

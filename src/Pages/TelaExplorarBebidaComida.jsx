import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { searchMealRandom } from '../Services/ApiComida';
import { searchCockTailRandom } from '../Services/ApiBebida';
import MenuInferior from '../Components/MenuInferior';
import BarraHeader from '../Components/Barra de Busca - Header/Header';
import '../CSS/TelaExplorarBebidaComida.css';

export default function TelaExplorarBebidaComida(props) {
  const [exploreSurpriseMeal, setExploreSurpriseMeal] = useState(undefined);
  const [exploreSurpriseCockTail, setExploreSurpriseCockTail] = useState(undefined);
  useEffect(() => {
    searchMealRandom().then((resposta) => {
      if (!resposta) return null;
      return setExploreSurpriseMeal(resposta[0].idMeal);
    });
  }, []);
  useEffect(() => {
    searchCockTailRandom().then((resposta) => {
      if (!resposta) return null;
      return setExploreSurpriseCockTail(resposta[0].idDrink);
    });
  }, []);

  return /comidas/.test(props.match.path) ? (
    <div>
      <BarraHeader title={'Explorar Comidas'} showTop="true" />
      <div className="explorarBCBuddy">
        <Link to="/explorar/comidas/ingredientes">
          <button className="buttonBC" data-testid="explore-by-ingredient">Por Ingredientes</button>
        </Link>
        <Link to="/explorar/comidas/area">
          <button className="buttonBC" data-testid="explore-by-area">Por Local de Origem</button>
        </Link>
        <Link to={`/comidas/${exploreSurpriseMeal}`}>
          <button className="buttonBC" data-testid="explore-surprise">Me Surpreenda!</button>
        </Link>
      </div>
      <MenuInferior />
    </div>
  ) : (
    <div>
      <BarraHeader title={'Explorar Bebidas'} showTop="true" />
      <div className="explorarBCBuddy">
        <Link to="/explorar/bebidas/ingredientes">
          <button className="buttonBC" data-testid="explore-by-ingredient">Por Ingredientes</button>
        </Link>
        <Link to={`/bebidas/${exploreSurpriseCockTail}`}>
          <button className="buttonBC" data-testid="explore-surprise">Me Surpreenda!</button>
        </Link>
      </div>
      <MenuInferior />
    </div>
  );
}

TelaExplorarBebidaComida.propTypes = {
  match: PropTypes.objectOf(PropTypes.object).isRequired,
};

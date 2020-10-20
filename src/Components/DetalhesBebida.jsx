import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Card from './CardRecomend.jsx';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import { funcIngredients, convertFavorite, CopyURL } from './DetalhesComida';

/* export function loopIndex(indexArr, IndexAtual) {
  let index = indexArr;
  if (indexArr < 0) index = 5;
  return index % 6 === IndexAtual % 6;
} */

function fotoPrincipal(details) {
  return (
    <img
      src={details.strDrinkThumb}
      alt={details.strDrink}
      className="recipe-photo"
      data-testid="recipe-photo"
    />
  );
}

function ReverseArrayFoto(sugestFood, indexRecom, setIndexRecom, location) {
  if (indexRecom < 0) {
    setIndexRecom(5);
    return (
      sugestFood
        /* .filter((_, index) => index === 5 % 6 || loopIndex(index - 1, 5))
      .reverse() */
        .map((item, index) => (
          <Card
            key={item.strMeal}
            title={item.strMeal}
            index={index}
            source={item.strMealThumb}
            show={indexRecom}
            location={location}
          />
        ))
    );
  }
  return (
    sugestFood
      /*  .filter((_, index) => index === indexRecom % 6 || loopIndex(index - 1, indexRecom)) */
      .map((item, index) => (
        <Card
          key={item.strMeal}
          title={item.strMeal}
          index={index}
          source={item.strMealThumb}
          show={indexRecom}
          location={location}
          id={item.idMeal}
        />
      ))
  );
}
function isAlcoholic(details) {
  return details.strAlcoholic.indexOf('Alcoholic') >= 0 ? 'Alcoholic' : '';
}

function funcLinks(details, favority, setFavority, copy, copiador) {
  return (
    <div className="campoTitle">
      <h1 className="recipe-title" data-testid="recipe-title">
        {details.strDrink}
      </h1>
      <Link onClick={() => convertFavorite(details, setFavority)}>
        <img
          src={favority ? blackHeart : whiteHeart}
          alt="like icon"
          className="icon"
          data-testid="favorite-btn"
        />
      </Link>
      <div className="shareDescripiton">
        <Link
          onClick={() => {
            copiador(true);
            CopyURL();
          }}
          className="shareDescripiton"
        >
          <img src={shareIcon} alt="like icon" className="icon" data-testid={'share-btn'} />
        </Link>
        {copy ? <span>Link copiado!</span> : null}
      </div>
    </div>
  );
}

export default function Detalhes(props) {
  const [favority, setFavority] = useState(false);
  const [copy, copiador] = useState(false);
  const {
    details,
    favoriteRecipes,
    status,
    indexRecom,
    setIndexRecom,
    sugestFood,
    idDaReceita,
    location,
  } = props;
  useEffect(() => {
    setFavority(favoriteRecipes);
  }, []);
  const ingredientes = funcIngredients([], details);
  const Alcoholic = isAlcoholic(details);
  return (
    <div>
      {fotoPrincipal(details)}
      <div className="DetelhesBuddy">
        {funcLinks(details, favority, setFavority, copy, copiador)}
        <h5 className="recipe-category" data-testid="recipe-category">
          {`${details.strCategory}-${Alcoholic}`}
        </h5>
        <h3 className="subTitle">Ingredients</h3>
        <ul className="yellowCampDetalhes">
          {' '}
          {ingredientes.map((item, index) => (
            <li key={item.ingrediente} data-testid={`${index}-ingredient-name-and-measure`}>
              {item.ingrediente}- {item.quantidade}
            </li>
          ))}
        </ul>
        <h3 className="subTitle">Instructions:</h3>
        <p className="yellowCampDetalhes" data-testid="instructions">
          {details.strInstructions}
        </p>
        <h3 className="subTitle">Recomendações</h3>
        <div className="recomendation-container">
          <div onClick={() => setIndexRecom(indexRecom - 1)} className="recomendation-button">
            {'<'}
          </div>
          {ReverseArrayFoto(sugestFood, indexRecom, setIndexRecom, location)}
          <div onClick={() => setIndexRecom(indexRecom + 1)} className="recomendation-button">
            {'>'}
          </div>
        </div>
      </div>
      {status === 'done' ? null : (
        <Link to={`/bebidas/${idDaReceita}/in-progress`}>
          <button data-testid="start-recipe-btn" className="start-recipe-btn">
            {status === 'nothing' ? 'Inicia Receita' : 'Continuar Receita'}
          </button>
        </Link>
      )}
    </div>
  );
}

Detalhes.propTypes = {
  details: propTypes.instanceOf(Object).isRequired,
  favoriteRecipes: propTypes.func.isRequired,
  status: propTypes.string.isRequired,
  indexRecom: propTypes.number.isRequired,
  setIndexRecom: propTypes.func.isRequired,
  sugestFood: propTypes.arrayOf(propTypes.instanceOf(Object)).isRequired,
  idDaReceita: propTypes.number.isRequired,
  location: propTypes.string.isRequired,
};

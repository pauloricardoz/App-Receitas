import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import '../CSS/TelaReceitaProcesso.css';
import { convertFoodDone } from './DetalhesComida';
import { fotoPrincipal, addFavorite } from './NewProcessoFunctions';

export function convertFavorite(details, setFavority) {
  let type = 'Drink';

  if (details.idMeal) {
    type = 'Meal';
  }
  const saida = {
    id: details[`id${type}`],
    type: type === 'Drink' ? 'bebida' : 'comida',
    category: details.strCategory,
    alcoholicOrNot: type === 'Meal' ? '' : 'Alcoholic',
    name: details[`str${type}`],
    image: details[`str${type}Thumb`],
    area: details.strArea !== undefined ? details.strArea : '',
  };
  addFavorite(saida, setFavority);
  return saida;
}
// HA https://www.codegrepper.com/code-examples/basic/copy+string+to+clipboard+javascript
export function CopyURL() {
  const endereco = window.location.toString();
  const index = endereco.indexOf('/in-progress');
  window.navigator.clipboard.writeText(endereco.substring(0, index));
}

function funcLinks(details, favority, setFavority, copiador, copy) {
  let title = details.strMeal;
  if (details.strDrink) title = details.strDrink;
  return (
    <div className="campoTitle">
      <h1 className="recipe-title" data-testid="recipe-title">
        {title}
      </h1>
      <Link onClick={() => convertFavorite(details, setFavority)}>
        <img
          src={favority ? blackHeart : whiteHeart}
          alt="like icon"
          className="icon"
          data-testid="favorite-btn"
        />
      </Link>
      <Link
        onClick={() => {
          copiador(true);
          CopyURL();
        }}
      >
        <img src={shareIcon} alt="like icon" className="icon" data-testid={'share-btn'} />
      </Link>
      {copy ? <span>Link copiado!</span> : null}
    </div>
  );
}

function createBasicLocal(details) {
  const type = details.idMeal ? 'Meal' : 'Drink';
  const chave = details.idMeal ? 'meals' : 'cocktails';
  if (localStorage.getItem('inProgressRecipes') === null) {
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {}, cocktails: {} }));
  }
  return { type, chave };
}

function teste(details) {
  const { type, chave } = createBasicLocal(details);
  const localSAtual = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!localSAtual[chave][details[`id${type}`]]) return [];
  const ingredientes = localSAtual[chave][details[`id${type}`]];
  return ingredientes;
}
function funcIngredientsChecks(used, details, i) {
  return used.includes(details[`strIngredient${i}`]);
}
export function funcIngredients(ingredients, detalhes) {
  const used = teste(detalhes);
  for (let i = 1; i < 20; i += 1) {
    if (
      detalhes[`strIngredient${i}`] !== null &&
      detalhes[`strIngredient${i}`] !== '' &&
      detalhes[`strIngredient${i}`] !== undefined
    ) {
      ingredients.push({
        ingrediente: detalhes[`strIngredient${i}`],
        quantidade: detalhes[`strMeasure${i}`],
        checked: funcIngredientsChecks(used, detalhes, i),
      });
    }
  }
  return ingredients;
}

function updateUsedIngredients(details, setDone, novosIngredientes) {
  const { type, chave } = createBasicLocal(details);
  const localSAtual = JSON.parse(localStorage.getItem('inProgressRecipes'));
  if (!localSAtual[chave][details[`id${type}`]]) return [];
  const ingredientes = localSAtual[chave][details[`id${type}`]];

  if (ingredientes.length === novosIngredientes.length) {
    setDone(true);
  }
  return ingredientes;
}

function changeStorage(details, final) {
  const { type, chave } = createBasicLocal(details);
  const localSAtual = JSON.parse(localStorage.getItem('inProgressRecipes'));
  const elements = document.getElementsByClassName('ingredient-step');
  localSAtual[chave][details[`id${type}`]] = [];

  let total = 0;
  let used = 0;
  for (let i = 0; i < elements.length; i += 1) {
    total += 1;
    if (elements[i].checked === true) {
      localSAtual[chave][details[`id${type}`]].push(elements[i].id);
      used += 1;
    }
  }
  if (total === used) {
    final(true);
  }
  localStorage.setItem('inProgressRecipes', JSON.stringify(localSAtual));
}

function InputCheck(props) {
  const { item, action, details, setDone } = props;
  if (!item.checked) {
    return (
      <input
        type="checkbox"
        className="ingredient-step"
        id={item.ingrediente}
        onClick={() => {
          action(details, setDone);
        }}
      />
    );
  }
  return (
    <input
      type="checkbox"
      className="ingredient-step"
      id={item.ingrediente}
      onClick={() => {
        action(details, setDone);
      }}
      checked
    />
  );
}
InputCheck.propTypes = {
  item: propTypes.instanceOf(Object).isRequired,
  action: propTypes.func.isRequired,
  details: propTypes.instanceOf(Object).isRequired,
  setDone: propTypes.func.isRequired,
};

function moveToDone(details) {
  const { type, chave } = createBasicLocal(details);
  const localSAtual = JSON.parse(localStorage.getItem('inProgressRecipes'));
  delete localSAtual[chave][details[`id${type}`]];
  localStorage.setItem('inProgressRecipes', JSON.stringify(localSAtual));
  const temp = convertFoodDone(details, type);
  if (localStorage.getItem('doneRecipes') === null) {
    localStorage.setItem('doneRecipes', JSON.stringify([]));
  }
  const doneAtual = JSON.parse(localStorage.getItem('doneRecipes'));
  doneAtual.push(temp);
  

  localStorage.setItem('doneRecipes', JSON.stringify(doneAtual));
}

function Botao(props) {
  const { habilita, details } = props;
  return (
    <Link to={'/receitas-feitas'}>
      <button
        data-testid="finish-recipe-btn"
        className="finish-recipe-btn"
        disabled={!habilita}
        onClick={() => moveToDone(details)}
      >
        Finalizar receita
      </button>
    </Link>
  );
}
Botao.propTypes = {
  habilita: propTypes.bool.isRequired,
  details: propTypes.instanceOf(Object).isRequired,
};

export default function Detalhes(props) {
  const { details, favoriteRecipes } = props;
  const [used, setDone] = useState(false);
  const [copy, copiador] = useState(false);
  const [favority, setFavority] = useState(false);
  useEffect(() => setFavority(favoriteRecipes), []);
  const [usedIngredients, setUsed] = useState([]);
  const novosIngredientes = funcIngredients([], details);
  useEffect(() => setUsed(updateUsedIngredients(details, setDone, novosIngredientes)), []);
  return (
    <div>
      {fotoPrincipal(details)}
      <div className="DetelhesBuddy">
        {funcLinks(details, favority, setFavority, copiador, copy)}
        <h5 className="recipe-category" data-testid="recipe-category">
          {details.strCategory}
        </h5>
        <h3 className="subTitle">Ingredients</h3>
        <ul className="yellowCampProcesso">
          {novosIngredientes.map((item) => (
            <div data-testid="0-ingredient-step">
              <InputCheck
                item={item}
                /* used={usedIngredients} */
                action={changeStorage}
                details={details}
                setDone={setDone}
              />
              <label htmlFor={item.ingrediente}>
                {item.ingrediente}- {item.quantidade}
              </label>
            </div>
          ))}
        </ul>
        <h3 className="subTitle">Instructions:</h3>
        <p className="yellowCampProcesso" data-testid="instructions">
          {details.strInstructions}
        </p>
      </div>
      <Botao habilita={novosIngredientes.every((el) => el.checked)} details={details} />
    </div>
  );
}

Detalhes.propTypes = {
  details: propTypes.instanceOf(Object).isRequired,
  favoriteRecipes: propTypes.func.isRequired,
};

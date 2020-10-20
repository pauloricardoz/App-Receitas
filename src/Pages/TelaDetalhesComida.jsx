import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';
import { searchMealById } from '../Services/ApiComida';
import context from '../Context/ReceitasContext';
import DetalhesComida from '../Components/DetalhesComida';
import '../CSS/TelaDetalhes.css';
import { Link } from 'react-router-dom';

export function done(setStatus, id) {
  let doneVar = localStorage.getItem('doneRecipes');
  if (doneVar) {
    doneVar = JSON.parse(doneVar);
    doneVar = doneVar.find((el) => el.id === id);
    if (doneVar) {
      return setStatus('done');
    }
  }
  return null;
}
export function favoriteRecipes(setFavoriteRecipes, id) {
  let favoriteRecipesVar = localStorage.getItem('favoriteRecipes');
  if (favoriteRecipesVar) {
    favoriteRecipesVar = JSON.parse(favoriteRecipesVar);
    favoriteRecipesVar = favoriteRecipesVar.find((el) => el.id === id);
    if (favoriteRecipesVar) {
      return setFavoriteRecipes(true);
    }
  }
  setFavoriteRecipes(false);
  return null;
}
function inProgressRecipes(setStatus, id, tipo) {
  let inProgressRecipesVar = localStorage.getItem('inProgressRecipes');
  if (inProgressRecipesVar) {
    inProgressRecipesVar = JSON.parse(inProgressRecipesVar)[tipo];
    inProgressRecipesVar = inProgressRecipesVar[id];
    if (inProgressRecipesVar) {
      return setStatus('inProgressRecipes');
    }
  }
  return null;
}
export function updateStatus(id, setStatus, setFavoriteRecipes, tipo) {
  done(setStatus, id);
  favoriteRecipes(setFavoriteRecipes, id);
  inProgressRecipes(setStatus, id, tipo);
  return null;
}
export default function TelaDetalhesComida(props) {
  const { sugestDrink } = useContext(context);
  const [details, setDetails] = useState(undefined);
  const [indexRecom, setIndexRecom] = useState(0);
  const [status, setStatus] = useState('nothing');
  const [favorite, setFavorite] = useState(false);
  const { id_da_receita: idDaReceita } = props.match.params;
  useEffect(() => {
    searchMealById(idDaReceita).then((resposta) => {
      if (!resposta) {
        return null;
      }
      return setDetails(resposta[0]);
    });
    updateStatus(idDaReceita, setStatus, setFavorite, 'meals');
  }, []);
  if (!details) {
    return <h1>Carregando</h1>;
  }
  return (
    <div>
      <Link onClick={()=>props.history.goBack()} className="voltarLink">VOLTAR</Link>
      <DetalhesComida
        details={details}
        favoriteRecipes={favorite}
        status={status}
        indexRecom={indexRecom}
        setIndexRecom={setIndexRecom}
        sugestDrink={sugestDrink}
        idDaReceita={idDaReceita}
        location={props.location}
      />
    </div>
  );
}
TelaDetalhesComida.propTypes = {
  match: propTypes.shape({ params: propTypes.number.isRequired }).isRequired,
  location: propTypes.string.isRequired,
};

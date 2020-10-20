import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import { searchMealById } from '../Services/ApiComida';
import { searchCockTailById } from '../Services/ApiBebida';
import { favoriteRecipes } from './TelaDetalhesComida';
import NewProcesso from '../Components/NewProcesso';
import '../CSS/TelaReceitaProcesso.css';

export function updateStatus(id, setFavoriteRecipes) {
  favoriteRecipes(setFavoriteRecipes, id);
  return null;
}
export default function TelaProcesso(props) {
  const [details, setDetails] = useState(undefined);
  const [favorite, setFavorite] = useState(false);
  const { id_da_receita: idDaReceita } = props.match.params;
  useEffect(() => {
    if (props.location.pathname.includes('comida')) {
      searchMealById(idDaReceita).then((resposta) => {
        if (!resposta) {
          return null;
        }
        return setDetails(resposta[0]);
      });
    } else {
      searchCockTailById(idDaReceita).then((resposta) => {
        if (!resposta) {
          return null;
        }
        return setDetails(resposta[0]);
      });
    }
    updateStatus(idDaReceita, setFavorite, 'meals');
  }, []);
  if (!details) {
    return <h1>Carregando . . .</h1>;
  }
  return <NewProcesso details={details} favoriteRecipes={favorite} idDaReceita={idDaReceita} />;
}
TelaProcesso.propTypes = {
  match: propTypes.shape({ params: propTypes.number.isRequired }).isRequired,
  location: propTypes.string.isRequired,
};

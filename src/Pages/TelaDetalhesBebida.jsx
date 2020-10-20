import React, { useEffect, useState, useContext } from 'react';
import propTypes from 'prop-types';
import { searchCockTailById } from '../Services/ApiBebida';
/* import blackHeart from '../images/blackHeartIcon.svg';
import whiteHeart from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import Card from '../Components/CardRecomend.jsx'; */
import context from '../Context/ReceitasContext';
import DetalhesBebida from '../Components/DetalhesBebida';
import { updateStatus } from './TelaDetalhesComida';
import '../CSS/TelaDetalhes.css';
import { Link } from 'react-router-dom';

export default function TelaDetalhesBebida(props) {
  const { sugestFood } = useContext(context);
  const [details, setDetails] = useState(undefined);
  const [indexRecom, setIndexRecom] = useState(0);
  const [status, setStatus] = useState('nothing');
  const [favorite, setFavoriteRecipes] = useState(false);
  const { id_da_receita: idDaReceita } = props.match.params;
  useEffect(() => {
    searchCockTailById(idDaReceita).then((resposta) => {
      setDetails(resposta[0]);
    });
    updateStatus(idDaReceita, setStatus, setFavoriteRecipes, 'cocktails');
  }, []);
  if (!details) {
    return <h1>Carregando</h1>;
  }
  return (
    <div>
      <Link onClick={() => props.history.goBack()} className="voltarLink">
        VOLTAR
      </Link>
      <DetalhesBebida
        details={details}
        favoriteRecipes={favorite}
        status={status}
        indexRecom={indexRecom}
        setIndexRecom={setIndexRecom}
        sugestFood={sugestFood}
        idDaReceita={idDaReceita}
        match={props.match}
        location={props.location}
      />
    </div>
  );
}

TelaDetalhesBebida.propTypes = {
  match: propTypes.shape({ params: propTypes.number.isRequired }).isRequired,
  location: propTypes.string.isRequired,
};

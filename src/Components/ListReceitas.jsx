import React, { useContext, useEffect, useState } from 'react';
import ReceitasContext from '../Context/ReceitasContext';
import Receita from './Receita';
import '../CSS/ListReceitas.css';

export default function ListReceitas() {
  const { receitas } = useContext(ReceitasContext);
  const [novasReceitas, setNovasReceitas] = useState([]);
  useEffect(
    () => (receitas === null || receitas === undefined ? null : setNovasReceitas(receitas)),
    [receitas],
  );
  if (receitas === undefined || receitas === null || typeof receitas !== 'object') {
    return <h1>Loading...</h1>;
  }
  if (novasReceitas === undefined || novasReceitas === null || typeof novasReceitas !== 'object') {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="listReceitas">
      {!novasReceitas
        ? null
        : novasReceitas
            .filter((_, index) => index < 12)
            .map((receita, index) => (
              <Receita
                receita={receita}
                index={index}
                key={receita.idMeal ? receita.idMeal : receita.idDrink}
              />
            ))}
    </div>
  );
}

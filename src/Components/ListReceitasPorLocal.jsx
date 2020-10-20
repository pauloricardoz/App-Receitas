import React from 'react';
import PropTypes from 'prop-types';
import Receita from './Receita';

export default function ListReceitas(props) {
  const { receitas } = props;
  if (!receitas) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="listReceitas">
      {receitas
        .filter((_, index) => index < 12)
        .map((receita, index) => (
          <Receita receita={receita} index={index} />
        ))}
    </div>
  );
}

ListReceitas.propTypes = {
  receitas: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.object])).isRequired,
};

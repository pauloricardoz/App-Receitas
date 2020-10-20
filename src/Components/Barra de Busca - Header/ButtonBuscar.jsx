import React, { useContext } from 'react';
import propTypes from 'prop-types';
import ReceitasContext from '../../Context/ReceitasContext';

export default function ButtonBuscar(props) {
  const { setchangeFilter, changeFilter } = useContext(ReceitasContext);

  return (
    <div>
      <button
        data-testid="exec-search-btn"
        className="Button-buscar"
        onClick={() => {
          props.automatic(true);
          setchangeFilter(changeFilter + 1);
        }}
      >
        Buscar
      </button>
    </div>
  );
}

ButtonBuscar.propTypes = { automatic: propTypes.bool.isRequired };

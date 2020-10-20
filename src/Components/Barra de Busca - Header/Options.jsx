import React, { useContext } from 'react';
import ReceitasContext from '../../Context/ReceitasContext';

export default function Options() {
  const { setOptionsValue } = useContext(ReceitasContext);

  return (
    <div className="search-radio">
      <div>
        <input
          id="ingrediente"
          key="ingrediente"
          data-testid="ingredient-search-radio"
          type="radio"
          value="ingrediente"
          name="options"
          onChange={() => setOptionsValue('ingrediente')}
        />
        <label htmlFor="ingrediente">Ingrediente</label>
      </div>
      <div>
        <input
          id="nome"
          key="nome"
          data-testid="name-search-radio"
          type="radio"
          value="nome"
          name="options"
          onChange={() => setOptionsValue('nome')}
        />
        <label htmlFor="nome">Nome</label>
      </div>
      <div>
        <input
          id="primeiraLetra"
          key="primeiraLetra"
          data-testid="first-letter-search-radio"
          type="radio"
          value="primeiraLetra"
          name="options"
          onChange={() => setOptionsValue('primeiraLetra')}
        />
        <label htmlFor="primeiraLetra">Primeira letra</label>
      </div>
    </div>
  );
}

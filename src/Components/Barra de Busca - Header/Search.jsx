import React, { useContext } from 'react';
import ReceitasContext from '../../Context/ReceitasContext';

export default function Search() {
  const { setSearchValue } = useContext(ReceitasContext);

  return (
    <input
      data-testid="search-input"
      className="search-input"
      type="text"
      onChange={(event) => setSearchValue(event.target.value)}
    />
  );
}

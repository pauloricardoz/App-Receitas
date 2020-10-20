import React, { useEffect, useState } from 'react';
import { searchMealFilterArea, searchMealArea, ApiSearchMealByName } from '../Services/ApiComida';
import MenuInferior from '../Components/MenuInferior';
import BarraBuscaHeader from '../Components/Barra de Busca - Header/BarraBuscaHeader';
import ListReceitasPorLocal from '../Components/ListReceitasPorLocal';
import '../CSS/TelaExplorarLocal.css';
import ListReceitas from '../Components/ListReceitasPorLocal';

function filterLocate(filtroDeLocais, setLocalSelect) {
  const localizações = ['All', ...filtroDeLocais];
  return (
    <div>
      <select
        data-testid="explore-by-area-dropdown"
        type="ComboBox"
        className="localização"
        name="localização"
        onChange={(event) => setLocalSelect(event.target.value)}
      >
        {localizações.map((area) => (
          <option data-testid={`${area}-option`} key={area}>
            {area}
          </option>
        ))}
      </select>
    </div>
  );
}

function TemReceira(receitas) {
  if (!receitas) return null;
  return (
    <div>
      <ListReceitasPorLocal receitas={receitas} />
    </div>
  );
}
export default function TelaExplorarLocal() {
  const [filtroDeLocais, setfiltroDeLocais] = useState([]);
  const [lista, setLista] = useState([]);
  const [localSelect, setLocalSelect] = useState('All');
  const [explorarLocal, setExplorarLocal] = useState(undefined);
  useEffect(() => {
    searchMealFilterArea().then((resposta) => {
      if (!resposta) return null;
      const areas = resposta.map((res) => res.strArea);
      return setfiltroDeLocais(areas);
    });
    ApiSearchMealByName('').then((el) => setLista(el));
  }, []);
  useEffect(() => {
    searchMealArea(localSelect).then((resposta) => {
      if (!resposta) return null;
      return setExplorarLocal(resposta);
    });
  }, [localSelect]);
  return (
    <div>
      <BarraBuscaHeader title={'Explorar Origem'} />
      {filterLocate(filtroDeLocais, setLocalSelect)}
      {localSelect !== 'All' ? TemReceira(explorarLocal) : <ListReceitas receitas={lista} />}
      <MenuInferior />
    </div>
  );
}

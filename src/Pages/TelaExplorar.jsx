import React from 'react';
import { Link } from 'react-router-dom';
import MenuInferior from '../Components/MenuInferior';
import BarraHeader from '../Components/Barra de Busca - Header/Header';
import '../CSS/TelaExplorar.css';

export default function TelaExplorar() {
  return (
    <div>
      <BarraHeader title={'Explorar'} showTop="true" />
      <div className="buddy-explore">
        <Link to="/explorar/comidas" data-testid="explore-food" id="explorarComidas">
          <button className="explore-btn">Explorar Comidas</button>
        </Link>
        <Link to="/explorar/bebidas" data-testid="explore-drinks" id="explorarBebidas">
          <button className="explore-btn">Explorar Bebidas</button>
        </Link>
      </div>
      <MenuInferior />
    </div>
  );
}

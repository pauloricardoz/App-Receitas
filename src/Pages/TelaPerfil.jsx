import React from 'react';
import { Link } from 'react-router-dom';
import MenuInferior from '../Components/MenuInferior';
import BarraHeader from '../Components/Barra de Busca - Header/Header';
import '../CSS/TelaPerfil.css';

export default function TelaPerfil() {
  let email = JSON.parse(localStorage.getItem('user'));
  email = !email ? { email: '' } : email;
  return (
    <div>
      <BarraHeader title={'Perfil'} showTop="true" />
      <div className="buddy-perfil">
        <p className="profile-email" data-testid="profile-email">
          {email.email}
        </p>
        <Link to="/receitas-feitas" data-testid="profile-done-btn" id="receitasFeitas">
          <button className="profile-btn">Receitas Feitas</button>
        </Link>
        <Link to="/receitas-favoritas" data-testid="profile-favorite-btn" id="receitasFavoritas">
          <button className="profile-btn">Receitas Favoritas</button>
        </Link>
        <Link to="/" data-testid="profile-logout-btn" id="Sair">
          <button className="profile-logout-btn" onClick={() => localStorage.clear()}>
            Sair
          </button>
        </Link>
      </div>
      <MenuInferior />
    </div>
  );
}

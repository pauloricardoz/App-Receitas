import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import userLogo from '../../images/profileIcon.svg';
import searchLogo from '../../images/searchIcon.svg';
import ReceitasContext from '../../Context/ReceitasContext';
import '../../CSS/HeaderBusca.css';

function firstUpCase(texto = '') {
  let palavras = texto.split(' ');
  palavras = palavras.map((palavra) => {
    const first = palavra[0].toUpperCase();
    const rest = palavra.slice(1);
    return first + rest;
  });
  return palavras.join(' ');
}

export default function HeaderBusca(props) {
  const { showSearch, setShowSearch, title, showTop } = props;
  const { setTitle } = useContext(ReceitasContext);
  useEffect(() => {
    setTitle(title);
  }, [title]);
  const newTitle = firstUpCase(title);

  return (
    <div className="Bar-Busca-Header">
      <Link to="/perfil" className="Top-Btn">
        <img src={userLogo} alt="Imagem User" data-testid="profile-top-btn" />
      </Link>
      <div data-testid="page-title" className="Bar-Busca-Header-text">
        <span>{newTitle}</span>
      </div>
      <div style={{visibility: showTop?'hidden':'visible'}} className="Top-Btn">
        <Link onClick={() => setShowSearch(!showSearch)} className="Top-Btn">
          <img src={searchLogo} alt="Search Logo" data-testid="search-top-btn" />
        </Link>
      </div>
    </div>
  );
}

HeaderBusca.propTypes = {
  title: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
  setShowSearch: PropTypes.func.isRequired,
  showTop: PropTypes.bool.isRequired,
};

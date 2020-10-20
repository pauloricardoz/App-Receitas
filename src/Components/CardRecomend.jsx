import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function Card(props) {
  const { title, index, source, show, location, id } = props;
  let visible = false;
  if (index % 6 === show % 6 || index === (show + 1) % 6) {
    visible = true;
  }
  const tipo = /bebidas/.test(location.pathname) ? 'comidas' : 'bebidas';

  return (
    <div className="recomendation-card" style={visible ? null : { display: 'none' }}>
      <Link to={`/${tipo}/${id}`} className="recomendation-card">
        <img
          src={source}
          alt=""
          data-testid={`${index}-recomendation-card`}
          style={{ width: '100%' }}
        />
        <p className="recomendation-title" data-testid={`${index}-recomendation-title`}>
          {title}
        </p>
      </Link>
    </div>
  );
}

Card.propTypes = {
  title: propTypes.string.isRequired,
  index: propTypes.number.isRequired,
  source: propTypes.string.isRequired,
  show: propTypes.number.isRequired,
  location: propTypes.string.isRequired,
  id: propTypes.number.isRequired,
};

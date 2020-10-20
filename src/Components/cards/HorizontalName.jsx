import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';

export default function HorizontalName(props) {
  const { index, item } = props;
  const { type, name } = item;
  return (
    <Link className="nomeCard" to={`/${type}s/${item.id}`}>
      <p data-testid={`${index}-horizontal-name`}>{name}</p>
    </Link>
  );
}
HorizontalName.propTypes = {
  index: propTypes.number.isRequired,
  item: propTypes.instanceOf(Object).isRequired,
};

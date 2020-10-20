import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';

export default function ImageTop(props) {
  const { id, type, name, image } = props.item;
  const { index } = props;
  return (
    <Link to={`/${type}s/${id}`}>
      <img
        className="horizontal-image"
        src={image}
        alt={name}
        data-testid={`${index}-horizontal-image`}
      />
    </Link>
  );
}

ImageTop.propTypes = {
  index: propTypes.number.isRequired,
  item: propTypes.instanceOf(Object).isRequired,
};

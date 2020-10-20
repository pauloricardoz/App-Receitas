import React from 'react';
import propTypes from 'prop-types';

export default function Tags(props) {
  const { index, tagName } = props;
  return (
    <div>
      <p data-testid={`${index}-${tagName}-horizontal-tag`}>{tagName}</p>
    </div>
  );
}

Tags.propTypes = {
  index: propTypes.number.isRequired,
  tagName: propTypes.string.isRequired,
};

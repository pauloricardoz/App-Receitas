import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import blackHeart from '../images/blackHeartIcon.svg';
import HorizontalName from './cards/HorizontalName';
import ShareOption from './cards/ShareButton';
import ImageTop from './cards/ImageTop';

// HA https://www.codegrepper.com/code-examples/basic/copy+string+to+clipboard+javascript
export function CopyURL(address) {
  window.navigator.clipboard.writeText(address);
}

export function desFavorite(id) {
  let favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
  favorite = favorite.filter((el) => el.id !== id);
  localStorage.setItem('favoriteRecipes', JSON.stringify(favorite));
}

export default function CardFavorite(props) {
  const { id, type, area, category, alcoholicOrNot } = props.item;
  const { index, item } = props;
  const [copy, setCopy] = useState(false);
  const isMeal = type === 'comida';
  return (
    <div className="receitaCard">
      <ImageTop item={item} index={index} />
      <div className="buddyCard">
        <div className="textCard">
          {isMeal ? (
            <p data-testid={`${index}-horizontal-top-text`}>{`${area} - ${category}`}</p>
          ) : (
            <p data-testid={`${index}-horizontal-top-text`}>{alcoholicOrNot}</p>
          )}
          <ShareOption index={index} copy={copy} item={item} setCopy={setCopy} />
          <Link onClick={() => desFavorite(id)}>
            <img
              src={blackHeart}
              alt="like icon"
              className="icon"
              data-testid={`${index}-horizontal-favorite-btn`}
            />
          </Link>
          <HorizontalName item={item} index={index} />
        </div>
      </div>
    </div>
  );
}

CardFavorite.propTypes = {
  index: propTypes.number.isRequired,
  item: propTypes.instanceOf(Object).isRequired,
};

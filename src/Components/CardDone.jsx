import React, { useState } from 'react';
import propTypes from 'prop-types';
import Tags from './tagDone';
import HorizontalName from './cards/HorizontalName';
import ShareOption from './cards/ShareButton';
import ImageTop from './cards/ImageTop';

// HA https://www.codegrepper.com/code-examples/basic/copy+string+to+clipboard+javascript
export function CopyURL(address) {
  window.navigator.clipboard.writeText(address);
}
export default function CardDone(props) {
  const { type, area, category, alcoholicOrNot, doneDate, tags } = props.item;
  const { index, item } = props;
  const [copy, setCopy] = useState(false);
  const isMeal = type === 'comida';
  return (
    <div className="receitaCard">
      <ImageTop item={item} index={index} />
      <div className="buddyCard">
        <div className="textCard">
          {isMeal ? (
            <p data-testid={`${index}-horizontal-top-text`}>{`(${area} - ${category})`}</p>
          ) : (
            <p data-testid={`${index}-horizontal-top-text`}>({alcoholicOrNot})</p>
          )}
          <HorizontalName item={item} index={index} />
          <ShareOption index={index} copy={copy} item={item} setCopy={setCopy} />
        </div>
        <div className="feitaCard">
          <span className="feitaCard">Feita em: </span>{' '}
          <span data-testid={`${index}-horizontal-done-date`}>{doneDate}</span>
        </div>
        {isMeal ? tags.map((tagName) => <Tags tagName={tagName} index={index} />) : null}
      </div>
    </div>
  );
}

CardDone.propTypes = {
  index: propTypes.number.isRequired,
  item: propTypes.instanceOf(Object).isRequired,
};

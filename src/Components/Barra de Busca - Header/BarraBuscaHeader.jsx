import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import Search from './Search';
import Options from './Options';
import ButtonBuscar from './ButtonBuscar';

export default function BarraBuscaHeader(props) {
  const [showSearch, setShowSearch] = useState(false);
  const update = () => {
    setShowSearch(!showSearch);
  };
  return (
    <div className="Bar-Busca-Header-column">
      <Header title={props.title} setShowSearch={update} showSearch={showSearch} />
      <div className="search">
        {showSearch ? <Search /> : null}
        {showSearch ? <Options /> : null}
        {showSearch ? <ButtonBuscar automatic={props.automatic} /> : null}
      </div>
    </div>
  );
}

BarraBuscaHeader.propTypes = {
  title: PropTypes.string.isRequired,
  automatic: PropTypes.bool.isRequired,
};

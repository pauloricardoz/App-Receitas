import React from 'react';
import { Link } from 'react-router-dom';
import mealIcon from '../images/mealIcon.svg';
import exploreIcon from '../images/exploreIcon.svg';
import drinkIcon from '../images/drinkIcon.svg';
import '../CSS/MenuInferior.css';

export default function MenuInferior() {
  return (
    <footer className="footer" data-testid="footer">
      <Link to="/comidas" className="footerBottom">
        <img
          data-testid="food-bottom-btn"
          alt="food"
          src={mealIcon}
        />
      </Link>
      <Link to="/explorar" className="footerBottom">
        <img
          data-testid="explore-bottom-btn"
          alt="explore"
          src={exploreIcon}
        />
      </Link>
      <Link to="/bebidas" className="footerBottom">
        <img
          data-testid="drinks-bottom-btn"
          alt="drink"
          src={drinkIcon}
        />
      </Link>
    </footer>
  );
}

import React from 'react';

export function fotoPrincipal(details) {
  let title = details.strMeal;
  let foto = details.strMealThumb;
  if (details.strDrink) {
    title = details.strDrink;
    foto = details.strDrinkThumb;
  }
  return <img src={foto} alt={title} className="recipe-photo" data-testid="recipe-photo" />;
}

export function addFavorite(receita, setFavorite) {
  let oFav = localStorage.getItem('favoriteRecipes');
  if (!oFav) {
    setFavorite(true);
    return localStorage.setItem('favoriteRecipes', JSON.stringify([receita]));
  }
  oFav = [...JSON.parse(oFav)];
  if (oFav.find((el) => el.id === receita.id)) {
    setFavorite(false);
    return localStorage.setItem(
      'favoriteRecipes',
      JSON.stringify(oFav.filter((el) => el.id !== receita.id)),
    );
  }
  const temp = [...oFav, receita];
  setFavorite(true);
  return localStorage.setItem('favoriteRecipes', JSON.stringify(temp));
}

export const ApiSearchMealByName = (name) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`).then((response) =>
    response
      .json()
      .then((meal) => meal.meals)
      .catch((error) => error),
  )
);

export const ApiSearchByFirstLetter = (letter) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`).then((response) =>
    response
      .json()
      .then((meal) => meal.meals)
      .catch((error) => error),
  )
);

export const ApiSearchByMainIngredient = (mainIngredient) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${mainIngredient}`).then(
    (response) =>
      response
        .json()
        .then((meal) => meal.meals)
        .catch((error) => error),
  )
);

export const searchMealsByListOfIngredient = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list').then(
    (response) => response
      .json()
      .then((list) => list.meals)
      .catch((error) => error),
  )
);

export const searchMealById = (id) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then((response) =>
    response
      .json()
      .then((meal) => meal.meals)
      .catch((error) => error),
  )
);

export const searchMealRandom = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/random.php').then((response) =>
    response
      .json()
      .then((meal) => meal.meals)
      .catch((error) => error),
  )
);

export const searchMealFilterArea = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list').then((response) =>
    response
      .json()
      .then((meal) => meal.meals)
      .catch((error) => error),
  )
);

export const searchMealArea = (area) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`).then((response) =>
    response
      .json()
      .then((meal) => meal.meals)
      .catch((error) => error),
  )
);

export const searchMealCategory = () => (
  fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list').then((response) =>
    response
      .json()
      .then((meal) => meal.meals)
      .catch((error) => error),
  )
);
export const searchMealByCategory = (cat) => (
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${cat}`).then((response) =>
    response
      .json()
      .then((meal) => meal.meals)
      .catch((error) => error),
  )
);

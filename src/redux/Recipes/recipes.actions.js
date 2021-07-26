import recipesTypes from "./recipes.types";

export const defaultRecipesStart = (apiEndpoint) => ({
  type: recipesTypes.DEFAULT_RECIPES_START,
  payload: apiEndpoint,
});

export const setRecipes = (data) => ({
  type: recipesTypes.SET_RECIPES,
  payload: data,
});

export const defaultSpecialsStart = (apiEndpoint) => ({
  type: recipesTypes.DEFAULT_SPECIALS_START,
  payload: apiEndpoint,
});

export const setSpecials = (data) => ({
  type: recipesTypes.SET_SPECIALS,
  payload: data,
});

export const apiLoaded = (status) => ({
  type: recipesTypes.API_LOADED,
  payload: status,
});

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

export const recipeUpdateStart = (recipe, apiEndpoint) => ({
  type: recipesTypes.RECIPE_UPDATE_START,
  payload: { recipe: recipe, apiEndpoint: apiEndpoint },
});

export const apiChanged = (status) => ({
  type: recipesTypes.API_CHANGED,
  payload: status,
});

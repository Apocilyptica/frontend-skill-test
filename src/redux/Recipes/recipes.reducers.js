import recipesTypes from "./recipes.types";

const INITIAL_STATE = {
  recipes: [],
  specials: [],
  apiLoaded: false,
  apiChanged: false,
  defaultLocalHost: "3001",
};

const recipesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case recipesTypes.SET_RECIPES:
      return {
        ...state,
        recipes: action.payload,
      };
    case recipesTypes.SET_SPECIALS:
      return {
        ...state,
        specials: action.payload,
      };
    case recipesTypes.API_LOADED:
      return {
        ...state,
        apiLoaded: action.payload,
      };
    case recipesTypes.API_CHANGED:
      return {
        ...state,
        apiChanged: action.payload,
      };
    default:
      return state;
  }
};

export default recipesReducer;

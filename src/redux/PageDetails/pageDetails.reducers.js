import pageDetailsTypes from "./pageDetails.types";

const INITIAL_STATE = {
  title: "Page Title",
  description: "Description",
  recipe: {},
  recipeSet: false,
};

const pageDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case pageDetailsTypes.SET_CURRENT_PAGE_DETAILS:
      return {
        title: action.payload.title,
        description: action.payload.description,
        recipeSet: false,
      };
    case pageDetailsTypes.SET_CURRENT_PATH_ARRAY:
      return {
        ...state,
        pathArray: action.payload,
      };
    case pageDetailsTypes.UPDATE_CURRENT_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };
    case pageDetailsTypes.SET_CURRENT_RECIPE:
      return {
        ...state,
        recipe: action.payload,
        recipeSet: true,
      };
    default:
      return state;
  }
};

export default pageDetailsReducer;

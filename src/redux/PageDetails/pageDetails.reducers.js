import pageDetailsTypes from "./pageDetails.types";

const INITIAL_STATE = {
  title: "Page Title",
  description: "Description",
  otherProps: {},
};

const pageDetailsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case pageDetailsTypes.SET_CURRENT_PAGE_DETAILS:
      return {
        ...state,
        title: action.payload.title,
        description: action.payload.description,
        otherProps: action.payload,
      };
    case pageDetailsTypes.SET_CURRENT_PATH_ARRAY:
      return {
        ...state,
        pathArray: action.payload,
      };
    case pageDetailsTypes.UPDATE_CURRENT_RECIPE:
      return {
        ...state,
        otherProps: action.payload,
      };
    default:
      return state;
  }
};

export default pageDetailsReducer;

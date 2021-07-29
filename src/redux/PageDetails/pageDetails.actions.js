import pageDetailsTypes from "./pageDetails.types";

export const setPageDetails = (details) => ({
  type: pageDetailsTypes.SET_CURRENT_PAGE_DETAILS,
  payload: details,
});

export const setPathArray = (array) => ({
  type: pageDetailsTypes.SET_CURRENT_PATH_ARRAY,
  payload: array,
});

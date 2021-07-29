import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./User/user.reducers";
import styleReducer from "./Styles/styles.reducers";
import recipesReducer from "./Recipes/recipes.reducers";
import pageDetailsReducer from "./PageDetails/pageDetails.reducers";

export const rootReducer = combineReducers({
  user: userReducer,
  style: styleReducer,
  recipes: recipesReducer,
  currentPage: pageDetailsReducer,
});

const configStorage = {
  key: "root",
  storage,
  whitelist: ["user", "recipes", "style"],
};

export default persistReducer(configStorage, rootReducer);

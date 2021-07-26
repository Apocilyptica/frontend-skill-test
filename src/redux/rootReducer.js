import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./User/user.reducers";
import styleReducer from "./Styles/styles.reducers";
import recipesReducer from "./Recipes/recipes.reducers";

export const rootReducer = combineReducers({
  user: userReducer,
  style: styleReducer,
  recipes: recipesReducer,
});

const configStorage = {
  key: "root",
  storage,
  whitelist: ["user"],
};

export default persistReducer(configStorage, rootReducer);

import { all, call } from "redux-saga/effects";

import userSagas from "./User/user.sagas";
import recipesSagas from "./Recipes/recipes.sagas";

export default function* rootSaga() {
  yield all([call(userSagas), call(recipesSagas)]);
}

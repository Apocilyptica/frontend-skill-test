import recipesTypes from "./recipes.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import axios from "axios";
import { setRecipes, setSpecials } from "./recipes.actions";

export function* recipeUpdate({ payload }) {
  try {
    yield axios.patch(`${payload.apiEndpoint}/${payload.recipe.uuid}`, payload.recipe).then((response) => response.data);
    const data = yield axios.get(payload.apiEndpoint).then((response) => response.data);

    yield put(setRecipes(data));
  } catch (error) {
    console.log(error);
  }
}

export function* onRecipeUpdateStart() {
  yield takeLatest(recipesTypes.RECIPE_UPDATE_START, recipeUpdate);
}
export function* defaultRecipes({ apiEndpoint }) {
  try {
    const data = yield axios.get(apiEndpoint).then((response) => response.data);

    yield put(setRecipes(data));
  } catch (error) {
    console.log(error);
  }
}

export function* onDefaultRecipesStart() {
  yield takeLatest(recipesTypes.DEFAULT_RECIPES_START, defaultRecipes);
}

export function* defaultSpecials({ apiEndpoint }) {
  try {
    const data = yield axios.get(apiEndpoint).then((response) => response.data);
    yield put(setSpecials(data));
  } catch (error) {
    console.log(error);
  }
}

export function* onDefaultSpecialsStart() {
  yield takeLatest(recipesTypes.DEFAULT_SPECIALS_START, defaultSpecials);
}

export default function* recipeSagas() {
  yield all([call(onDefaultRecipesStart), call(onDefaultSpecialsStart), call(onRecipeUpdateStart)]);
}

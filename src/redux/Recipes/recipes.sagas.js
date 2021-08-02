import recipesTypes from "./recipes.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import axios from "axios";
import { setRecipes, setSpecials, apiChanged } from "./recipes.actions";
import moment from "moment";

export function* recipeUpdate({ payload }) {
  try {
    const newEditDate = moment().format("MM DD YYYY hh:mm:ss A");
    const updatedRecipe = {
      ...payload.recipe,
      editDate: newEditDate,
    };

    yield axios.patch(`${payload.apiEndpoint}/${payload.recipe.uuid}`, updatedRecipe).then((response) => response.data);
    const data = yield axios.get(payload.apiEndpoint).then((response) => response.data);

    yield put(setRecipes(data));
    yield put(apiChanged(true));
  } catch (error) {
    console.log(error);
  }
}

export function* onRecipeUpdateStart() {
  yield takeLatest(recipesTypes.RECIPE_UPDATE_START, recipeUpdate);
}
export function* defaultRecipes({ payload }) {
  try {
    const data = yield axios.get(payload).then((response) => response.data);
    yield put(setRecipes(data));
  } catch (error) {
    console.log(error);
  }
}

export function* onDefaultRecipesStart() {
  yield takeLatest(recipesTypes.DEFAULT_RECIPES_START, defaultRecipes);
}

export function* defaultSpecials({ payload }) {
  try {
    const data = yield axios.get(payload).then((response) => response.data);
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

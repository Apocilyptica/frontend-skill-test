import recipesTypes from "./recipes.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import axios from "axios";
import { setRecipes, setSpecials } from "./recipes.actions";

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
  yield all([call(onDefaultRecipesStart), call(onDefaultSpecialsStart)]);
}

import locationsTypes from "./locations.types";
import { takeLatest, call, all, put } from "redux-saga/effects";
import axios from "axios";
import { setLocationAddress } from "./locations.actions";

// config
import { googleMapsConfig } from "../../googlemaps/config";

export function* locationAddress({ payload }) {
  const URL = payload + googleMapsConfig.apiKey;
  try {
    const data = yield axios.get(URL).then((response) => response.data.results[0].formatted_address);
    yield put(setLocationAddress(data));
  } catch (error) {
    console.log(error);
  }
}

export function* onSetLocationAddressStart() {
  yield takeLatest(locationsTypes.SET_LOCATION_ADDRESS_START, locationAddress);
}

export default function* locationsSagas() {
  yield all([call(onSetLocationAddressStart)]);
}

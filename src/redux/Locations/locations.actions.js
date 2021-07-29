import locationsTypes from "./locations.types";

export const setLocationAddressStart = (URL) => ({
  type: locationsTypes.SET_LOCATION_ADDRESS_START,
  payload: URL,
});

export const setLocationAddress = (location) => ({
  type: locationsTypes.SET_LOCATION_ADDRESS,
  payload: location,
});

export const setLocationLatLng = (latLng) => ({
  type: locationsTypes.SET_LOCATION_LAT_LNG,
  payload: latLng,
});

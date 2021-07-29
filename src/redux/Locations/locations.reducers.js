import locationsTypes from "./locations.types";

const INITIAL_STATE = {
  geoLocation: { lat: 0, lng: 0 },
  address: "",
};

const locationsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case locationsTypes.SET_LOCATION_ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    case locationsTypes.SET_LOCATION_LAT_LNG:
      return {
        ...state,
        geoLocation: action.payload,
      };
    default:
      return state;
  }
};

export default locationsReducer;

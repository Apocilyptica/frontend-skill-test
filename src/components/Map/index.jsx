import React, { useEffect, useState, useRef, useCallback } from "react";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { setLocationAddressStart, setLocationLatLng } from "../../redux/Locations/locations.actions";

// config
import { googleMapsConfig } from "../../googlemaps/config";

// Material-ui
import Grid from "@material-ui/core/Grid";

// Google Maps
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";

// Google Map Styles
import { mapStylesLight, mapStylesDark } from "../../utils/mapStyles";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

// Icons
import foodMarker from "../../assets/foodMarker.png";

const useStyles = makeStyles((theme) => ({
  root: {
    height: 500,
    width: 500,
  },
}));

const mapState = ({ style, location }) => ({
  darkMode: style.darkMode,
  center: location.geoLocation,
  address: location.address,
});

const Map = ({ geoLocation, title }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { darkMode, center, address } = useSelector(mapState);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsConfig.apiKey,
  });
  const [selected, setSelected] = useState(null);
  const [geoURL, setGeoURL] = useState(null);

  const mapRef = useRef();
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  useEffect(() => {
    const geo = geoLocation.split(",");
    const lat = parseFloat(geo[0]);
    const lng = parseFloat(geo[1]);
    dispatch(setLocationLatLng({ lat: lat, lng: lng }));
    setGeoURL(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=`);
  }, []);

  useEffect(() => {
    if (geoURL) dispatch(setLocationAddressStart(geoURL));
  }, [geoURL]);

  const handleSelected = (cords) => {
    setSelected({ lat: cords.lat(), lng: cords.lng() });
  };

  if (loadError) return "Error loading maps: ";
  if (!isLoaded) return "Loading Maps";

  return (
    <Grid container className={classes.root}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={15}
        center={center}
        options={{ disableDefaultUI: true, zoomControl: true, styles: darkMode ? mapStylesDark : mapStylesLight }}
        onLoad={onMapLoad}
      >
        <Marker
          title="name"
          position={center}
          icon={{
            url: foodMarker,
            scaledSize: new window.google.maps.Size(35, 50),
            origin: new window.google.maps.Point(0, 0),
          }}
          onClick={(data) => handleSelected(data.latLng)}
        />
        {selected ? (
          <InfoWindow position={selected} options={{ pixelOffset: new window.google.maps.Size(0, -50) }} onCloseClick={() => setSelected(null)}>
            <div>
              <h1>{address}</h1>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </Grid>
  );
};

export default Map;

import React, { useEffect, useState } from "react";

// Redux
import { useSelector } from "react-redux";

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

const useStyles = makeStyles((theme) => ({
  root: {
    height: 500,
    width: 500,
  },
}));

const mapState = ({ style }) => ({
  darkMode: style.darkMode,
});

const libraries = ["places"];

const options = {
  styles: mapStylesLight,
  disableDefaultUI: true,
  zoomControl: true,
};

const Map = ({ geoLocation }) => {
  const classes = useStyles();
  const { darkMode } = useSelector(mapState);
  const [center, setCenter] = useState({ lat: 0, lng: 0 });
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsConfig.apiKey,
    libraries,
  });

  useEffect(() => {
    const geo = geoLocation.split(",");
    const lat = parseFloat(geo[0]);
    const lng = parseFloat(geo[1]);
    setCenter({ lat: lat, lng: lng });
  }, []);

  if (loadError) return "Error loading maps: ";
  if (!isLoaded) return "Loading Maps";

  return (
    <Grid container className={classes.root}>
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "100%" }}
        zoom={15}
        center={center}
        options={{ disableDefaultUI: true, zoomControl: true, styles: darkMode ? mapStylesDark : mapStylesLight }}
      >
        <Marker position={center} />
      </GoogleMap>
    </Grid>
  );
};

export default Map;

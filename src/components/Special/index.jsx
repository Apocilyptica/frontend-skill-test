import React from "react";

// Redux
import { useSelector } from "react-redux";

// Components
import Map from "../Map";

// Material-ui
import Typography from "@material-ui/core/Typography";

// Material-ui styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  modal: {
    position: "absolute",
    minWidth: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
  subtitle: {
    textTransform: "uppercase",
  },
}));

const mapState = ({ style }) => ({
  darkMode: style.darkMode,
});

const Special = ({ details }) => {
  const classes = useStyles();
  const { darkMode } = useSelector(mapState);

  return (
    <div className={classes.modal}>
      <Typography variant="h2" component="h2" color={darkMode ? "textSecondary" : "textPrimary"}>
        {details.title}
      </Typography>
      <Typography variant="h6" component="p" color="textPrimary" className={classes.subtitle}>
        {details.type}
      </Typography>
      <Typography variant="subtitle2" component="p" color={darkMode ? "textSecondary" : "textPrimary"}>
        {details.text}
      </Typography>
      {details.hasOwnProperty("geo") && <Map geoLocation={details.geo} title={details.title} />}
    </div>
  );
};

export default Special;

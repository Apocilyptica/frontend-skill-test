import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

// Material-ui
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Zoom from "@material-ui/core/Zoom";
import Fab from "@material-ui/core/Fab";

// Material-ui Icons
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {},
  fab: {
    position: "fixed",
    bottom: theme.spacing(2),
    right: theme.spacing(2),
    zIndex: 2,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.primary.dark,
    "&:hover": {
      color: theme.palette.background.paper,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const ScrollTop = () => {
  const classes = useStyles();
  const location = useLocation();

  useEffect(() => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [location]);

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 100,
  });

  const handleClick = (event) => {
    const anchor = document.querySelector("#back-to-top-anchor");

    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <Zoom in={trigger}>
      <div onClick={handleClick} role="presentation" className={classes.root}>
        <Fab className={classes.fab} size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </div>
    </Zoom>
  );
};

export default ScrollTop;

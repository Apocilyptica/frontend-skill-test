import React from "react";

// Components
import TopNav from "../TopNav";
import BottomNav from "../BottomNav";
import ElevationScroll from "../ElevationScroll";

// Material-ui
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/ToolBar";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

// Material-ui Styles
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  offSet: {
    height: theme.spacing(18),
  },
}));

const Header = (props) => {
  const classes = useStyles();
  const topNavTrigger = useScrollTrigger();

  return (
    <>
      <ElevationScroll {...props}>
        <AppBar position="fixed">
          <TopNav collapse={!topNavTrigger} />
          <BottomNav />
        </AppBar>
      </ElevationScroll>
      <Toolbar className={classes.offSet} />
    </>
  );
};

export default Header;

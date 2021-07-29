import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Redux
import { useSelector } from "react-redux";

// Components
import CellPhoneDrawer from "../CellPhoneDrawer";
import MenuItems from "./MenuItems";

// Data
import { navLinksData } from "../../utils/navLinks";

// Assets
import Logo from "../../assets/Logo.png";

// Material-ui
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Toolbar from "@material-ui/core/Toolbar";
import withWidth from "@material-ui/core/withWidth";
import InputBase from "@material-ui/core/InputBase";

// Material-ui Icons
import SearchIcon from "@material-ui/icons/Search";

// Material-ui Styles
import { makeStyles, alpha } from "@material-ui/core/styles";

const mapState = ({ style }) => ({ darkMode: style.darkMode });

const useStyles = makeStyles((theme) => ({
  toolbar: {
    backgroundColor: theme.palette.primary.main,
  },
  toolbarDarkMode: {
    backgroundColor: theme.palette.background.paper,
  },
  paperRoot: {
    flexGrow: 1,
    height: "100%",
  },
  img: {
    height: 75,
    margin: theme.spacing(1, 5, 1, 0),
  },
  link: {
    height: 75 + theme.spacing(2),
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const BottomNav = () => {
  const { darkMode } = useSelector(mapState);
  const classes = useStyles();

  return (
    <Toolbar className={!darkMode ? classes.toolbar : classes.toolbarDarkMode} disableGutters>
      <Grid container justifyContent="center" spacing={0}>
        <Grid container item xs={11} justifyContent="center" alignItems="center">
          <Link to="/" className={classes.link}>
            <img className={classes.img} src={Logo} alt="logo" />
          </Link>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
            />
          </div>
          <Hidden mdDown>
            <ButtonGroup variant="text" color="primary" aria-label="text primary button group">
              {Array.isArray(navLinksData) &&
                navLinksData.map((item, index) => {
                  return (
                    <MenuItems
                      key={index}
                      id={item.id}
                      title={item.menu}
                      URL={item.URL}
                      label={item.label}
                      menuItems={item.menuItems}
                      userInfluence={item.id === "register" ? true : false}
                    />
                  );
                })}
            </ButtonGroup>
          </Hidden>
        </Grid>

        <Hidden only={["lg", "xl"]}>
          <Grid container item xs={1} justifyContent="center">
            <CellPhoneDrawer />
          </Grid>
        </Hidden>
      </Grid>
    </Toolbar>
  );
};

BottomNav.propTypes = {
  width: PropTypes.oneOf(["lg", "md", "sm", "xl", "xs"]).isRequired,
};

export default withWidth()(BottomNav);
